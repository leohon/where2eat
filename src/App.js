import './App.css';
import { doc, getFirestore } from 'firebase/firestore';
import { FirestoreProvider, useFirestoreDocData, useFirestore, useFirebaseApp } from 'reactfire';
import Header from './components/Header';
import Steps from './components/Steps';
import Form from './components/Form';
import Book from './components/Book';
import Footer from './components/Footer';

function BurritoTaste() {
  // easily access the Firestore library
  const burritoRef = doc(useFirestore(), 'tryreactfire', 'burrito');

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreDocData(burritoRef);

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching burrito flavor...</p>;
  }

  return <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>;
}

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
      <div className="wrapper">
        <Header />

        <main>
          <section className='userUse'>
            <Steps />
            <Form />
          </section>

          <Book />
        </main>

        {/* Test Code */}
        <div>🌯</div>
        <BurritoTaste />

        <Footer />
      </div>
    </FirestoreProvider>
  );
}

export default App;
