import { useState } from 'react'
import Header from './header'
import {Button} from 'react-bootstrap'



const NotesForm =({db,user,firestore,isEditing,editId,stopEditing,editData})=>{
    const [title,setTitle] =useState('')
    const [content, setContent] = useState('')
    var notes = db.collection("notes")
    const [limit,setLimit]=useState(0) //for some reason the setTitle and setContent in the if triggers an infinite refresh , which i hope to stop, using this variable 

    const ontitleChange= (event)=> {setTitle(event.target.value)}
    const oncontentChange= (event)=> {setContent(event.target.value)}
    const onUpdate = async (event)=>{
        event.preventDefault()
        const tempdoc = notes.doc(editId) 
        tempdoc.set({
            title: title,
            content: content,
        },{merge:true}) //merge:true prevents from overwriting previous docs and merges new and old
        console.log("---onUpdate in NotesForm has started ")
        //todo : add the code that will edit stuff here
        console.log("do the edit here")
        //after editing we need to change isEdit 
        stopEditing()
        console.log("### ---onUpdate in NotesForm has stopped ")
        setLimit(0)
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
    console.log("#ab2 isEditing in NotesForm outside if",isEditing)
    if(isEditing)
    {   console.log("#ab2 inside NotesForm inside if(isEditing) before limit+1")

        // ---Below code is for editing
        // return(<h1>#ab2 Hello there</h1>)
        console.log("#abs first line inside if(isEditing)")
        if(editId)
        {
            const a=notes.doc(editId) //get the document which we are to edit using the id 
            console.log("#ab2 inside isEditing a",a)

        }

        // setContent("Comon do it ")
        // setTitle("Update this")
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
            
            {/* <div className="container" >
                <div className="row">
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">First</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra ">Sec</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Third</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Fourth</div>
    
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Undeniably fifth</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Deniably sixth</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Who are you</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Why dont you do what you want</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Goodnight</div>
                </div>
            </div> */}
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
                        <button  className="btn btn-primary mr-2" type="submit" >Submit</button>
                    </div>
                </form> 
            </div>
            
            {/* <div className="container" >
                <div className="row">
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">First</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra ">Sec</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Third</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Fourth</div>
    
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Undeniably fifth</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Deniably sixth</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Who are you</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Why dont you do what you want</div>
                    <div className="col-xs-2 sm-3 md-4 lg-5 xl-6 abra">Goodnight</div>
                </div>
            </div> */}
            </>
        )
    }
}

export default NotesForm
