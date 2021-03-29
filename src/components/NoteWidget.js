// To store one single Note widget ( which will show a bit of title and 
//and content , there will be a delete button and there will be an edit button 
const NoteWidget = ({doc,notesRef,startEditing}) => {

    console.log("inside NoteWidget",doc.data())
    function customDelete(){
        // doc.delete().then( ()=>{console.log("Doc Removed ")}) //This does not work 
        console.log(doc.id) //it works
        var a = notesRef.doc(doc.id)
        a.delete().then( ()=>{console.log("Deletion done")})
    }
    return ( 
        <div className="notewidget col">
            <h3 className="notetitle">{doc.data().title}</h3>
            <p className="notecontent">{doc.data().content}</p>
            <div className="row">
                <div className="edit">
                    <button className="btn btn-secondary" onClick={()=>{startEditing(doc.id,doc.data())}}>Edit</button>
                </div>
                <div className="delete">
                    <button className="btn btn-danger" onClick={ customDelete}>Delete</button>
                </div>
            </div>
        </div>
     );
}
 
export default NoteWidget;