import firebasauth from 'firebase/auth'
// import secret from './secret.json'
// const firebaseConfig= secret
console.log(process.env.APPID)




const Auth = ({auth , provider}) => {



    return ( 
        <button onClick={ ()=>{ auth.signInWithPopup(provider)}}>Sign In </button>
        
     );
}
 
export default Auth;