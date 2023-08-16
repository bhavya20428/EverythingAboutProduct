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
    mapping(address=> Item[]) sellerToItem;
    mapping(uint => mapping(address=>uint)) itemRatings;

    uint public constant RATING_DECIMAL = 100;
    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");
    uint256 private constant RESOLUTION = 1000000000000000;

    struct Location{
        uint lat;
        uint long;
    }
    struct Seller{
        string name;
        uint ID;
        address sellerAddress;
        Location cordinates;


    }

    struct Item{
        string name;
        uint serialNumber;
        uint totalRatings;
        string description;
        address []ratingsAdded;

    }

    constructor(){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(SELLER_ROLE, msg.sender);
    }

    function getSeller(address _address) public view returns (Seller memory ){
        return addressToSeller[_address];
    }

    function getItem(uint _serialNumber) internal view returns (Item storage){
        return serialToItem[_serialNumber];
    }

    function getItemCount() public view returns(uint){
        return tokenIDCounter.current();
    }


    function addSeller(string memory _name, address _sellerAddress,uint _lat , uint _long) external onlyRole(DEFAULT_ADMIN_ROLE)  {
        require(addressToSeller[_sellerAddress].ID!=0 , "Seller already present");
        sellerIDCounter.increment();
        addressToSeller[_sellerAddress] = Seller(_name , sellerIDCounter.current() , _sellerAddress , Location(_lat , _long)) ;
    }

    function addItem(string memory _name ,  uint _serialNumber  , string memory _description) external  onlyRole(SELLER_ROLE) {
        require(serialToItem[_serialNumber].serialNumber!=0 , "The item already exists");
        tokenIDCounter.increment();
        Item storage item  = serialToItem[_serialNumber];
        item.name = _name;
        item.serialNumber = tokenIDCounter.current();
        item.totalRatings = 0;
        item.description = _description;
    }

    function removeItem(uint _serialNumber) external onlyRole(DEFAULT_ADMIN_ROLE){
        delete serialToItem[_serialNumber];
    }

    function removeSeller(address _sellerAddress) external onlyRole(DEFAULT_ADMIN_ROLE){
        delete addressToSeller[_sellerAddress];
    }

    function getRatingOfItem(uint _serialNumber) external returns (uint){
        Item memory item = serialToItem[_serialNumber];
        uint ratingCount=0;
        uint ratingSum=0;
        mapping temp = 
    }

    
}