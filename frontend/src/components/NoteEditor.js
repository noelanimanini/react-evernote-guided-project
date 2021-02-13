import React, { Component } from 'react';

class NoteEditor extends Component {
  
  render() {

    return (
      <div >
        <form className="note-editor" onSubmit={(e) => this.props.submitHandler(this.props, e)} >
        <input type="text" name="title" value={this.props.notecontent.title} onChange={this.props.changeNote}/>
        <textarea name="body" value={this.props.notecontent.body} onChange={this.props.changeNote}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={() => this.props.handleCancel()} >Cancel</button>
        </div>
      </form>
      </div>
      
    );
  }
}

export default NoteEditor;
