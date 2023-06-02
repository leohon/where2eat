export default function Form() {
  const check = (letter) => {
    letter = letter.toUpperCase();
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        console.log("true" + i);
      }
    }
  }
  
  const clear = (e) => {
    e.preventDefault();

    const form = document.querySelector("form");
    const name = document.getElementById("name");

    check(name.value[0]);
    form.reset();
  }

  return (
    <section className="form">
      <form onSubmit={clear}>
        <h2>Restaurant</h2>

        <label htmlFor="name">Name</label>
        <input type="text" className="name" id="name" required/>
        
        <label htmlFor="address">Address</label>
        <input type="text" className="address" id="address" /> {/* required */}
        
        <label htmlFor="dish">Recommended Dish</label>
        <input type="text" className="dish" id="dish" /> {/* required */}

        <button className="submit">Submit</button>
      </form>
    </section>
  )
}