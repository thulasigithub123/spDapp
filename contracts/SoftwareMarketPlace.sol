// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SoftwareMarketPlace {
    struct Software {
        uint256 id;
        address owner;
        uint256 price;
        Status status;
        uint256 addedTimestamp;
        uint256 purchasedTimestamp;
    }


    struct SoftwareDetails {
        string name;
        uint256 id;
        address owner;
        uint256 price;
        Status status;
        uint256 addedTimestamp;
        uint256 purchasedTimestamp;
    }

    uint256 public sample ;

    enum Status {Submitted, Settled}

    mapping(string => Software) public softwareItems;
    string[] public softwareNames; // Array to store all the software names
    mapping(string => uint256) public softwareNameToId; // Mapping to get software ID by name

    address public manager;

    event SoftwareSubmitted(string name, uint256 id, uint256 price, uint256 addedTimestamp);
    event SoftwareSettled(string name, uint256 id, address owner, uint256 purchasedTimestamp);
    event SoftwareDeleted(string name);

    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can perform this action");
        _;
    }

    modifier softwareExists(string memory name) {
        require(softwareItems[name].id > 0, "Software does not exist");
        _;
    }

    modifier onlyNotManager() {
        require(msg.sender != manager, "Managers cannot perform this action");
        _;
    }

    constructor() {
        sample=4;
        manager = msg.sender;
        // Initialize some initial software items
        addInitialSoftware("Adobe Photoshop", 0.1 ether);
        addInitialSoftware("Adobe Illustrator", 0.08 ether);
        addInitialSoftware("Adobe Lightroom", 0.05 ether);
        addInitialSoftware("Adobe Audition", 0.03 ether);
        addInitialSoftware("Adobe Muse", 0.23 ether);
        addInitialSoftware("Adobe CreativeCloud", 0.33 ether);
        addInitialSoftware("Adobe Indesign", 1.03 ether);
        addInitialSoftware("Adobe Dreamweaver", 3.03 ether);
        addInitialSoftware("Adobe XD", 4.03 ether);
        addInitialSoftware("Adobe Premiere", 0.02 ether);
        addInitialSoftware("Adobe Animate", 0.003 ether);
        addInitialSoftware("Adobe Express", 0.23 ether);
    }

    function addInitialSoftware(string memory name, uint256 price) private {
        uint256 timestamp = block.timestamp; // Current block timestamp
        softwareItems[name] = Software(softwareNames.length + 1, manager, price, Status.Submitted, timestamp, 0);
        softwareNames.push(name); // Add the name to the array
        softwareNameToId[name] = softwareNames.length; // Store the ID for the name
        emit SoftwareSubmitted(name, softwareNames.length, price, timestamp);
    }

    function addSoftware(string calldata name, uint256 price) external onlyManager {
        require(softwareItems[name].id == 0, "Software with this name already exists");
        uint256 timestamp = block.timestamp; // Current block timestamp
        softwareItems[name] = Software(softwareNames.length + 1, manager, price, Status.Submitted, timestamp, 0);
        softwareNames.push(name); // Add the name to the array
        softwareNameToId[name] = softwareNames.length; // Store the ID for the name
        emit SoftwareSubmitted(name, softwareNames.length, price, timestamp);
    }

   function deleteSoftware(string calldata name) external onlyManager softwareExists(name) {
    uint256 softwareIndexToDelete = softwareNameToId[name] - 1; // Get the index of the software item to delete

    require(softwareIndexToDelete < softwareNames.length, "Software item not found");

    // Swap and pop to remove the software item from the array
    softwareNames[softwareIndexToDelete] = softwareNames[softwareNames.length - 1];
    softwareNames.pop();

    // Update the softwareNameToId mapping to reflect the new index of the software item
    softwareNameToId[softwareNames[softwareIndexToDelete]] = softwareIndexToDelete + 1;

    // Delete the software item from the softwareItems mapping
    delete softwareItems[name];

    emit SoftwareDeleted(name);
}


    function settleSoftwareOwnership(string calldata name, address newOwner) external payable softwareExists(name) onlyNotManager {
        Software storage software = softwareItems[name];
        require(software.status == Status.Submitted, "Software is already settled");
        require(msg.value >= software.price, "Insufficient payment");

        address previousOwner = software.owner;
        software.owner = newOwner;
        software.status = Status.Settled;
        software.purchasedTimestamp = block.timestamp; // Current block timestamp

        emit SoftwareSettled(name, software.id, newOwner, software.purchasedTimestamp);

        // Transfer the payment to the previous owner
        (bool transferSuccess, ) = previousOwner.call{value: msg.value}("");
        require(transferSuccess, "Transfer to previous owner failed");
    }

    function getSoftwareStatus(string calldata name) external view returns (Status) {
        return softwareItems[name].status;
    }

    function getSoftwareDetails(string calldata name)
        external
        view
        returns (
            uint256,
            address,
            uint256,
            Status,
            uint256,
            uint256
        )
    {
        Software memory software = softwareItems[name];
        return (
            software.id,
            software.owner,
            software.price,
            software.status,
            software.addedTimestamp,
            software.purchasedTimestamp
        );
    }

    function getAllSoftwareNamesAndIds() external view returns (string[] memory, uint256[] memory) {
        uint256[] memory softwareIds = new uint256[](softwareNames.length);
        for (uint256 i = 0; i < softwareNames.length; i++) {
            softwareIds[i] = i + 1;
        }
        return (softwareNames, softwareIds);
    }

    function buySoftware(string calldata name) external payable softwareExists(name) onlyNotManager {
        Software storage software = softwareItems[name];
        require(software.status == Status.Submitted, "Software is already settled");
        require(msg.value >= software.price, "Insufficient payment");

        address previousOwner = software.owner;
        software.owner = msg.sender;
        software.status = Status.Settled;
        software.purchasedTimestamp = block.timestamp; // Current block timestamp

        emit SoftwareSettled(name, software.id, msg.sender, software.purchasedTimestamp);

        // Transfer the payment to the previous owner
        (bool transferSuccess, ) = previousOwner.call{value: msg.value}("");
        require(transferSuccess, "Transfer to previous owner failed");
    }

    function getTotalSoftwareItems() external view returns (uint256) {
        return softwareNames.length;
    }

    function getAllSoftwareItems() external view returns (SoftwareDetails[] memory) {
        SoftwareDetails[] memory allSoftware = new SoftwareDetails[](softwareNames.length);
        for(uint256 i = 0; i < softwareNames.length; i++) {
            Software memory software = softwareItems[softwareNames[i]];
            allSoftware[i] = SoftwareDetails(
                softwareNames[i],
                software.id,
                software.owner,
                software.price,
                software.status,
                software.addedTimestamp,
                software.purchasedTimestamp
            );
        }
        return allSoftware;
    }
}


 
