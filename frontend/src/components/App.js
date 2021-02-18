import React, { Component } from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom'
import NoteContainer from './NoteContainer';
import Login from './Login';

const api = "http://localhost:3000/api/v1"

class App extends Component {

  state = {
    user: {},
    error: false,
  }

  componentDidMount() {
    const token = localStorage.token;
    if (token) {
      this.persistUser(token)
    } 
  }

  persistUser = (token) => {
    fetch(api + '/persist', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => response.json())
    .then(data => {
      if (data.username) {
        const {username, id} = data;
        this.setState({
          user: {
            username,
            id,
          },
        })
      }
    })
  }

  handleLogin = (e, loginInfo) => {
    e.preventDefault()
    fetch(api + '/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo)
    }).then(response => response.json())
    .then(data => this.handleAuthResponse(data))
    .catch(console.log)
   
  }

  handleAuthResponse = (data) => {
  
    if (data.username) {
      const { username, id, token } = data;

      this.setState({
        user: {
          username,
          id,
        },
        error: null,
      })
      localStorage.setItem('token', token)
      this.props.history.push('/notes')
      // console.log(this.props.history.push("/notes"))
      // console.log(this.props) im not sure what to push to the history of props? 
    } else if (data.error) {
      this.setState({
        error: data.error
      })
    }
  }

  

  handleChange = (e) => {
    console.log(e.target.name)
    this.setState({
        [e.target.name]: e.target.value 
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      user: {}
    })
  }

  
  render() {
   
    const { user, error } = this.state
    return (

      <div>

        <Route exact path="/login" render={() => {return <Login handleLogin={this.handleLogin} handleChange={this.handleChange} />}} />

        {!user.id && <Redirect to="/login" />}

        <Route exact path="/notes" render={() => {return <NoteContainer handleLogout={this.handleLogout}/>}} />

      </div>
    

    )
  }
}

export default withRouter(App);


