import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import NoteContainer from './NoteContainer';
import Login from './Login';
import SignUp from './SignUp';

const api = "http://localhost:3000/api/v1"

class App extends Component {

  state = {
    user: {
      username: '',
      id: null
    },
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
    .catch(error => alert(error))
   
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

  handleSignUp = (e, userInfo) => {
    e.preventDefault()
    fetch(api + '/signup', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user: userInfo})
    }).then(response => response.json())
    .then(data => this.handleAuthResponse(data))
    .catch(console.log)
   
  }

  
  render() {
   
    const { user, error } = this.state
    return (

      <div>
        <Switch>

          <Route exact path="/login" render={() => {return <Login handleSignUp={this.handleSignUp} handleLogin={this.handleLogin} handleChange={this.handleChange} />}} />

          <Route path="/signup" render={() => {return <SignUp handleSignUp={this.handleSignUp}/>}} />
        

          {!localStorage.token && <Redirect to="/login" />}

          <Route exact path="/notes" render={() => {return <NoteContainer handleLogout={this.handleLogout} user={user}/>}} />
        </Switch>
        

      </div>
    

    )
  }
}

export default withRouter(App);


