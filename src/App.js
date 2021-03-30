//------------------------------------------------ directly using my api keys 
// import logo from './logo.svg';
// import './App.css';
import firebase from 'firebase'
import { useEffect } from 'react';
import Home from './Home';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZNr05RMXOOnSWq3IhCj7yglCyiLvJY2Y",
  authDomain: "notesapp-20je0971.firebaseapp.com",
  databaseURL: "https://notesapp-20je0971-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "notesapp-20je0971",
  storageBucket: "notesapp-20je0971.appspot.com",
  messagingSenderId: "660992346828",
  appId: "1:660992346828:web:90e6c07e9f524b7005d069",
  measurementId: "G-7LW76DX0VH"
};

const firebaseApp= firebase.initializeApp(firebaseConfig)
// console.log(firebaseApp)
const provider = new firebase.auth.GoogleAuthProvider();
const auth =firebase.auth()




function App() {

  useEffect( ()=>{ 
    // console.log("Use Effect Start ");
    //  console.log(auth.currentUser); 
    //  console.log("End")
    })
  return (
    <div >

      {/* <Navbar auth={auth} provider={provider}/> */}
      <Home firebase={firebase} auth={auth} provider={provider} ></Home>




      
      
    </div>
  );
}

export default App;
