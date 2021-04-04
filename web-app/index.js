// web3 provider with fallback for old version
window.addEventListener('load', async () => {
  // New web3 provider
  if (window.ethereum) {
    // window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:21636"));
    window.web3 = new Web3(ethereum);
    try {
      // ask user for permission
      await ethereum.enable();
      console.log(ethereum)

      // user approved permission
    } catch (error) {
      // user rejected permission
      console.log('user rejected permission');
    }
  }
  // Old web3 provider
  else if (window.web3) {
    console.log('olddd    ')
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:21636"));
    // no need to ask for permission
  }
  // No web3 provider
  else {
    console.log('No web3 provider detected');
  }
  const qr = new EthereumQRPlugin();

  const sendDetails = {
      to: '0x243ea5FD501E7f4131B830AE20706196a4F2f3Ef',
      value: 1,
      gas: 42000
  };
  const configDetails = {
    size: 180,
    selector: '#eth-qr',
    options: {
      margin: 2
    }
  };

  //run the plugin
  qr.toCanvas(sendDetails, configDetails);
})