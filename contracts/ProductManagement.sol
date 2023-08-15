// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract ProductManagement is AccessControl{
    using Counters for Counters.Counter;
    Counters.Counter public tokenIDCounter;
    Counters.Counter public sellerIDCounter;
    mapping(address => Seller) public addressToSeller;
    mapping (uint => Item) public serialToItem;
    uint public constant RATING_DECIMAL = 100;
    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");
    uint256 private constant RESOLUTION = 1000000000000000;
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
        uint serialNumber;
        mapping(address => uint) ratings;
        mapping(address=>Seller) sellers;
        uint totalRatings;

    }

    constructor(){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function getSeller(address _address) public view returns (Seller memory ){
        return addressToSeller[_address];
    }

    function addSeller(string memory _name, address _sellerAddress,uint _lat , uint _long) external onlyRole(DEFAULT_ADMIN_ROLE) returns(Seller memory ) {
        require(addressToSeller[_sellerAddress].ID!=0 , "Seller already present");
        sellerIDCounter.increment();
        addressToSeller[_sellerAddress] = Seller(_name , sellerIDCounter.current() , _sellerAddress , location(_lat , _long)) ;
        return addressToSeller[_sellerAddress];
    }

    function addItem(string memory _name ,  uint _serialNumber  ) external  onlyRole(SELLER_ROLE) {
        require(serialToItem[_serialNumber].serialNumber!=0 , "The item already exists");
        tokenIDCounter.increment();
        Item storage item  = serialToItem[_serialNumber];
        item.name = _name;
        item.serialNumber = tokenIDCounter.current();
        item.totalRatings = 0;


    }
}