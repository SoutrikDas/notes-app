import React, {Component} from 'react';
import firebase from 'firebase';
import Header from './components/header'
import NotesForm from './components/NotesForm'
import Auth from './auth';



const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain : process.env.REACT_APP_AUTHDOMAIN,
  projectID : process.env.REACT_APP_PROJECTID,
  storageBucket : process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId : process.env.REACT_APP_MESSAGINGSENDERID,
  appId : process.env.REACT_APP_APPID,
  measurementID : process.env.REACT_APP_MEASUREMENTID,
}
console.log(firebaseConfig)

const firebaseApp=firebase.initializeApp(firebaseConfig)
console.log(firebaseApp)
const provider = new firebase.auth.GoogleAuthProvider();
const auth =firebase.auth()

function App() {
  return (
    <div className="App">
      
      <Auth auth={auth} provider={provider}/>
    </div>
  );
}

export default App;
