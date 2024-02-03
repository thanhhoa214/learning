// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @custom:security-contact hoanguyen.rin@gmail.com
contract ChordsNFT is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId = 1;

    mapping(string tokenUri => uint256) private _existingTokenIds;

    constructor() ERC721("Chords NFT", "CNFT") {}

    function totalTokenCount() external view returns (uint) {
        return _nextTokenId - 1;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(string memory uri) public {
        require(_existingTokenIds[uri] == 0, "This URI was minted already");
        uint256 tokenId = _nextTokenId++;
        _setTokenURI(tokenId, uri);
        _safeMint(msg.sender, tokenId);
        _existingTokenIds[uri] = tokenId;
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
