import React from 'react';
// import { NavLink } from "react-router-dom";


const NavBar = (props) => {
    console.log(props)
  return (
    <div>
       
        <button className="logout-button" onClick={props.handleLogout}>Logout</button>
       
    </div>
  );
}

export default NavBar;