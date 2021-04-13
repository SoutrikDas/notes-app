// To store one single Note widget ( which will show a bit of title and 
//and content , there will be a delete button and there will be an edit button 
const NoteWidget = ({doc,notesRef,startEditing}) => {


    function customDelete(){
        // doc.delete().then( ()=>{console.log("Doc Removed ")}) //This does not work 
        // console.log(doc.id) //it works
        var a = notesRef.doc(doc.id)
        a.delete().then( ()=>{console.log("Deletion done")})
    }

    // this change was made on 2021-04-14 
    /*
    The problem was that everytime someone created a new note , this notewidget immediately wanted to display it 
    without checking if it has even fetched the data fully , ie it was working synchronously 
    I did not use promise, but a simple check if a property was null or not did the trick  
    */
    if (doc.data().createdAt === null )
    {
        return ( 
            <div className="notewidget col">
                <h3 className="notetitle">Loading</h3>
                <p className="notecontent">Loading</p>
                <p className="timedesc">Just Now</p>
            </div>
         )
    }

    else 
    {
        
        return ( 
            <div className="notewidget col">
                <h3 className="notetitle">{doc.data().title}</h3>
                <p className="notecontent">{doc.data().content}</p>
                <p className="timedesc">{doc.data().createdAt.toDate().toString()}</p>
                
                <div className="row align-items-end">
                    <div className="edit">
                        <button className="btn btn-secondary align-bottom" onClick={()=>{startEditing(doc.id,doc.data())}}>Edit</button>
                    </div>
                    <div className="delete">
                        <button className="btn btn-danger align-bottom" onClick={ customDelete}>Delete</button>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default NoteWidget;