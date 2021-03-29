import { useState } from 'react'
import Header from './header'
import {Button} from 'react-bootstrap'



const NotesForm =({db,user,firestore,switchTemp})=>{
    const [title,setTitle] =useState('')
    const [content, setContent] = useState('')
    var notes = db.collection("notes")
    
    const ontitleChange= (event)=> {setTitle(event.target.value)}
    const oncontentChange= (event)=> {setContent(event.target.value)}

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
        switchTemp()
        
    }
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

export default NotesForm
