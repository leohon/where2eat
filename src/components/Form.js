export default function Form() {  
  const clear = (e) => {
    e.preventDefault();
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