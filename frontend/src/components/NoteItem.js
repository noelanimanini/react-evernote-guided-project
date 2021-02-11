import React from 'react';

const NoteItem = (props) => (
  <li onClick={() => props.handleClick(props)}>
    <h2>{props.note.title}</h2>
    <p>{truncate(props.note.body)}</p>
  </li>
);

const truncate = (str) => {
  return str.length > 10 ? str.substring(0, 15) + "..." : str
}

export default NoteItem;
