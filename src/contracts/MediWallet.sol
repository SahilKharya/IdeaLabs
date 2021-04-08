// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0 <0.8.0;
contract MediWallet {
    address patient;

    struct patientData {
        string name;
        string recordHash;
    }
    struct adminInfo {
        string name;
        address adminAddress;
    }
    
    mapping(address => patientData) public patientInfo;
    mapping(address => mapping(uint => adminInfo)) public adminList;

    constructor() public{
       
    }

    function storeRecordHash(string memory _name, string memory _recordHash) public{
        patientInfo[msg.sender] = patientData(_name, _recordHash);
    }
    
    function getRecord() public view returns( string memory ){
        return patientInfo[msg.sender].recordHash;
        

    }
    function addAdmin(uint _id, string memory _name, address _adminAddress) public {
        adminList[msg.sender][_id] = adminInfo(_name, _adminAddress);
    }
}


    
