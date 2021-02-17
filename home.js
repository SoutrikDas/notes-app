const auth = firebase.auth()
console.log(auth)
// const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

// const signInBtn = document.getElementById('sign-in-btn');
const signOutBtn = document.getElementById('sign-out-btn');

const notesList = document.getElementById('noteslist')
const displayusername = document.getElementById('display-username');
const displayuserid = document.getElementById('display-userid');
const userDetails =document.getElementById('user-details')
// //  To be able to use authorization you need a provider

// const provider = new firebase.auth.GoogleAuthProvider();

// /// Sign in event handlers
// So here we are not using addEventListener but just using btn.onclick = func

// signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

// * The following code checks previous notes when user auth state changes 
// auth.onAuthStateChanged(user => {
//     if (user) {
//         // signed in
//         whenSignedIn.hidden = false;
//         whenSignedOut.hidden = true;
//         userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
//         //the following two lines dont produce desired output
//         // displayusername.value=user.displayName
//         // displayuserid.value=user.uid

//         //query without listener
//         // var query = notesRef.where("uid","==",user.uid).get().then(function(querySnapshot){
//         //     querySnapshot.forEach(function(doc){

//         //         console.log(doc.id,"=>",doc.notetitle,"=>",doc.user)
//         //         console.log("Document data:",doc.data().notetitle)
//         //         mydata=doc.data()
//         //         console.log(" Type of mydata.notetitle : ",typeof mydata.notetitle)
//         //         console.log(" Type of mydata.notecontent : ",typeof mydata.notecontent)
//         //         console.log(" Type of mydata.user : ",typeof mydata.user)

//         //         displayNote( mydata.notetitle, mydata.notecontent, mydata.user )
//         //     })
//         // })


//         //query with listener
//         var query = notesRef.where("uid","==",user.uid).orderBy('createdAt',"desc")
//             .onSnapshot( function(querySnapshot){
//                 notesList.innerHTML=""
//                 querySnapshot.forEach( function(doc){
//                     mydata=doc.data()
//                     displayNote( mydata.notetitle, mydata.notecontent, mydata.user )

//                 })
//             });

//     } else {
//         // not signed in
//         whenSignedIn.hidden = true;
//         whenSignedOut.hidden = false;
//         // userDetails.innerHTML = '';
//     }
// });

// ///// Firestore /////

const db = firebase.firestore(); //this is important

var notesRef = db.collection('notes') //made a notes collection 

// const createThing = document.getElementById('createThing');
// const thingsList = document.getElementById('thingsList');


// let thingsRef;  //ref to a database loc which we will use to subscribe to a stream of changes
// let unsubscribe;  //so we will use this to unsubscribe just in case

const addnotebtn=document.getElementById("add-note-btn")
addnotebtn.addEventListener('click', addNewNote, false)

function addNewNote()
{   var user =auth.currentUser
    if ( user)
    {
        const noteTitle = document.getElementById("note-title")
        const noteContent = document.getElementById("note-content");
        var note = {
            user: user.displayName,
            notetitle : noteTitle.value,
            notecontent : noteContent.value,
            createdAt : firebase.firestore.FieldValue.serverTimestamp(),
            uid : user.uid,
        }
        db.collection("notes").add( note ).then((result) => {
            console.log("Result.id from db.collection(notes).add is"+result.id)
        }).catch((err) => {
            console.log(err)
            
        });
        
        

    }
    else 
    {
        console.log("trying to add note while not being signed in")
    }
}


function displayNote( title , content , username )
{
    // notesList.innerHTML = `<h3>${title}</h3> <p>${content}</p><p>${username}</p>`; //causes a notelist is null exception
    const div = document.createElement("div")
    div.classList.add("note-item") //add the class "note-item" to every note made with this function
    div.innerHTML= `
        <h3>${title}</h3>
        <p>${content}</p>
        <button type="button" class="btn btn-danger"> Delete </button>
    `;
    notesList.appendChild(div)
}