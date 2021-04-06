import { useEffect, useState } from "react";
import NotesForm from "./components/NotesForm";
import NoteGrid from './components/NoteGrid'






const Home = ({firebase,auth,provider}) => {
    const [pending, setPending ]=useState(true)
    var db=firebase.firestore()
    var notesRef=db.collection("notes")
    const [tmp,setTmp] = useState(true) //if I ever want to re-fetch all notes , i would just change the value of tmp, which will trigger useEffect , which will fetch (if there is a user )
    const switchTemp = ()=>{ setTmp(!tmp)}
    const [isLogged,setIsLogged] =useState('false') //my plan initially is to just change this to triger useEffect , it doesnt matter if the value false corresponds to no user 
    // var mydata={}
    const [notesArray,setNotesArray]=useState(null)
    const [isEditing , setIsEditing]=useState(false)
    const [editId,setEditId]=useState(null) //to store the id of the doc to edit , sent by NoteWidget and utilised by NotesForm
    const [editData,setEditData]=useState(null)
    const startEditing = (someid,data)=>{
        setIsEditing(true);
        setEditId(someid);
        setEditData(data)


    } //to be used by NoteWidget to start editing mode
    const stopEditing = ()=>{setIsEditing(false);setEditId(null);} //to be used by NotesForm to stop editing mode
    function customSignOut()
    {
        auth.signOut()

        // setIsLogged(!isLogged) //triggering the useEffect 
        //instead of triggering the useEffect, i thought about changing the `pending` hook , which will load the `loading screen` 
        setPending(false)
    }
    function updateNotesArray(querySnapshot)
    {   
        var arr=[]


        querySnapshot.forEach((doc)=>{
            arr.push(doc)
            // console.log("inside consolelog",doc.data()) //this also works 
            // console.log("inside docid",doc.id) //this works

        })
        setNotesArray(arr)
        // console.log("# after updateNotesArray ",notesArray,arr)
    }
    async function fetchNotes(notesRef,user,notesArray,setNotesArray){

        //theres a lot of problems that are happening due to this query stuff , I need to play around with this to see whatsup with this
        


        var query =await  notesRef.where("uid","==",user.uid).orderBy('createdAt',"desc")
        .onSnapshot(updateNotesArray);

    
    }
    async function fetchUser(){
        const user=await auth.signInWithRedirect(provider)

        setPending(false)
        return user
        
    }
    useEffect(async ()=>{

        
        auth.onAuthStateChanged((user)=>{
            if(user){

                setPending(false)
                //i dont want to do any auth without user interaction  because that throws an error sometimes
                fetchNotes(notesRef, user, notesArray, setNotesArray)


            }
            else {
                setPending(true)
                // fetchUser()
                
            }

        })






    },[pending])


    if (pending)
    {   
        return (
            <div className="loadingscreen " >
                
                <h1 className="">Hello, welcome to notesapp</h1>
                <h2 className="">By <a className="red" href="https://github.com/SoutrikDas" target="_blank">Soutrik Das</a> as a part of <a className="red" href="https://woc.cyberlabs.club/" target="_blank" >WOC</a></h2>
                <button className="btn-dark btn " onClick={fetchUser}>Sign in</button>
                <h2 className="">If you just signed in please wait for a sec before trying it again</h2>
            </div>
        )
    }

    return (
        <>  
            <div className="container"></div>
            <div className="row align-items-center">
                <h1 className="col ml-2">Hello {auth.currentUser.displayName}</h1>
                <a href="https://www.notion.so/NotesApp-Firebase-Project-Diary-1dfc9e25a986415095e6406dc634966d" target="_blank" className="btn btn-dark">Diary</a>
                <button className="btn btn-danger col-1-auto ml-1" onClick={ customSignOut}>Log Out</button>

            </div>
            
            <NotesForm db={db} user={auth.currentUser} firestore={firebase.firestore} isEditing={isEditing} editId={editId} stopEditing={stopEditing} editData={editData}/>
  
            {notesArray && <NoteGrid notesArray={notesArray} notesRef={notesRef} startEditing={startEditing}></NoteGrid> } 



        </>
    )


    
}


export default Home;

