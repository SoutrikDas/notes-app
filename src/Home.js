import { useEffect, useState } from "react";
import NotesForm from "./components/NotesForm";
import NoteGrid from './components/NoteGrid'
import NoteWidget from "./components/NoteWidget";




const Home = ({firebase,auth,provider}) => {
    const [pending, setPending ]=useState(true)
    var db=firebase.firestore()
    var notesRef=db.collection("notes")
    const [tmp,setTmp] = useState(true) //if I ever want to re-fetch all notes , i would just change the value of tmp, which will trigger useEffect , which will fetch (if there is a user )
    const switchTemp = ()=>{ setTmp(!tmp)}
    const [isLogged,setIsLogged] =useState('false') //my plan initially is to just change this to triger useEffect , it doesnt matter if the value false corresponds to no user 
    // var mydata={}
    const [notesArray,setNotesArray]=useState(null)
    function customSignOut()
    {
        auth.signOut()
        console.log("User Signed Out")
        setIsLogged(!isLogged) //triggering the useEffect
    }
    function updateNotesArray(querySnapshot)
    {   
        var arr=[]

        console.log("# updateNotesArray ran ")
        querySnapshot.forEach((doc)=>{
            arr.push(doc)
            console.log("inside consolelog",doc.data()) //this also works 
            console.log("inside docid",doc.id) //this works
            // console.log("inside Home.js updateNotesArray  ",doc.data())
            // doc.data().id=doc.id()
            // console.log("inside new object", doc.data())
        })
        setNotesArray(arr)
        console.log("# after updateNotesArray ",notesArray,arr)
    }
    async function fetchNotes(notesRef,user,notesArray,setNotesArray){

        //theres a lot of problems that are happening due to this query stuff , I need to play around with this to see whatsup with this
        

        // console.log("--fetchNotes ran--")

        var query =await  notesRef.where("uid","==",user.uid).orderBy('createdAt',"desc")
        .onSnapshot(updateNotesArray);

    
    }
    useEffect(async ()=>{
        console.log("useEffect Home Ran")
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
            // console.log("auth state changed")
            // console.log(user)
        })
        // if(auth.currentUser){
        //     fetchNotes(notesRef,auth.currentUser,notesArray,setNotesArray)

        // }





    },[isLogged])


    if (pending)
    {
        return <h1>Loading....</h1>
    }
    console.log(db)
//TODO: Delete the foll
    // var a = await notesRef.where("id","==","7nr1060XddqSgr9i7fzG")
    // var a = notesRef.doc("7nr1060XddqSgr9i7fzG")
    // console.log("## a:",a)
    // a.delete().then( ()=>{console.log("Deletion done")})
    // notesRef.where("id").delete().then(() => {
    //     console.log("Document successfully deleted!");
    // }).catch((error) => {
    //     console.error("Error removing document: ", error);
    // });
    return (
        <>
            <h1>Hello {auth.currentUser.displayName}</h1>
            <button className="btn btn-danger" onClick={ customSignOut}>Log Out</button>
            <NotesForm db={db} user={auth.currentUser} firestore={firebase.firestore} switchTemp={switchTemp}/>
  
            {notesArray && <NoteGrid notesArray={notesArray} notesRef={notesRef}></NoteGrid>}
            {/* <NoteWidget title={notesArray[0].title} content={notesArray[0].content} /> */}

        </>
    )


    
}
 
export default Home;