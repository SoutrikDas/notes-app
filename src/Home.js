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

        setIsLogged(!isLogged) //triggering the useEffect
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
    useEffect(async ()=>{

        async function fetchUser(){
            const user=await auth.signInWithPopup(provider)

            setPending(false)
            return user
            
        }
        auth.onAuthStateChanged((user)=>{
            if(user){

                setPending(false)
                fetchNotes(notesRef, user, notesArray, setNotesArray)


            }
            else {
                fetchUser()
                
            }

        })






    },[isLogged])


    if (pending)
    {
        return <h1>Loading...</h1>
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