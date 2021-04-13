//------------------------------------------------ directly using my api keys 
// import logo from './logo.svg';
// import './App.css';
import firebase from 'firebase'
import { useEffect } from 'react';
import Home from './Home';



// I changed the keys to be inside a .env rather than inside the code , this change was made on 2021-04-14
//reading the keys from .env file 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId:process.env.REACT_APP_MEASUREMENTID,

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
