/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance'; // to display balance in Credits page


const Credits = (props) => {
  // helper function for form submission to add a new credit 
  const submit = (e) => {
    e.preventDefault();

    // gets values entered by user from the form
    const description = e.target.description.value;
    const amount = parseFloat(e.target.amount.value)  // converts input string to float
    
    if (description && amount) { // if both are provided
      // creates a new credit object 
      const newCredit = {
        id: Date.now(), // unique id based on current time
        description,
        amount,
        date: new Date().toISOString() // gets current date in date time string format: YYYY-MM-DDTHH:mm:ss.sssZ
      };

      // call addCredit function passed from App.js
      props.addCredit(newCredit);
      //clear form after sumbitting
      e.target.reset();
    } 
    else {
      alert("You must fill all fields. Try again.")
    }
  };

  
  // function to render the list of credit items
  const creditsView = () => {
    // Extract "id", "amount", "description" and "date" properties of each credits JSON array element
    return props.credits.map(credit => (
      <li key={credit.id}>
        {credit.amount} {credit.description} {credit.date.slice(0,10)} {/* Slices date to yyyy-mm-dd */}
      </li>
    ));
  };

  // render credits page
  return (
    <div>
      <h1>Credits</h1>
      {/* Render list of credit items, fetched data at top */}
      {creditsView()}

      {/* Form for adding new credit */}
      <form onSubmit={submit}>
        <input type="text" name="description" placeholder='Description' />
        <input type="number" name="amount" placeholder='Amount' />
        <button type="submit">Add Credit</button>
      </form>
      <br/>

      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;