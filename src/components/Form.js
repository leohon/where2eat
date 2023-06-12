import { getDatabase, ref, push } from "firebase/database";
import { useFirebaseApp } from 'reactfire';

export default function Form() {  
  const database = getDatabase(useFirebaseApp());
  const dataRef = ref(database);
  
  // On submit, retrieve values from form, push data to database, and reset form.
  const submit = (e) => {
    e.preventDefault();
    
    const nameVal = document.getElementById("name").value;
    const addressVal = document.getElementById("address").value;
    const dishVal = document.getElementById("dish").value;
    
    const newRestaurant = {
      name: nameVal,
      address: addressVal,
      dish: dishVal
    }

    push(dataRef, newRestaurant);
    document.querySelector("form").reset();
  }

  return (
    <section className="form">
      <form onSubmit={submit}>
        <h2>Restaurant</h2>

        <div className="containLI">
          <label htmlFor="name">Name</label>
          <input type="text" className="name" id="name" required/>
        </div>

        <div className="containLI">
          <label htmlFor="address">Address</label>
          <input type="text" className="address" id="address" required/>
        </div>

        <div className="containLI">
          <label htmlFor="dish">Dish</label>
          <input type="text" className="dish" id="dish" required/>
        </div>

        <div className="buttonContainer">
          <button className="submit">Submit</button>
        </div>
      </form>
    </section>
  )
}