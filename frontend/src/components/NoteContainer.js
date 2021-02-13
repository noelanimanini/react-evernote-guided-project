import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  state = {
    notes: [],
    addednote: {},
    clicked: false,
    // changeNote: []
  }

  componentDidMount () {
    fetch('http://localhost:3000/api/v1/notes')
    .then(response => response.json())
    .then(notes => this.setState({
          notes: notes 
      })
    )
  }

  handleClick = (notes) => {
    this.setState({
      addednote: notes
      
    })
  }

  handleEditButton = (note) => {
    console.log(note)
    this.setState({
      clicked: true
    })
  }

  changeNote = (e) => {
    e.persist()
    console.log("This works")
    this.setState(prevState => ({
      addednote: {
        ...prevState.addednote,
        [e.target.name] : e.target.value
      }
    }))
  }

  submitHandler = (note, e) => {
    e.preventDefault()
    fetch(`http://localhost:3000/api/v1/notes/${note.notecontent.id}`, {
      method: "PATCH", 
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        title: note.notecontent.title,
        body: note.notecontent.body,
        user_id: 1
      })
    }).then(response => response.json())
    .then( (freshNote) => {
        this.setState((prevState) => {
          return {notes: prevState.notes.map( oldNote => oldNote.id === freshNote.id ? freshNote : oldNote)}
        })
    } )
  }
   

  handleCancel = () => {
    this.setState({
      clicked: false
    })
  }

  handleNew = (e) => {
    console.log(e)
    e.preventDefault()
    fetch('http://localhost:3000/api/v1/notes', {
      method: "POST", 
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        title: "This Work",
        body: "This Works",
        user_id: 1
      })
    }).then(response => response.json())
    .then( (newNote) => this.setState((prevState) => {
      return {notes: [...prevState.notes, newNote]}
    }))
  }

  handleSearch = (e) => {
    console.log(e.target.value)
  }



  render() {
    return (
      <Fragment>
        <Search  handleSearch={this.handleSearch} />
        <div className='container'>
          <Sidebar 
          handleClick={this.handleClick} 
          notes={this.state.notes} 
          handleCancel={this.handleCancel}
          handleNew={this.handleNew}
          />
          <Content 
          notecontent={this.state.addednote} 
          handleEditButton={this.handleEditButton} 
          clicked={this.state.clicked} 
          changeNote={this.changeNote} 
          submitHandler={this.submitHandler} 
          handleCancel={this.handleCancel}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
