/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance'; // to display balance in Debits page


const Debits = (props) => {
  // helper function for form submission to add a new debit 
  const submit = (e) => {
    e.preventDefault();

    // gets values entered by user from the form
    const description = e.target.description.value;
    const amount = parseFloat(e.target.amount.value)  // converts input string to float
    
    if (description && amount) { // if both are provided
      // creates a new debit object 
      const newDebit = {
        id: Date.now(), // unique id based on current time
        description,
        amount,
        date: new Date().toISOString() // gets current date in date time string format: YYYY-MM-DDTHH:mm:ss.sssZ
      };

      // call addDebit function passed from App.js
      props.addDebit(newDebit);
      //clear form after sumbitting
      e.target.reset();
    } 
    else {
      alert("You must fill all fields. Try again.")
    }
  };

  
  // function to render the list of debit items
  const debitsView = () => {
    // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
    return props.debits.map(debit => (
      <li key={debit.id}>
        {debit.amount} {debit.description} {debit.date.slice(0,10)} {/* Slices date to yyyy-mm-dd */}
      </li>
    ));
  };

  // render debits page
  return (
    <div>
      <h1>Debits</h1>
      {/* Render list of debit items, fetched data at top */}
      {debitsView()}

      {/* Form for adding new debit */}
      <form onSubmit={submit}>
        <input type="text" name="description" placeholder='Description' />
        <input type="number" name="amount" placeholder='Amount' />
        <button type="submit">Add Debit</button>
      </form>
      <br/>

      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;