// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";


contract ProductManagement is AccessControl{
    using Counters for Counters.Counter;

    Counters.Counter public tokenIDCounter;
    Counters.Counter public sellerIDCounter;

    mapping(address => Seller) private  addressToSeller;
    mapping (uint => Item) private serialToItem;
    mapping(address=> Item[]) private sellerToItem;
    mapping(uint => mapping(address=>uint)) private itemRatings;

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
        string description;
        address []ratingsAdded;
        string [] reviews;
        address []buyers;

    }

    modifier itemExists(uint _serialNumber){
        require(serialToItem[_serialNumber].serialNumber != 0 , "The item doesnt exist");
        _;
    }
    modifier onlyBuyer(uint _serialNumber){
        bool isPresent = false;
        Item memory item = serialToItem[_serialNumber];
        address sender = msg.sender;
        for(uint i=0;i<item.buyers.length;i++){
            if(item.buyers[i] ==sender){
                isPresent = true;
                break;
            }        
               }
        require(isPresent, "You are not the buyer of the item");
        _;
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

    function getAllItems() public view returns(Item[] memory){
        uint n = tokenIDCounter.current();
        Item[] memory items = new Item[](n);
        for(uint i=1;i<=n;i++){
            Item memory item = getItem(i);
            items[i-1] = item;
        }
        return items;
    }

    function addReview(string memory review , uint _serialNumber) external onlyBuyer(_serialNumber) {
        Item storage item = getItem(_serialNumber);
        item.reviews.push(review);
    }
    function addSeller(string memory _name, address _sellerAddress,uint _lat , uint _long) external onlyRole(DEFAULT_ADMIN_ROLE)  {
        require(addressToSeller[_sellerAddress].ID==0 , "Seller already present");
        sellerIDCounter.increment();
        addressToSeller[_sellerAddress] = Seller(_name , sellerIDCounter.current() , _sellerAddress , Location(_lat , _long)) ;
        grantRole(SELLER_ROLE , _sellerAddress);


    }

    function addItem(string memory _name ,  string memory _description) external  onlyRole(SELLER_ROLE) {
        
        tokenIDCounter.increment();
        Item storage item  = serialToItem[tokenIDCounter.current()];
        item.name = _name;
        item.serialNumber = tokenIDCounter.current();
        item.description = _description;
    }

    function removeItem(uint _serialNumber) external onlyRole(DEFAULT_ADMIN_ROLE){
        delete serialToItem[_serialNumber];
    }

    function removeSeller(address _sellerAddress) external onlyRole(DEFAULT_ADMIN_ROLE){
        delete addressToSeller[_sellerAddress];
    }

    function addBuyer(address buyer , uint _serialNumber) external onlyRole(SELLER_ROLE) {
        Item storage item = getItem(_serialNumber);
        item.buyers.push(buyer);
    }

    function getRatingOfItem(uint _serialNumber) external view itemExists(_serialNumber) returns (uint){
        Item memory item = getItem(_serialNumber);
        uint ratingSum=0;
        mapping(address=>uint) storage map = itemRatings[_serialNumber];

        for(uint i=0;i<item.ratingsAdded.length;i++){
            ratingSum+= map[item.ratingsAdded[i]];
        }
        return ratingSum/item.ratingsAdded.length;
    }

    function addRating(uint _serialNumber , uint rating) external  itemExists(_serialNumber) onlyBuyer(_serialNumber) {
        Item storage item = getItem(_serialNumber);
        bool addressPresent =false;
        address sender = msg.sender;
        for(uint i=0;i<item.ratingsAdded.length;i++){
            if(item.ratingsAdded[i] == sender){
            addressPresent = true;
            break;
            }
        }
        if(addressPresent){
            item.ratingsAdded.push(sender);
        }
        itemRatings[_serialNumber][sender] = rating*RATING_DECIMAL;

    }

    
}