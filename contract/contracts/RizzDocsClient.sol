// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

import {RizzDocsDoc} from "./RizzDocsDoc.sol";
import {IRizzDocsDoc} from "./IRizzDocsDoc.sol";

contract RizzDocsClient is Ownable, AccessControl, ERC721Holder {
    using SafeERC20 for IERC20;

    /// ================================
    /// ========== Struct ==============
    /// ================================

    /// @notice Struct to hold details of the grant recipients
    struct Recipient {
        address recipientAddress;
        uint256 amount;
    }

    /// @notice Struct to hold details of the spaces
    struct Space {
        bytes32 id;
        uint256 nonce;
        string name;
        string description;
    }

    /// @notice Struct to hold details of the documentation
    /// @dev 'officialChannelId' is the official channel documenter
    struct Documentation {
        bytes32 id;
        uint256 nonce;
        string name;
        string description;
        bytes32 officialChannelId;
        address documentationContract;
    }

    /// @notice Struct to hold details of the channel
    struct Channel {
        bytes32 id;
        uint256 nonce;
        string name;
        string description;
        address owner;
        address feeAddress;
        uint256 subscriptionFee;
    }

    /// @notice Struct to hold details of the subscribing user
    struct User {
        address userAddr;
        //  @dev 'channelAddress' to 'Subscription'
        // mapping(address => Subscription) subscriptions;
        /// @dev subscription here is different from above due to lighthouse limitation
        Subscription daoSubscription;
    }

    /// @notice Struct to hold details of the user subscription
    struct Subscription {
        bool status;
        uint256 expiry;
    }

    /// ================================
    /// ========== Storage =============
    /// ================================

    ITablelandTables internal immutable _tableland;

    string[] names;
    mapping(uint256 => string) private tableNames;
    mapping(string => uint256) private tableIds;

    /// @notice The a space table id.
    uint256 public spaceTableId;

    /// @notice The a documentation table id.
    uint256 public documentationTableId;

    /// @notice The junction table id that links a document to it's spaces.
    uint256 public documentationSpaceTableId;

    string private constant _TABLE_PREFIX = "rizz";

    /// @notice The ERC20 token contract
    IERC20 public rizzDocsToken;

    /// @notice The total amount rewarded for a verified data upload
    uint256 public uploaderReward;

    /// @notice The total amount rewarded for a verified data upload
    uint256 public daoSubscriptionFee;

    /// @notice Mapping to check if a space exists
    mapping(bytes32 => bool) public spaceExists;

    /// @notice Mapping to check if a documentation exists
    mapping(bytes32 => bool) public documentationExists;

    /// @notice Mapping to hold all users
    mapping(address => User) public allUsers;

    /// @notice Mapping to hold all channels
    mapping(bytes32 => Channel) public allChannels;

    /// ====================================
    /// =========== Modifier ===============
    /// ====================================

    /// @notice Reverts UNAUTHORIZED if the caller is not the channel owner
    /// @param _channelId The channel id
    modifier onlyChannelOwner(bytes32 _channelId) {
        if (!_isOwnerOfChannel(_channelId, msg.sender)) {
            revert("You're UNAUTHORIZED");
        }
        _;
    }

    /// @notice Reverts UNAUTHORIZED if the caller is not the channel owner
    /// @param _channelId The channel id
    modifier onlyChannelMembers(bytes32 _channelId) {
        if (!_isOwnerOrMemberOfChannel(_channelId, msg.sender)) {
            revert("You're UNAUTHORIZED");
        }
        _;
    }

    /// ===============================
    /// ======== Constructor ==========
    /// ===============================

    constructor(address _rizzDocsToken, uint256 _uploaderReward, uint256 _daoSubscriptionFee) {
        _tableland = TablelandDeployments.get();

        rizzDocsToken = IERC20(_rizzDocsToken);
        uploaderReward = _uploaderReward;
        daoSubscriptionFee = _daoSubscriptionFee;

        // Create a table for spaces
        _createTable(
            "Spaces",
            "spaceId TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL"
        );

        // Create a table for Documentations
        _createTable(
            "Documentations",
            "documentationId TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, documentationContract TEXT NOT NULL, spaceId TEXT NOT NULL"
        );
    }

    /// ===============================
    /// ========== Events =============
    /// ===============================

    event RewardChanged(uint256 newReward);
    event RewardDistributed(address indexed uploader, uint256 amount);
    event GrantDistributed(address indexed uploader, uint256 amount);
    event SubscriptionCreated(address indexed user, Channel channel);
    event SpaceCreated(bytes32 indexed spaceId, uint256 nonce, string name, string description);
    event DocumentationCreated(
        bytes32 indexed documentationId,
        uint256 nonce,
        string name,
        string description,
        address documentationContract
    );
    event ChannelCreated(
        bytes32 indexed channelId,
        uint256 nonce,
        string name,
        string description,
        address owner,
        address feeAddress,
        uint256 subscriptionFee
    );

    /// ===============================
    /// ============ Views ============
    /// ===============================

    /// @notice Function to check if the user is subscribed to a channel
    /// @param _userAddress Address of the user®
    /// @param _channelId Address of the channel
    function isSubscribedToChannel(
        address _userAddress,
        address _channelId
    ) external view returns (bool) {
        // Subscription storage subInfo = allUsers[_userAddress].subscriptions[_channelId];
        // return subInfo.status && (subInfo.expiry >= block.timestamp);
    }

    /// @notice Function to check if the user is subscribed receive gated content
    /// @param _userAddress Address of the user
    function isSubscribedToDAO(address _userAddress) external view returns (uint256) {
        Subscription storage subInfo = allUsers[_userAddress].daoSubscription;
        if (subInfo.status && (subInfo.expiry >= block.timestamp)) {
            return 1;
        } else {
            return 0;
        }
    }

    /// @notice Checks if the address is an owner or member of the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _account The address to check
    /// @return 'true' if the address is an owner or member of the channel, otherwise 'false'
    function isOwnerOrMemberOfChannel(
        bytes32 _channelId,
        address _account
    ) external view returns (bool) {
        return _isOwnerOrMemberOfChannel(_channelId, _account);
    }

    /// @notice Checks if the given address is an owner of the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _owner The address to check
    /// @return 'true' if the address is an owner of the channel, otherwise 'false'
    function isOwnerOfChannel(bytes32 _channelId, address _owner) external view returns (bool) {
        return _isOwnerOfChannel(_channelId, _owner);
    }

    /// @notice Returns if the given address is an member of the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _member The address to check
    /// @return 'true' if the address is an member of the channel, otherwise 'false'
    function isMemberOfChannel(bytes32 _channelId, address _member) external view returns (bool) {
        return _isMemberOfChannel(_channelId, _member);
    }

    // Note: custom just for exposing state
    function getTables() public view returns (string[] memory) {
        return names;
    }

    // Note: custom just for exposing state
    function getTableId(string memory name) public view returns (uint256) {
        return tableIds[name];
    }

    // Note: custom just for exposing state
    function getName(uint256 tableId) public view returns (string memory) {
        return tableNames[tableId];
    }

    // Note: custom just for exposing state
    function getTableRegistryName(string memory name) public view returns (string memory) {
        uint256 tableId = tableIds[name];
        return _toNameFromId(tableId);
    }

    function getSelect(string memory name) public view returns (string memory) {
        return string(abi.encodePacked("SELECT * FROM ", getTableRegistryName(name), ";"));
    }

    /// ===============================
    /// ======= External/Custom =======
    /// ===============================

    /// @notice Execute a grant distribution to the specified recipients.
    /// @param _recipients An array of Recipient structures representing the recipients of the grant.
    function executeGrant(Recipient[] memory _recipients) external onlyOwner {
        _distribute(_recipients);
    }

    /// @notice Creates a new space
    /// @dev This will also generate the 'spaceId', emits a 'SpaceCreated()' event
    /// @param _nonce Can be any integer, this is used to generate the 'spaceId' and should be unique for each space
    /// @param _name The name of the space
    /// @param _description The space description
    function createSpace(uint256 _nonce, string memory _name, string memory _description) external {
        // Generate a space id using a nonce and the msg.sender
        bytes32 spaceId = _generateSpaceId(_nonce);

        require(!spaceExists[spaceId], "Nonce is already in use");
        // TODO: spaceId passed in future is of type string please refactor
        spaceExists[spaceId] = true;

        Space memory space = Space({
            id: spaceId,
            nonce: _nonce,
            name: _name,
            description: _description
        });

        // "spaceId PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL"
        _insertRows(
            "Spaces",
            string.concat(
                "(",
                "'",
                Strings.toHexString(uint256(spaceId), 32),
                "'",
                ",",
                "'",
                _name,
                "'",
                ",",
                "'",
                _description,
                "'",
                ")"
            )
        );

        emit SpaceCreated(spaceId, space.nonce, space.name, space.description);
    }

    /// @notice Creates a new documentation
    /// @dev This will also generate the 'documentationId', emits a 'DocumentCreated()' event
    /// @param _nonce Can be any integer, this is used to generate the 'documentationId' and should be unique for each documentation
    /// @param _name The name of the documentation
    /// @param _description The documentation description
    /// @param _spaceId The category by spaces which this documentation fits
    function createDocumentation(
        uint256 _nonce,
        string memory _name,
        string memory _description,
        bytes32 _spaceId
    ) external {
        // Generate a documentation id using a nonce and the msg.sender
        bytes32 documentationId = _generateDocumentationId(_nonce);

        // Check that spaces are valid
        require(spaceExists[_spaceId], "Invalid space id");

        require(!documentationExists[documentationId], "Nonce is already in use");
        documentationExists[documentationId] = true;

        Documentation memory documentation = Documentation({
            id: documentationId,
            nonce: _nonce,
            name: _name,
            description: _description,
            officialChannelId: "",
            documentationContract: _deployDocumentationContract()
        });

        // "documentationId PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, documentationContract TEXT NOT NULL"
        _insertRows(
            "Documentations",
            string.concat(
                "(",
                "'",
                Strings.toHexString(uint256(documentationId), 32),
                "'",
                ",",
                "'",
                _name,
                "'",
                ",",
                "'",
                _description,
                "'",
                ",",
                "'",
                Strings.toHexString(uint160(documentation.documentationContract), 20),
                "'",
                ",",
                "'",
                Strings.toHexString(uint256(_spaceId), 32),
                "'",
                ")"
            )
        );

        emit DocumentationCreated(
            documentationId,
            documentation.nonce,
            documentation.name,
            documentation.description,
            documentation.documentationContract
        );
    }

    /// @notice Creates a new channel
    /// @dev This will also generate the 'channelId', emits a 'ChannelCreated()' event
    /// @param _nonce Can be any integer, this is used to generate the 'channelId' and should be unique for each channel
    /// @param _name The name of the channel
    /// @param _description The channel description
    /// @param _owner The owner of the channel
    /// @param _feeAddress The address to send subscription payments
    /// @param _subscriptionFee The fee to charge for subscription to channel
    /// @param _members The members of the channel
    function createChannel(
        uint256 _nonce,
        string memory _name,
        string memory _description,
        address _owner,
        address _feeAddress,
        uint256 _subscriptionFee,
        address[] memory _members
    ) external {
        // Generate a channel id using a nonce and the msg.sender
        bytes32 channelId = _generateChannelId(_nonce);

        require(allChannels[channelId].feeAddress == address(0), "Nonce is already in use");

        Channel memory channel = Channel({
            id: channelId,
            nonce: _nonce,
            name: _name,
            description: _description,
            owner: _owner,
            feeAddress: _feeAddress,
            subscriptionFee: _subscriptionFee
        });

        allChannels[channelId] = channel;

        // Assign roles for the channel members
        uint256 memberLength = _members.length;
        for (uint256 i = 0; i < memberLength; ) {
            address member = _members[i];

            if (member == address(0)) {
                revert("Members list contained zero address");
            }

            _grantRole(channelId, member);
            unchecked {
                i++;
            }
        }

        emit ChannelCreated(
            channelId,
            channel.nonce,
            channel.name,
            channel.description,
            channel.owner,
            channel.feeAddress,
            channel.subscriptionFee
        );
    }

    /// @notice Adds members to the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _members The members to add
    function addMembers(
        bytes32 _channelId,
        address[] memory _members
    ) external onlyChannelOwner(_channelId) {
        uint256 memberLength = _members.length;

        for (uint256 i = 0; i < memberLength; ) {
            address member = _members[i];

            if (member == address(0)) {
                revert("Members list contained zero address");
            }

            _grantRole(_channelId, member);
            unchecked {
                i++;
            }
        }
    }

    /// @notice Removes members from the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _members The members to remove
    function removeMembers(
        bytes32 _channelId,
        address[] memory _members
    ) external onlyChannelOwner(_channelId) {
        uint256 memberLength = _members.length;

        // Loop through the members and remove them from the channel by revoking the role
        for (uint256 i = 0; i < memberLength; ) {
            // Revoke the role from the member and emit the event for each member
            _revokeRole(_channelId, _members[i]);
            unchecked {
                i++;
            }
        }
    }

    /// @notice Function to subscribe to a channel
    /// @param _channelId The 'channelId' of the channel
    function subscribeToChannel(bytes32 _channelId) external {
        // Channel storage channel = allChannels[_channelId];
        // require(channel.feeAddress != address(0), "Channel doesn't exist");
        // User storage user = allUsers[msg.sender];
        // Subscription storage subInfo = user.subscriptions[_channelId];
        // require(!subInfo.status, "Already subscribed to this channel");
        // require(
        //     rizzDocsToken.allowance(msg.sender, address(this)) >= channel.subscriptionFee,
        //     "You must approve the contract to spend tokens first"
        // );
        // require(
        //     rizzDocsToken.transferFrom(msg.sender, channel.feeAddress, channel.subscriptionFee),
        //     "Token transfer failed"
        // );
        // subInfo.status = true;
        // subInfo.expiry = block.timestamp + 30 days;
    }

    /// @notice Function to subscribe to DAO gated docs
    function subscribeToDAO() external {
        User storage user = allUsers[msg.sender];
        Subscription storage subInfo = user.daoSubscription;

        // Check if the user already exists, and if not, create a new user
        if (user.userAddr == address(0)) {
            user.userAddr = msg.sender;
        }

        // Check if the user is already subscribed
        require(!subInfo.status, "Already subscribed");

        require(
            rizzDocsToken.allowance(msg.sender, address(this)) >= daoSubscriptionFee,
            "Approve token spend"
        );

        require(
            rizzDocsToken.transferFrom(msg.sender, address(this), daoSubscriptionFee),
            "Token transfer failed"
        );

        subInfo.status = true;
        subInfo.expiry = block.timestamp + 30 days;
    }

    /// @notice Function to subscribe to DAO gated docs
    function subscribeToDAOy() external {
        User storage user = allUsers[msg.sender];
        require(user.userAddr == address(0), "User already exists");

        // Check allowance and transfer tokens in a single require statement
        require(
            rizzDocsToken.transferFrom(msg.sender, address(this), daoSubscriptionFee),
            "Token transfer"
        );

        // Update user and subscription info
        user.userAddr = msg.sender;
        user.daoSubscription.status = true;
        user.daoSubscription.expiry = block.timestamp + 30 days;
    }

    function addContent(
        bytes32 _channelId,
        address _documentationContractAddress,
        IRizzDocsDoc.DocType _doctype,
        string memory _values
    ) public onlyChannelMembers(_channelId) {
        IRizzDocsDoc documentationContract = IRizzDocsDoc(_documentationContractAddress);

        //TODO: make tables owned by channels to prevent exploits
        documentationContract.addContent(_doctype, _values);
    }

    function removeContent(
        bytes32 _channelId,
        address _documentationContractAddress,
        IRizzDocsDoc.DocType _doctype,
        string memory _filter
    ) public onlyChannelMembers(_channelId) {
        IRizzDocsDoc documentationContract = IRizzDocsDoc(_documentationContractAddress);

        //TODO: make tables owned by channels to prevent exploits
        documentationContract.removeContent(_doctype, _filter);
    }

    function uploadFile(bytes32 _fileCID) external {
        //TODO:
        // require(!fileExists(_fileCID), "File already exists");
        // require(verifyPoDSI(_fileCID), "File does not contain the correct data");
        // saveFile(_fileCID);
        // _transferAmount(msg.sender, uploaderReward);
        // emit RewardDistributed(msg.sender, uploaderReward);
    }

    /// @notice Set a new reward value for an uploader.
    /// @param _newReward The new reward value to set.
    function setUploaderReward(uint256 _newReward) external onlyOwner {
        uploaderReward = _newReward;
        emit RewardChanged(_newReward);
    }

    /// @notice Allow the contract owner to withdraw Ether to the specified admin address.
    /// @param _amount The amount of Ether to withdraw.
    /// @param _admin The address of the admin who will receive the Ether.
    function ethWithdraw(uint256 _amount, address _admin) external onlyOwner {
        // TODO: implement
        // require(payable(_admin).transfer(_amount), "Transfer failed or insufficient balance");
    }

    /// @notice Allow the admin to withdraw ERC-20 tokens
    /// @param _tokenAddress The address of the ERC-20 token to withdraw from
    /// @param _amount The amount of tokens to withdraw
    /// @param _admin The address of the admin who will receive the tokens
    function erc20Withdraw(
        address _tokenAddress,
        uint256 _amount,
        address _admin
    ) external onlyOwner {
        require(IERC20(_tokenAddress).transfer(_admin, _amount), "Transfer failed");
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

    function _distribute(Recipient[] memory _recipients) internal {
        uint256 recipientLength = _recipients.length;
        for (uint256 i; i < recipientLength; ) {
            Recipient memory recipient = _recipients[i];

            uint256 amount = recipient.amount;

            if (amount == 0) {
                revert("Invalid amount");
            }

            _transferAmount(recipient.recipientAddress, amount);

            emit GrantDistributed(recipient.recipientAddress, amount);
            unchecked {
                i++;
            }
        }
    }

    /// @notice Sends 'rizzDocsToken' to an address
    function _transferAmount(address _to, uint256 _amount) internal {
        require(rizzDocsToken.balanceOf(address(this)) >= _amount, "Insufficient balance");
        rizzDocsToken.safeTransfer(_to, _amount);
    }

    /// @notice Generates the 'spaceId' based on msg.sender and nonce
    /// @dev Internal function used by 'createChannel()' to generate spaceId.
    /// @param _nonce Nonce provided by the caller to generate 'spaceId'
    /// @return 'spaceId' The 'spaceId' of the channel
    function _generateSpaceId(uint256 _nonce) internal view returns (bytes32) {
        return keccak256(abi.encodePacked("spaceId", _nonce, msg.sender));
    }

    /// @notice Generates the 'documentationId' based on msg.sender and nonce
    /// @dev Internal function used by 'createChannel()' to generate documentationId.
    /// @param _nonce Nonce provided by the caller to generate 'documentationId'
    /// @return 'documentationId' The 'documentationId' of the channel
    function _generateDocumentationId(uint256 _nonce) internal view returns (bytes32) {
        return keccak256(abi.encodePacked("documentationId", _nonce, msg.sender));
    }

    /// @notice Generates the 'channelId' based on msg.sender and nonce
    /// @dev Internal function used by 'createChannel()' to generate channelId.
    /// @param _nonce Nonce provided by the caller to generate 'channelId'
    /// @return 'channelId' The 'channelId' of the channel
    function _generateChannelId(uint256 _nonce) internal view returns (bytes32) {
        return keccak256(abi.encodePacked("channelId", _nonce, msg.sender));
    }

    /// @notice Checks if an address is the owner of the channel
    /// @dev Internal function used to determine if an address is the channel owner
    /// @param _channelId The 'channelId' of the channel
    /// @param _owner The address to check
    /// @return 'true' if the address is an owner of the channel, otherwise 'false'
    function _isOwnerOfChannel(bytes32 _channelId, address _owner) internal view returns (bool) {
        return allChannels[_channelId].owner == _owner;
    }

    /// @notice Checks if an address is a member of the channel
    /// @dev Internal function used to determine if an address is a member of the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _member The address to check
    /// @return 'true' if the address is an member of the channel, otherwise 'false'
    function _isMemberOfChannel(bytes32 _channelId, address _member) internal view returns (bool) {
        return hasRole(_channelId, _member);
    }

    /// @notice Checks if the address is an owner or member of the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _account The address to check
    /// @return 'true' if the address is an owner or member of the channel, otherwise 'false'
    function _isOwnerOrMemberOfChannel(
        bytes32 _channelId,
        address _account
    ) internal view returns (bool) {
        return _isOwnerOfChannel(_channelId, _account) || _isMemberOfChannel(_channelId, _account);
    }

    /// @notice Deploys the documentation contract
    function _deployDocumentationContract() internal returns (address) {
        RizzDocsDoc contractInstance = new RizzDocsDoc();
        address contractAddress = address(contractInstance);
        return contractAddress;
    }

    /// @notice Creates a new table with the specified name and schema.
    /// @param _name The name of the new table.
    /// @param _schema The schema of the new table.
    function _createTable(string memory _name, string memory _schema) internal {
        // Generate the CREATE TABLE statement based on the given schema and chain ID.
        string memory statement = string.concat(
            "CREATE TABLE _",
            Strings.toString(block.chainid),
            " (",
            _schema,
            ")"
        );

        uint256 tableId = _tableland.create(address(this), statement);

        tableIds[_name] = tableId;
        tableNames[tableId] = _name;
        names.push(_name);
    }

    /// @notice Inserts rows into a table with the specified name, using specified columns and values.
    /// @param _name The name of the table to insert rows into.
    /// @param _values The values to insert into the specified columns.
    function _insertRows(string memory _name, string memory _values) internal {
        uint256 tableId = tableIds[_name];
        string memory tableName = _toNameFromId(tableId);

        _tableland.mutate(
            address(this),
            tableId,
            string.concat("INSERT INTO ", tableName, " VALUES", _values)
        );
    }

    /// @notice Deletes rows from a table with the specified name using a filter condition.
    /// @param _name The name of the table to delete rows from.
    /// @param _filter The filter condition to determine which rows to delete.
    function _deleteRows(string memory _name, string memory _filter) internal {
        uint256 tableId = tableIds[_name];
        string memory tableName = _toNameFromId(tableId);

        _tableland.mutate(
            address(this),
            tableId,
            string(abi.encodePacked("DELETE FROM ", tableName, " WHERE ", _filter))
        );
    }

    function _toNameFromId(uint256 tableId) internal view returns (string memory) {
        return string.concat("_", Strings.toString(block.chainid), "_", Strings.toString(tableId));
    }

    /// @notice This contract should be able to receive native token
    receive() external payable {}
}
