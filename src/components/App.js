import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
import './App.css';
import Web3 from 'web3';
import Election from '../abis/Election.json';
import About  from './About';

class App extends Component {

    componentDidMount(){
         this.loadWeb3()
         this.loadBlockChainData()
      }


      constructor(props)
      {
          super(props)
          this.state = {
              account : '',
              Election : null,
              candidates : [],
              candidateCount : 0
          }
      }

  loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
       window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockChainData(){
   const web3 = window.web3
   const accounts = await web3.eth.getAccounts()
   this.setState({  account : accounts[0] })
   //fetch networkId
   const networkId = await web3.eth.net.getId()
   const networkData = Election.networks[networkId]
   //console.log(networkId)
   //fetch address
   if(networkData)
   {
      const election = await web3.eth.Contract(Election.abi,networkData.address)
      //console.log(socialNetwork)
      this.setState({    Election : election })  //left side is constructor's socialNetwork
   }
  else {
      window.alert('SocialNetwork contract is not deployed to detected network')
       }
  }

  render() {
    return (

        <Router>

        <h1 className="heading">ELECTION</h1>
        <hr/>

        <br/>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Rules:<br/>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Maximum one candidate in each party.<br/>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Maximum one vote can be casted by each voter.<br/>
       <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Candidates cannot enter into election after voting commences.


       <div className = "text-center ">
          <div className = "candidatesDiv">
            <form className="form-inline" action="">
                <div className="form-group">
                    <label htmlFor="party" className = "custom">Party : </label>
                    <input type="party" className="form-control" id="party"/>
                </div>
                <div className="form-group">
                    <label htmlFor="candidate" className="custom">Candidate: </label>
                    <input type="candidate" className="form-control" id="candidate"/>
                </div>
                <Link to="/about"><button type="submit" className="btn btn-success"  >Submit</button></Link>
                </form>
            </div>
          </div>

            <Switch>
            <Route  path = "/about" ><About/></Route>

            </Switch>



        </Router>


   );


  }
}

export default App;
