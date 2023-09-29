// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IRizzDocsDoc {
    enum DocType {
        Explanation,
        Tutorial,
        HowToGuide,
        Reference
    }

    function getTables() external view returns (string[] memory);

    function getTableId(string memory name) external view returns (uint256);

    function getName(uint256 tableId) external view returns (string memory);

    function getTableRegistryName(string memory name) external view returns (string memory);

    function getSelect(string memory name) external view returns (string memory);

    function addContent(DocType _docType, string memory _values) external;

    function removeContent(DocType _docType, string memory _filter) external;
}
