import './App.css';
import { getDatabase, ref } from 'firebase/database';
import { DatabaseProvider, useDatabase, useDatabaseListData, useDatabaseObjectData, useFirebaseApp } from 'reactfire';
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
  
  //check
  const check = (letter) => {
    letter = letter.toUpperCase();
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    
    // Might change to: letter to CAPS, compare className to 'group' + letter, create in div

    for (let i = 0; i < alphabet.length; i++) {
      if (letter === alphabet[i]) {
        console.log("true" + i);
        // return letter;
      }
    }
  }

  //Map through each data entry and store in array.
  for (const key in data) {
    if (data[key] !== null) {
      dataArray.push({key: key, name: data[key].name, address: data[key].address, dish: data[key].dish});
    }
  }

  console.log(dataArray);
  
  //Loop through array and print each name.
  for (let i = 0; i < dataArray.length; i++) {
    console.log(dataArray[i].name);
    check(dataArray[i].name[0]);

    const test = document.getElementById("test");
    const name = document.createElement("p");
    const address = document.createElement("p");
    const dish = document.createElement("p");

    name.innerHTML = dataArray[i].name;
    console.log(name);

    test.appendChild(name);
    // if (test === null) {
    // }
  }

  return (
    <DatabaseProvider sdk={database}>
      <div className="wrapper">
        <Header />

        <main>
          <section className='userUse'>
            <Steps />
            <Form />
          </section>

          <div className="test" id="test">

          </div>

          <Book />
        </main>

        <Footer />
      </div>
    </DatabaseProvider>
  );
}

export default App;
