// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

contract RizzDocsDoc is Ownable, ERC721Holder {
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

    ITablelandTables internal immutable _tableland;

    string[] names;
    mapping(uint256 => string) private tableNames;
    mapping(string => uint256) private tableIds;

    /// ===============================
    /// ======== Constructor ==========
    /// ===============================

    constructor() {
        _tableland = TablelandDeployments.get();

        _createTable(
            "Explanation",
            "id INTEGER PRIMARY KEY, channelId TEXT NOT NULL, itemIndex INTEGER, title TEXT UNIQUE, description TEXT NOT NULL, contentCID TEXT NOT NULL, encrypted INTEGER NOT NULL, editedAt INTEGER"
        );
        _createTable(
            "Tutorial",
            "id INTEGER PRIMARY KEY, channelId TEXT NOT NULL, itemIndex INTEGER, title TEXT UNIQUE, description TEXT NOT NULL, contentCID TEXT NOT NULL, encrypted INTEGER NOT NULL, editedAt INTEGER"
        );
        _createTable(
            "HowToGuide",
            "id INTEGER PRIMARY KEY, channelId TEXT NOT NULL, itemIndex INTEGER, title TEXT UNIQUE, description TEXT NOT NULL, contentCID TEXT NOT NULL, encrypted INTEGER NOT NULL, editedAt INTEGER"
        );
        _createTable(
            "Reference",
            "id INTEGER PRIMARY KEY, channelId TEXT NOT NULL, itemIndex INTEGER, title TEXT UNIQUE, description TEXT NOT NULL, contentCID TEXT NOT NULL, encrypted INTEGER NOT NULL, editedAt INTEGER"
        );
    }


    /// ===============================
    /// ============ Views ============
    /// ===============================

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

    /// @notice Adds content to a specified row.
    /// @param _docType The enumeration value representing the document type (DocType).
    /// @param _values The content values to be added.
    function addContent(DocType _docType, string memory _values) public onlyOwner {
        string memory docTypeStr;

        if (DocType.Explanation == _docType) {
            docTypeStr = "Explanation";
            _insertRows(docTypeStr, _values);
        } else if (DocType.Tutorial == _docType) {
            docTypeStr = "Tutorial";
            _insertRows(docTypeStr, _values);
        } else if (DocType.HowToGuide == _docType) {
            docTypeStr = "HowToGuide";
            _insertRows(docTypeStr, _values);
        } else if (DocType.Reference == _docType) {
            docTypeStr = "Reference";
            _deleteRows(docTypeStr, _values);
        }
    }

    /// @notice Removes content from specified row.
    /// @param _docType The enumeration value representing the document type (DocType).
    /// @param _filter The filter condition to determine which rows to delete.
    function removeContent(DocType _docType, string memory _filter) public onlyOwner {
        string memory docTypeStr;

        if (DocType.Explanation == _docType) {
            docTypeStr = "Explanation";
            _deleteRows(docTypeStr, _filter);
        } else if (DocType.Tutorial == _docType) {
            docTypeStr = "Tutorial";
            _deleteRows(docTypeStr, _filter);
        } else if (DocType.HowToGuide == _docType) {
            docTypeStr = "HowToGuide";
            _deleteRows(docTypeStr, _filter);
        } else if (DocType.Reference == _docType) {
            docTypeStr = "Reference";
            _deleteRows(docTypeStr, _filter);
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
            string.concat("INSERT INTO ", tableName, "VALUES", _values)
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
}
