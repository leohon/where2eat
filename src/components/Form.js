export default function Form() {
  return (
    <div>
      <form action="">
        <h2>Restaurant</h2>

        <label htmlFor="">Name</label>
        <input type="text" />
        
        <label htmlFor="">Address</label>
        <input type="text" />
        
        <label htmlFor="">Recommended Dish</label>
        <input type="text" />

        <button>Submit</button>
      </form>
    </div>
  )
}