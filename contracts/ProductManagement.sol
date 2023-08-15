// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ProductManagement is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter public tokenIDCounter;
    Counters.Counter public sellerIDCounter;
    mapping(address => Seller) public addressToSeller;
    mapping (string => Item) public serialToItem;
    uint public constant RATING_DECIMAL = 100;

    struct location{
        uint lat;
        uint long;
    }
    struct Seller{
        string name;
        uint ID;
        address sellerAddress;
        location cordinates;


    }

    struct Item{
        string name;
        string productNumber;
        string serlalNumber;
        mapping(address => uint) ratings;
        mapping(address=>Seller) sellers;



    }

    function getSeller(address _address) public view returns (Seller memory ){
        return addressToSeller[_address];
    }

    function addSeller(string memory _name, address _sellerAddress,uint _lat , uint _long) external onlyOwner returns(Seller memory ) {
        sellerIDCounter.increment();
        addressToSeller[_sellerAddress] = Seller(_name , sellerIDCounter.current() , _sellerAddress , location(_lat , _long)) ;
        return addressToSeller[_sellerAddress];
    }
}