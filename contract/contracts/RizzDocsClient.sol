// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

import "./RizzDocsDoc.sol";

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
        /// @dev 'channelAddress' to 'Subscription'
        mapping(address => Subscription) subscriptions;
    }

    /// @notice Struct to hold details of the user subscription
    struct Subscription {
        bool status;
        uint256 expiry;
    }

    /// ================================
    /// ========== Storage =============
    /// ================================

    /// @notice The a space table id.
    uint256 public spaceTableId;

    /// @notice The a documentation table id.
    uint256 public documentationTableId;

    /// @notice The junction table id that links a document to it's spaces.
    uint256 public documentationSpaceTableId;

    string private constant _TABLE_PREFIX = "my_quickstart_table";

    /// @notice The ERC20 token contract
    IERC20 public rizzDocsToken;

    /// @notice The total amount rewarded for a verified data upload
    uint256 public uploaderReward;

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

    /// ===============================
    /// ======== Constructor ==========
    /// ===============================

    constructor(address _rizzDocsToken, uint256 _uploaderReward) {
        rizzDocsToken = IERC20(_rizzDocsToken);
        uploaderReward = _uploaderReward;
        // TODO: create space table and documentations

        _tableId = TablelandDeployments.get().create(
            address(this),
            string.concat(
                "CREATE TABLE _",
                Strings.toString(block.chainid),
                " (id integer primary key, message text);"
            )
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
    /// @param _userAddress Address of the user
    /// @param _channelId Address of the channel
    function isSubscribedToChannel(
        address _userAddress,
        address _channelId
    ) external view returns (bool) {
        Subscription storage subInfo = allUsers[_userAddress].subscriptions[_channelId];
        return subInfo.status && (subInfo.expiry >= block.timestamp);
    }

    /// @notice Checks if the address is an owner or member of the channel
    /// @param _channelId The 'channelId' of the channel
    /// @param _account The address to check
    /// @return 'true' if the address is an owner or member of the channel, otherwise 'false'
    function isOwnerOrMemberOfChannel(
        bytes32 _channelId,
        address _account
    ) external view returns (bool) {
        return _isOwnerOfChannel(_channelId, _account) || _isMemberOfChannel(_channelId, _account);
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

    /// ===============================
    /// ======= External/Custom =======
    /// ===============================

    /// @notice Execute a grant distribution to the specified recipients.
    /// @param _recipients An array of Recipient structures representing the recipients of the grant.
    function executeGrant(Recipient[] _recipients) external onlyOwner {
        _distribute(_recipients);
    }

    /// @notice Creates a new space
    /// @dev This will also generate the 'spaceId', emits a 'SpaceCreated()' event
    /// @param _nonce Can be any integer, this is used to generate the 'spaceId' and should be unique for each space
    /// @param _name The name of the space
    /// @param _description The space description
    function createSpace(uint256 _nonce, string _name, string _description) external onlyOwner {
        // Generate a space id using a nonce and the msg.sender
        bytes32 spaceId = _generateSpaceId(_nonce);

        require(!spaceExists[spaceId], "Nonce is already in use");
        spaceExists[spaceId] = true;

        Space memory space = Space({
            id: spaceId,
            nonce: _nonce,
            name: _name,
            description: _description
        });

        // TODO: store space in TableLand

        emit SpaceCreated(spaceId, space.nonce, space.name, space.description);
    }

    /// @notice Creates a new documentation
    /// @dev This will also generate the 'documentationId', emits a 'DocumentCreated()' event
    /// @param _nonce Can be any integer, this is used to generate the 'documentationId' and should be unique for each documentation
    /// @param _name The name of the documentation
    /// @param _description The documentation description
    /// @param _spaceIds The category by spaces which this documentation fits
    function createDocumentation(
        uint256 _nonce,
        string _name,
        string _description,
        bytes32[] _spaceIds
    ) external onlyOwner {
        // Generate a documentation id using a nonce and the msg.sender
        bytes32 documentationId = _generateDocumentationId(_nonce);

        // Check that spaces are valid
        uint256 spacesLength = _spaceIds.length;
        for (uint256 i = 0; i < spacesLength; ) {
            address spaceId = _spaceIds[i];

            require(spaceExists[spaceId], "Invalid space id");

            unchecked {
                i++;
            }
        }

        require(!documentationExists[documentationId], "Nonce is already in use");
        documentationExists[documentationId] = true;

        Documentation memory documentation = Documentation({
            id: documentationId,
            nonce: _nonce,
            name: _name,
            description: _description,
            officialChannelId: address(0),
            documentationContract: _deployDocumentationContract(documentationId, _name, _spaceIds)
        });

        // TODO: store documentation in TableLand

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
        string _name,
        string _description,
        address _owner,
        address _feeAddress,
        uint256 _subscriptionFee,
        address[] memory _members
    ) external {
        // Generate a channel id using a nonce and the msg.sender
        bytes32 channelId = _generateChannelId(_nonce);

        require(allChannels[channelId].channelAddress == address(0), "Nonce is already in use");

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
        Channel storage channel = allChannels[_channelId];
        require(channel.channelAddress != address(0), "Channel doesn't exist");

        User storage user = allUsers[msg.sender];
        Subscription storage subInfo = user.subscriptions[_channelId];

        require(!subInfo.status, "Already subscribed to this channel");

        require(
            rizzDocsToken.allowance(msg.sender, address(this)) >= channel.subscriptionFee,
            "You must approve the contract to spend tokens first"
        );

        require(
            rizzDocsToken.transferFrom(msg.sender, channel.feeAddress, channel.subscriptionFee),
            "Token transfer failed"
        );

        subInfo.status = true;
        subInfo.expiry = block.timestamp + 30 days;
    }

    function uploadFile(bytes32 _fileCID) external {
        //TODO:
        require(!fileExists(_fileCID), "File already exists");
        require(verifyPoDSI(_fileCID), "File does not contain the correct data");

        saveFile(_fileCID);

        _transferAmount(msg.sender, uploaderReward);

        emit RewardDistributed(msg.sender, uploaderReward);
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
        require(payable(_admin).transfer(_amount), "Transfer failed or insufficient balance");
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

    /// @notice Deploys the documentation contract
    /// @param _documentationId The documentation id
    /// @param _name The name of the documentation
    /// @param _spaceIds The category by spaces which this documentation fits
    /// @return The address of the deployed documentation contract
    function _deployDocumentationContract(
        bytes32 _documentationId,
        string memory _name,
        bytes32[] _spaceIds
    ) internal returns (address) {
        address contractAddress = new RizzDocsDoc(_documentationId, _name, _spaceIds);
        return contractAddress;
    }

    /// @notice This contract should be able to receive native token
    receive() external payable {}
}
