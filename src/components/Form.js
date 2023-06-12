import { getDatabase, ref, push } from "firebase/database";
import { useFirebaseApp } from 'reactfire';

export default function Form(props) {  
  const database = getDatabase(useFirebaseApp());
  const dataRef = ref(database);
  
  const clear = (e) => {
    e.preventDefault();
    
    const nameVal = document.getElementById("name").value;
    const addressVal = document.getElementById("address").value;
    const dishVal = document.getElementById("dish").value;
    
    const newUser = {
      name: nameVal,
      address: addressVal,
      dish: dishVal
    }
    
    push(dataRef, newUser)

    document.querySelector("form").reset();
  }

  return (
    <section className="form">
      <form onSubmit={clear}>
        <h2>Restaurant</h2>

        <div className="containLI">
          <label htmlFor="name">Name</label>
          <input type="text" className="name" id="name" required/>
        </div>

        <div className="containLI">
          <label htmlFor="address">Address</label>
          <input type="text" className="address" id="address" /> {/* required */}
        </div>

        <div className="containLI">
          <label htmlFor="dish">Dish</label>
          <input type="text" className="dish" id="dish" /> {/* required */}
        </div>

        <div className="buttonContainer">
          <button className="submit">Submit</button>
        </div>
      </form>
    </section>
  )
}