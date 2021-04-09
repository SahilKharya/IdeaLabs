import { Tabs, Tab } from 'react-bootstrap'
import React, { Component } from 'react';
import MediWallet from '../abis/MediWallet.json'
import Web3 from 'web3';
import './App.css';

//h0m3w0rk - add new tab to check accrued interest

class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum!=='undefined'){
      const web3 = new Web3(window.ethereum);
      const netId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();
      // console.log(accounts);

      if(typeof accounts[0] !== 'undefined'){
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({account: accounts[0], balance: balance, web3: web3})
      } else{
        window.alert("Please login with Metamask")
      }

      new web3.eth.Contract(MediWallet.abi, accounts[0])

    } else {
      window.alert('Please install Metamask');
    }
    //check if MetaMask exists

      //assign to values to variables: web3, netId, accounts

      //check if account is detected, then load balance&setStates, elsepush alert

      //in try block load contracts

    //if MetaMask not exists push alert
  }

  async deposit(amount) {
    //check if this.state.dbank is ok
      //in try block call dBank deposit();
  }

  async withdraw(e) {
    //prevent button from default click
    //check if this.state.dbank is ok
    //in try block call dBank withdraw();
  }
  myChangeHandler = (event) => {
    console.log(event);
    let nam = event.target.name;
    let val = event.target.record;
    // this.setState
    console.log(this.state)
  }
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      balance: 0,
      name: '',
      record: ''
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar fixed-top bg-primary flex-md-nowrap shadow">
        <div className="row">
          <div className="col-s6">
          <b className="text-center">Medi Wallet</b>
            
          </div>
          <div className="col-s6 text-right">
          <b>{this.state.account}</b>

          </div>
        </div>
     
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to Medi Wallet</h1>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="addRecord" title="addRecord">
                  <div>
                    Add new records
                    <br></br><br></br>
                    <form onSubmit={(e)=> {
                      e.preventDefault();
                      let name = this.nam.value;
                    }}>
                    <div className="form-group">
                      <label>Name: <input id="name" name="name" class="form-control" onChange={this.myChangeHandler} required/></label>
                    </div>
                    <div className="form-group">
                      <label>Record: <textarea id="record" name="record" value={this.state.value} class="form-control" onChange={this.myChangeHandler} required></textarea></label>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                    </form>
                  </div>
                </Tab>
                {/*add Tab withdraw*/}
              </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;