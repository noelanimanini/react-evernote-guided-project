import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <NoteList handleClick={this.props.handleClick} notes={this.props.notes} handleCancel={this.props.handleCancel} />
        <button onClick={(e) => this.props.handleNew(e)} >New</button>
      </div>
    );
  }
}

export default Sidebar;
