
console.log(window.location)
console.log("Hello world ")

const auth = firebase.auth()
console.log(auth)

// //  Grab the html elements which we want to interact with 


const whenSignedIn = document.getElementById('whenSignedIn');
whenSignedIn.hidden=true;
const whenSignedOut = document.getElementById('whenSignedOut');
const signInBtn = document.getElementById('sign-in-btn');

const provider = new firebase.auth.GoogleAuthProvider();

// /// Sign in event handlers
// So here we are not using addEventListener but just using btn.onclick = func

signInBtn.onclick = () => auth.signInWithPopup(provider);
auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        // userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
        //the following two lines dont produce desired output
        // displayusername.value=user.displayName
        // displayuserid.value=user.uid

        //query without listener
        // var query = notesRef.where("uid","==",user.uid).get().then(function(querySnapshot){
        //     querySnapshot.forEach(function(doc){

        //         console.log(doc.id,"=>",doc.notetitle,"=>",doc.user)
        //         console.log("Document data:",doc.data().notetitle)
        //         mydata=doc.data()
        //         console.log(" Type of mydata.notetitle : ",typeof mydata.notetitle)
        //         console.log(" Type of mydata.notecontent : ",typeof mydata.notecontent)
        //         console.log(" Type of mydata.user : ",typeof mydata.user)

        //         displayNote( mydata.notetitle, mydata.notecontent, mydata.user )
        //     })
        // })


        // //query with listener
        // var query = notesRef.where("uid","==",user.uid).orderBy('createdAt',"desc")
        //     .onSnapshot( function(querySnapshot){
        //         notesList.innerHTML=""
        //         querySnapshot.forEach( function(doc){
        //             mydata=doc.data()
        //             displayNote( mydata.notetitle, mydata.notecontent, mydata.user )

        //         })
        //     });

    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        // userDetails.innerHTML = '';
    }
});