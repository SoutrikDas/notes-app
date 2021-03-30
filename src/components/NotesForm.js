import { useState } from 'react'




const NotesForm =({db,user,firestore,isEditing,editId,stopEditing,editData})=>{
    const [title,setTitle] =useState('')
    const [content, setContent] = useState('')
    var notes = db.collection("notes")
    

    const ontitleChange= (event)=> {setTitle(event.target.value)}
    const oncontentChange= (event)=> {setContent(event.target.value)}
    const onUpdate = async (event)=>{
        event.preventDefault()
        const tempdoc = notes.doc(editId) 
        tempdoc.set({
            title: title,
            content: content,
        },{merge:true}) //merge:true prevents from overwriting previous docs and merges new and old
  
        //after editing we need to change isEdit 
        stopEditing()

 
    }
    const onSubmit = async (event)=>{
        event.preventDefault() //prevents the default POST submission ,which would refresh the page 
        notes.add(
            {
                title: title,
                content: content,
                uid: user.uid,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }
        )
    
        
    }

    if(isEditing)
    {  

        // ---Below code is for editing
 
   
        if(editId)
        {
            const a=notes.doc(editId) //get the document which we are to edit using the id 


        }


        return (
            <>
            <div className="container">
                <form onSubmit={onUpdate}>
                    <div className="row">
                        <label>Update the Title</label>
                    </div>
                    <div className="row">
                        <input value={title} onChange={ontitleChange}  />
                    </div>
                    <div className="row">
                        <label >Update the Content</label>
                    </div>
                    <div className="row">
                        <textarea value={content} onChange={oncontentChange} />
                    </div>
                    <div className="row">
                        <button  className="btn btn-success mr-2" type="submit" >Update</button>
                    </div>
                </form> 
            </div>
            

            </>
        )
    }
    else{

        // ---- below code is for adding
        return (
            <>
            <div className="container">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <label>Title</label>
                    </div>
                    <div className="row">
                        <input value={title} onChange={ontitleChange} placeholder=" Enter Title" />
                    </div>
                    <div className="row">
                        <label >Content</label>
                    </div>
                    <div className="row">
                        <textarea value={content} onChange={oncontentChange} placeholder=" Enter Content" />
                    </div>
                    <div className="row">
                        <button  className="btn btn-primary mr-2" type="submit" >Add Note</button>
                    </div>
                </form> 
            </div>
            
            
            </>
        )
    }
}

export default NotesForm
