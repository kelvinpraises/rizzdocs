// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17 .0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IRizzDocsClient {
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
        /// @dev 'channelAddress' to 'Subscription'
        // mapping(address => Subscription) subscriptions;
        /// @dev subscription here is different from above due to lighthouse limitation
        Subscription daoSubscription;
    }

    /// @notice Struct to hold details of the user subscription
    struct Subscription {
        bool status;
        uint256 expiry;
    }


    function spaceTableId() external view returns (uint256);

    function documentationTableId() external view returns (uint256);

    function documentationSpaceTableId() external view returns (uint256);

    function rizzDocsToken() external view returns (IERC20);

    function uploaderReward() external view returns (uint256);

    function daoSubscriptionFee() external view returns (uint256);

    function spaceExists(bytes32) external view returns (bool);

    function documentationExists(bytes32) external view returns (bool);

    function allUsers(address) external view returns (User memory);

    function allChannels(bytes32) external view returns (Channel memory);

    // Added missing methods
    function isSubscribedToChannel(
        address _userAddress,
        address _channelId
    ) external view returns (bool);

    function isSubscribedToDAO(address _userAddress) external view returns (uint256);

    function isOwnerOrMemberOfChannel(
        bytes32 _channelId,
        address _account
    ) external view returns (bool);

    function isOwnerOfChannel(bytes32 _channelId, address _owner) external view returns (bool);

    function isMemberOfChannel(bytes32 _channelId, address _member) external view returns (bool);

    function executeGrant(Recipient[] memory _recipients) external;

    function createSpace(uint256 _nonce, string memory _name, string memory _description) external;

    function createDocumentation(
        uint256 _nonce,
        string memory _name,
        string memory _description,
        bytes32[] memory _spaceIds
    ) external;

    function createChannel(
        uint256 _nonce,
        string memory _name,
        string memory _description,
        address _owner,
        address _feeAddress,
        uint256 _subscriptionFee,
        address[] memory _members
    ) external;

    function addMembers(bytes32 _channelId, address[] memory _members) external;

    function removeMembers(bytes32 _channelId, address[] memory _members) external;

    function subscribeToChannel(bytes32 _channelId) external;

    function subscribeToDAO() external;

    function uploadFile(bytes32 _fileCID) external;

    function setUploaderReward(uint256 _newReward) external;

    function ethWithdraw(uint256 _amount, address _admin) external;

    function erc20Withdraw(address _tokenAddress, uint256 _amount, address _admin) external;
}
