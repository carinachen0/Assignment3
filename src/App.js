/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';  // Library used to send asynchronous HTTP requests to RESTful endpoints (APIs)

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 0, // set inital bal to 0
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // make aync API call to retrieve data from remote website
  async componentDidMount() {
    // initialize totals
    let totalCredits = 0;
    let totalDebits = 0;

    // Fetch starter credit list from external API
    try {
      let creditResponse = await axios.get('https://johnnylaicode.github.io/api/credits.json'); //axious fetches data  
      console.log(creditResponse);
      // to get data object in thsi response, need to use "response.data"
      this.setState({creditList: creditResponse.data}) // store recieved dta in state's "creditList" object
    
      // Calculate how credit is added to account to update balance 
      for (let credit of this.state.creditList) {
        totalCredits += credit.amount;
      }
    }
    catch (error) { // print out details about errors at console if there is any error 
      if (error.creditResponse) {
        console.log(error.creditResponse.data); // prints out error mssg ex. Not Found
        console.log(error.creditResponse.status); // prints out error status code ex. 404 
      }
    }

    // Fetch starter debit list from external API
    try { 
      let debitResponse = await axios.get('https://johnnylaicode.github.io/api/debits.json'); //axious fetches data  
      console.log(debitResponse);
      this.setState({debitList: debitResponse.data}) // store recieved data in state's "debitList" object
      
      // Calculate debit 
      for (let debit of this.state.debitList) {
        totalDebits += debit.amount;
      }
    }
    catch (error) {
      if (error.debitResponse) {
        console.log(error.debitResponse.data); // prints out error mssg ex. Not Found
        console.log(error.debitResponse.status); // prints out error status code ex. 404 
      }
    }
    // calculate account balance 
    let balance = totalCredits - totalDebits;

    // update states
    this.setState ({accountBalance: Math.round(balance * 100) / 100})
  }

  // adding new credit item
  addCredit = (newCredit) => {
    this.setState(prevState => ({
      creditList: [...prevState.creditList, newCredit],
      // updates account balance by adding the new credit amount
      accountBalance: parseFloat((prevState.accountBalance + newCredit.amount).toFixed(2))
    }));
  }

  // adding a new debit item
  addDebit = (newDebit) => {
    this.setState(prevState => ({
      debitList: [...prevState.debitList, newDebit],
      // updates account balance by subtracting the new debit amount
      accountBalance: parseFloat((prevState.accountBalance - newDebit.amount).toFixed(2))
    }));
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits credits={this.state.creditList} addCredit={this.addCredit} accountBalance={this.state.accountBalance} />) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/Assignment3">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;