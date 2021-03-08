import React, { Component } from 'react'
import Header from './header'

export class NotesForm extends Component {
    render() {
        return (
            <section className="noteform">
                <h3> Create a New Note</h3> 
                <div className="form-group">
                    <label htmlFor="noteform-title">Title</label>
                    <input type="text" id="noteform-title" />
                </div>

                <div className="form-group">
                    <label htmlForm="noteform-note">Note</label>
                    <textarea name ="noteform-note" id="noteform-note"></textarea>
                </div>
                <button> Create Note</button>

            </section>
        )
    }
}

export default NotesForm
