import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  state = {
    notes: [],
    addednote: {},
    clicked: false,
    foundNotes: []
  }

  componentDidMount () {
    fetch('http://localhost:3000/api/v1/notes')
    .then(response => response.json())
    .then(notes => this.setState({
          notes: notes,
          foundNotes: notes
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
    console.log(e.target.name)
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
          return {foundNotes: prevState.foundNotes.map( oldNote => oldNote.id === freshNote.id ? freshNote : oldNote)}
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
    e.persist()
    fetch('http://localhost:3000/api/v1/notes', {
      method: "POST", 
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        title: "Default",
        body: "Default",
        user_id: 1
      })
    }).then(response => response.json())
    .then( (newNote) => this.setState((prevState) => {
      console.log([...prevState.foundNotes])
      return {foundNotes: [...prevState.foundNotes, newNote]}
    }))

  }

  handleSearch = (e) => {
    e.persist()
    var newArr = []
    for (let i = 0; i < this.state.notes.length; i++){
      let note = this.state.notes[i].title 
      let noteBody = this.state.notes[i].body
     
      let searchNote = this.state.notes[i]

      if (note.includes(e.target.value)) {

          newArr.push(searchNote)
          
      } else if (noteBody.includes(e.target.value)) {
        console.log(e.target.value)
        newArr.push(searchNote)
      }

    }
        this.setState({
          foundNotes: newArr
    })

  }

  handleDelete = (props) => {
    console.log(props)
    fetch(`http://localhost:3000/api/v1/notes/${props.notecontent.id}`, {
      method: 'DELETE'
    }).then(() => this.setState(prevState => {
      let minusNotes = [...prevState.foundNotes].filter(note => note.id !== props.notecontent.id)
      return { foundNotes: minusNotes, addednote: {} }
    }))
      
  }

  

  render() {
    return (
      <Fragment>
        <Search  handleSearch={this.handleSearch} notes={this.state.notes} />
        <div className='container'>
          <Sidebar 
            handleClick={this.handleClick} 
            foundNotes={this.state.foundNotes} 
            handleCancel={this.handleCancel}
            handleNew={this.handleNew}
            
          />
          <Content 
            notecontent={this.state.addednote} 
            handleEditButton={this.handleEditButton} 
            clicked={this.state.clicked} 
            changeNote={this.changeNote} 
            submitHandler={this.submitHandler} 
            handleCancel={this.handleCancel}
            handleDelete={this.handleDelete}/>

        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
