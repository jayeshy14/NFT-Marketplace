// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
contract Marketplace is ERC721, ERC721URIStorage, ReentrancyGuard {
    uint public nextTokenId;

    struct Sale{
        uint256 price;
        bool isForSale;
        address payable seller;
        
    }
    mapping(uint256 => Sale) public tokens;

    event Minted(address indexed minter, uint256 tokenId, uint256 price);
    event Purchased(address indexed buyer, uint256 tokenId, uint256 price);

    constructor() ERC721("Image", "IMG"){
        nextTokenId=0;
    }

    function mint(address to, string memory uri, uint256 price) external payable{
        require(bytes(uri).length > 0, "Invalid tokenURI!");
        uint256 tokenId = nextTokenId;
        nextTokenId = nextTokenId + 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        tokens[tokenId] = Sale({price: price, isForSale: true, seller:payable(to)});
        emit Minted(msg.sender, tokenId, price);
    }

    function getTokens() public view returns(Sale[] memory){
        Sale [] memory allTokens = new Sale[](nextTokenId);
        for(uint256 i=0; i<nextTokenId; i++){
            allTokens[i] = tokens[i];
        }
        return allTokens;
    }

    function purchaseToken(uint256 tokenId) external payable {
        require(ownerOf(tokenId)!=address(0));

        require(tokens[tokenId].isForSale, "Token is not for sale");

        uint256 price = tokens[tokenId].price;
        require(msg.value>= price, "Insufficient amount!");

        address seller = ownerOf(tokenId);
        tokens[tokenId].seller = payable(seller);
        require(seller!=msg.sender, "Invalid seller!");
        tokens[tokenId].isForSale = false;
        payable(seller).transfer(msg.value);
        _transfer(seller, msg.sender, tokenId);
        emit Purchased(msg.sender, tokenId, msg.value);
    }

     function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    
}