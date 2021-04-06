import { useEffect, useState } from 'react'




const NotesForm =({db,user,firestore,isEditing,editId,stopEditing,editData})=>{
    const [title,setTitle] =useState('')
    const [content, setContent] = useState('')
    var notes = db.collection("notes")
    //when isUpdateTitle is true, only then will the code fetch the previous contents and title and push it into the fields
    const [isUpdateTitle,setIsUpdateTitle]=useState(true) 
    

    const ontitleChange= (event)=> {setTitle(event.target.value)}
    const oncontentChange= (event)=> {setContent(event.target.value)}
    /**
     * It sets content of the doc to the new content entered by the user
     * 
     * @param  event triggered when edit form is submitted
     * testing {@link}
     */
    async function onUpdate (event){
        event.preventDefault()
        const tempdoc = notes.doc(editId) 
        tempdoc.set({
            title: title,
            content: content,
        },{merge:true}) //merge:true prevents from overwriting previous docs and merges new and old
  
        //after editing we need to change isEdit 
        stopEditing()
        //after editing change the fields to empy 
        setTitle("")
        setContent("")

        setIsUpdateTitle(true)

    }
    useEffect(()=>{console.log("###------------rerendered")})
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
        //after submission empty the fields
        setTitle("")
        setContent("")
    
        
    }

    if(isEditing)
    {  

        // ---Below code is for editing
 
        
        if((editId))
        {   


            const a=notes.doc(editId) //get the document which we are to edit using the id 
            const b=notes.doc(editId).get()
            b.then(
                (value)=>{

                    if(isUpdateTitle)
                    {   
                        

                        setTitle(value.data().title)
                        setContent(value.data().content)
                        setIsUpdateTitle(false)

                    }
                    

                }
            )



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
