import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  state = {
    notes: [],
    addednote: {}
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
    console.log('work')
    this.setState({
      addednote: notes.note
    })
  }

  render() {
    return (
      <Fragment>
        <Search />
        <div className='container'>
          <Sidebar handleClick={this.handleClick} notes={this.state.notes}/>
          <Content notecontent={this.state.addednote}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
