import './App.css';
import { getDatabase, ref, remove} from 'firebase/database';
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
  
  //-----FUNCTIONS-----

  //Matches the first letter of the restaurant name to the corresponding group in the address book.
  const check = (letter) => {
    letter = letter.toUpperCase();
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    //Loop through alphabet, use the index to target the div, then use the childNodes for the specific card container.
    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        return document.getElementsByClassName("group")[i].childNodes[1];
      }
    }
  }
  
  const display = () => {
    // Clear all card containers
    const allCardContainers = document.getElementsByClassName("cardContainer");
    for (let i = 0; i < allCardContainers.length; i++) {
      allCardContainers[i].innerHTML = "";
    }

    // Loop through array and print the card.
    for (let j = 0; j < dataArray.length; j++) {
      // Create the card (with class name), p elements for the data, and remove button.
      const card = document.createElement("div");
      card.classList.add("card");
      const name = document.createElement("p");
      const address = document.createElement("p");
      const dish = document.createElement("p");
      const rm = document.createElement("button");
      rm.classList.add("remove");

      // Added remove button to card.
      rm.innerHTML = "Remove";
      rm.addEventListener("click", () => {
        const rmRef = ref(database, `/${dataArray[j].key}`);

        remove(rmRef);
      });


      // Determine the specific card container
      const block = check(dataArray[j].name[0]);

      const nameStr = dataArray[j].name;
      const addressStr = dataArray[j].address;
      const dishStr = dataArray[j].dish;

      // Add data to p tags
      name.innerHTML = nameStr[0].toUpperCase() + nameStr.slice(1);
      address.innerHTML = addressStr;
      dish.innerHTML = dishStr[0].toUpperCase() + dishStr.slice(1);

      // Append p tags to card div then append div to specific card container
      card.appendChild(name);
      card.appendChild(address);
      card.appendChild(dish);
      card.append(rm);
      block.appendChild(card);
    }
  }

  //-----PROGRAM EXECUTION-----

  //Map through each data entry and store in array.
  for (const key in data) {
    if (data[key] !== null) {
      dataArray.push({key: key, name: data[key].name, address: data[key].address, dish: data[key].dish});
    }
  }
  
  // Waits for page to load before setting up content.
  setTimeout(display, 1000);

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
