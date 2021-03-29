import NoteWidget from "./NoteWidget";

const NoteGrid = ({notesArray,notesRef,startEditing}) => {
    console.log("from NoteGrid",notesArray)
    return ( 
        <div className="notegrid">
            <div className="container">
                <div className="row">

                    {notesArray.map( (doc)=>(<NoteWidget doc={doc} notesRef={notesRef} startEditing={startEditing}/>    
                        )
                        )
                    }
                </div>
            </div>

        </div>
        
     );
}
 
export default NoteGrid;