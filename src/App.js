import './App.css';
import { getDatabase, ref } from 'firebase/database';
// useDatabase, useDatabaseListData
import { DatabaseProvider, useDatabaseObjectData, useFirebaseApp } from 'reactfire';
import Header from './components/Header';
import Steps from './components/Steps';
import Form from './components/Form';
import Book from './components/Book';
import Footer from './components/Footer';

function App() {
  const database = getDatabase(useFirebaseApp());
  const dataRef = ref(database);

  const {status, data} = useDatabaseObjectData(dataRef);
  
  const dataArray = [];

  if (status === 'loading') {
    return <span>loading...</span>;
  }
  
  //Matches the first letter of the restaurant name to the corresponding group in the address book.
  const check = (letter) => {
    letter = letter.toUpperCase();
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    //Loop through alphabet, using the index to target the div, then the childNodes for the specific card container
    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        const specCardContainer = document.getElementsByClassName("group")[i].childNodes[1];

        return specCardContainer;
      }
    }
  }
  
    const loop = () => {
    //Loop through array and print each name.
    for (let i = 0; i < dataArray.length; i++) {
      // Create the card and p elements for the data.
      const card = document.createElement("div");
      card.classList.add("card");
      const name = document.createElement("p");
      const address = document.createElement("p");
      const dish = document.createElement("p");

      // Determine the specific card container
      const block = check(dataArray[i].name[0]);

      // ISSUE: last data entry of same first letter overrides earlier entries. Commented out for now, works on page refresh. Code refresh causes multiple entries***.
      // block.innerHTML = "";

      // Add data to p tags
      name.innerHTML = dataArray[i].name;
      address.innerHTML = dataArray[i].address;
      dish.innerHTML = dataArray[i].dish;

      // Append p tags to card div then append div to specific card container
      card.appendChild(name);
      card.appendChild(address);
      card.appendChild(dish);
      block.appendChild(card);
    }
  }

  //Map through each data entry and store in array.
  for (const key in data) {
    if (data[key] !== null) {
      dataArray.push({key: key, name: data[key].name, address: data[key].address, dish: data[key].dish});
    }
  }
  
  // Waits for page to load before setting up content.
  setTimeout(loop, 1000);

  return (
    <DatabaseProvider sdk={database}>
      <div className="wrapper">
        <Header />

        <main>
          <section className='userUse'>
            <Steps />
            <Form />
          </section>

          <Book />
        </main>

        <Footer />
      </div>
    </DatabaseProvider>
  );
}

export default App;
