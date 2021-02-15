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

    var newArr = []
    for (let i = 0; i < this.state.notes.length; i++){
      let note = this.state.notes[i].title 
      console.log(note)
       let searchNote = this.state.notes[i]
      if (note.includes(e.target.value)) {
          newArr.push(searchNote)
          // console.log(this.state)

      } 
    }
        this.setState({
          foundNotes: newArr
    })
    console.log(this.state)
  }

  // foundNotesFunction = (note) => {
  //   console.log('this works too well')
  //   console.log(note)
  // }

    // for (let i = 0; i < props.length; i++) {
    //   let note = props[i].title
    //   let noteTitle = note.search(/([a-zA-Z])\w+/g)
    //   console.log(note)
    //   console.log(noteTitle)
  

     // const search = e.target.value
    // // console.log(props)
    // // console.log(searchTerm)

    // 

    // for(let i = 0; i < props.length; i++) {
    //   const noteTitle = props[i].title
    //   const foundNote = noteTitle.find( title => title === searchTerm)
    //   console.log(foundNote)

    // e.persist()
    // const foundNote = e.target.value
    // this.setState( )
      
    // //   prevState => {
    // //   return {notes: prevState.notes.filter( note => note.title === foundNote ? note.title : foundNote)}
    // // })
    // console.log(foundNote)
    // console.log(this.state.notes.title)
  


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
          // foundNotes={this.state.foundNotes} 
          // foundNotesFunction={this.foundNotesFunction}
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
