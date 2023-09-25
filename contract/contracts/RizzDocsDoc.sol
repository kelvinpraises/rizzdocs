// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import "@tableland/evm/contracts/utils/TablelandDeployments.sol";

contract RizzDocsDoc is AccessControl, ERC721Holder {
    /// ================================
    /// ========== Struct ==============
    /// ================================

    enum DocType {
        Explanation,
        Tutorial,
        HowToGuide,
        Reference
    }

    /// ================================
    /// ========== Storage =============
    /// ================================

    IRizzDocsClient internal immutable rdc;
    ITablelandTables internal immutable _tableland;

    string[] _names;
    mapping(uint256 => string) private _tableNames;
    mapping(string => uint256) private _tableIds;

    /// ===============================
    /// ======== Constructor ==========
    /// ===============================

    constructor() {
        rdc = RizzDocsClient(_rdc);
        _tableland = TablelandDeployments.get();
    }

    /// ===============================
    /// ============ Views ============
    /// ===============================

    // Note: custom just for exposing state
    function getTables() public view returns (string[] memory) {
        return _names;
    }

    // Note: custom just for exposing state
    function getTableId(string memory name) public view returns (uint256) {
        return _tableIds[name];
    }

    // Note: custom just for exposing state
    function getName(uint256 tableId) public view returns (string memory) {
        return _tableNames[tableId];
    }

    // Note: custom just for exposing state
    function getTableRegistryName(string memory name) public view returns (string memory) {
        uint256 tableId = _tableIds[name];
        return _toNameFromId(tableId);
    }

    function getSelect(string memory name) public view returns (string memory) {
        return string(abi.encodePacked("SELECT * FROM ", getTableRegistryName(name), ";"));
    }

    /// ===============================
    /// ======= External/Custom =======
    /// ===============================

    /// @dev Reference is not used because it is represented by a single table shared by all channels.
    /// @param _channelId The unique identifier of a channel.
    // TODO: fix permissions
    function registerChannel(bytes32 channelId) public {
        for (uint8 i = 0; i <= uint8(DocType.HowToGuide); i++) {
            // Convert the enum value to its string representation
            string memory docTypeStr = ["Explanation", "Tutorial", "HowToGuide"][i];

            // Create a table for the current enum value
            _createTable(
                string(abi.encodePacked(channelId, docTypeStr)),
                "id integer primary key, title text unique, contentCID text not null, editedAt integer"
            );
        }
    }

    /// @notice Adds content to a specified row.
    /// @param _channelId The unique identifier of the channel.
    /// @param _docType The enumeration value representing the document type (DocType).
    /// @param _values The content values to be added.
    /// TODO: fix permissions
    function addContent(bytes32 _channelId, DocType _docType, string memory _values) public {
        string memory docTypeStr;

        if (DocType.Explanation == _docType) {
            docTypeStr = "Explanation";
            _insertRows(string(abi.encodePacked(_channelId, docTypeStr)), _values);
        } else if (DocType.Tutorial == _docType) {
            docTypeStr = "Tutorial";
            _insertRows(string(abi.encodePacked(_channelId, docTypeStr)), _values);
        } else if (DocType.HowToGuide == _docType) {
            docTypeStr = "HowToGuide";
            _insertRows(string(abi.encodePacked(_channelId, docTypeStr)), _values);
        }
    }

    /// @notice Removes content from specified row.
    /// @param _channelId The unique identifier of the channel.
    /// @param _docType The enumeration value representing the document type (DocType).
    /// @param _filter The filter condition to determine which rows to delete.
    /// TODO: fix permissions
    function removeContent(bytes32 _channelId, DocType _docType, string memory _filter) public {
        string memory docTypeStr;

        if (DocType.Explanation == _docType) {
            docTypeStr = "Explanation";
            _deleteRows(string(abi.encodePacked(_channelId, docTypeStr)), _filter);
        } else if (DocType.Tutorial == _docType) {
            docTypeStr = "Tutorial";
            _deleteRows(string(abi.encodePacked(_channelId, docTypeStr)), _filter);
        } else if (DocType.HowToGuide == _docType) {
            docTypeStr = "HowToGuide";
            _deleteRows(string(abi.encodePacked(_channelId, docTypeStr)), _filter);
        }
    }

    /// ====================================
    /// ============ Internal ==============
    /// ====================================

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

        uint256 tableId = _tableland.createTable(address(this), statement);

        _tableIds[_name] = tableId;
        _tableNames[tableId] = _name;
        _names.push(_name);
    }

    /// @notice Inserts rows into a table with the specified name, using specified columns and values.
    /// @param _name The name of the table to insert rows into.
    /// @param _values The values to insert into the specified columns.
    function _insertRows(string memory _name, string memory _values) internal {
        uint256 tableId = _tableIds[_name];
        string memory tableName = _toNameFromId(tableId);

        _tableland.runSQL(
            address(this),
            tableId,
            string.concat("INSERT INTO ", tableName, "VALUES", _values)
        );
    }

    /// @notice Deletes rows from a table with the specified name using a filter condition.
    /// @param _name The name of the table to delete rows from.
    /// @param _filter The filter condition to determine which rows to delete.
    function _deleteRows(string memory _name, string memory _filter) internal {
        uint256 tableId = _tableIds[_name];
        string memory tableName = _toNameFromId(tableId);

        _tableland.runSQL(
            address(this),
            tableId,
            string(abi.encodePacked("DELETE FROM ", tableName, " WHERE ", _filter))
        );
    }

    function _toNameFromId(uint256 tableId) internal view returns (string memory) {
        return string.concat("_", Strings.toString(block.chainid), "_", Strings.toString(tableId));
    }
}
