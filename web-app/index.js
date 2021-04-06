// web3 provider with fallback for old version
// const Web3 = require('web3');

var myAddress;
window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
    // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:21636"));
    window.web3 = new Web3(ethereum);
    try {
      // ask user for permission
      await ethereum.enable();
      console.log(ethereum)
      myAddress = ethereum.selectedAddress
      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log('user rejected permission');
    }
  }
  // Old web3 provider
  else if (window.web3) {
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:21636"));
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log('No web3 provider detected');
  }
  // //Fetch Ethereum Price 
  // var priceURL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr';
  // fetch(priceURL).then(response => {
  //   return response.json();
  // }).then(data => {
  //   // Work with JSON data here
  //   var eth_inr = data.ethereum.inr;
  //   document.getElementById("eth_inr").innerHTML = eth_inr;
  // }).catch(err => {
  //   console.log(err);
  //   // Do something for an error here
  // });
  
  // console.log(web3.eth.accounts[0]);
  // console.log(web3.eth.getAccounts());
  document.getElementById("address").innerHTML = myAddress;

  let contractAddress = "0x9A0160dF759f8C479D48224404eA84426a17177E"

  var contractAbi = web3.eth.contract([
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "adminList",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "adminAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "patientInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "recordHash",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_recordHash",
          "type": "string"
        }
      ],
      "name": "storeRecordHash",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getRecord",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_adminAddress",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]);
  
  var contract = contractAbi.at(contractAddress);
  
})
var qr;




var account;

web3.eth.getAccounts(function (err, accounts) {
  if (err != null) {
    alert("Error retrieving accounts.");
    return;
  }
  if (accounts.length == 0) {
    alert("No account found! Make sure the Ethereum client is configured properly.");
    return;
  }
  account = accounts[0];
  console.log('Account: ' + account);
  web3.eth.defaultAccount = account;
});

function stringToHash(string) {
  var hash = 0;
  if (string.length == 0) return hash;
  for (i = 0; i < string.length; i++) {
      char = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
  }
  return hash;
}
function storeRecords(){
  name = document.getElementById('name').value;
  record = document.getElementById('record').value;
  record = record.trim();
  console.log(record);
  data = {Name: name, address: account, medicalReport: record};
  fetch("http://localhost:3400/patient/",{
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(function (response) {
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  contract.storeRecordHash.sendTransaction(name, record, {
    from: account,
    gas: 100000
  }, function (error, result) {
    if (!error)
      console.log(result);
    else
      console.log(error.code)
  })
}

function getRecords() {
console.log(account);
fetch("http://localhost:3400/patient/"+account)
.then(function (response) {
  return response.json();
})
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

  contract.patientInfo(account).sendTransaction(function (err, result) {
    if (!err)
      console.log(result);
    else
      console.log(err.code)
  });

}

function generateQRCode() {
  console.log(myAddress)
  var qrtext = document.getElementById("qr-text").value;
  document.getElementById("qr-result").innerHTML = "QR code for " + qrtext +":";
  alert(qrtext);
  qr = new QRious({
    element: document.getElementById('qr-code'),
});
  qr.set({
      foreground: 'black',
      size: 200,
      value: qrtext
  });
}