import React from 'react'
import { Grid, Paper, Avatar, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class Login extends React.Component {

    state = {
        username: '', 
        password: ''
    }

    handleChange = (e) => {
        console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    render () {
        
        const paperStyle = {padding :20, height: '50vh', width:280, margin: "20px auto"}
        const avatarStyle = {backgroundColor: 'pink'}
        const buttonStyle = {margin: '8px 0'}
        return (
        <form>
            <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon></LockOutlinedIcon></Avatar> 
                    <h2>Sign In</h2>
                   
                </Grid>
                <TextField label="Username" placeholder="Enter Username" onChange={(e) => this.handleChange(e)} name="username" fullWidth required/>

                <TextField label="Password" placeholder="Enter Password" type="password" onChange={(e) => this.handleChange(e)} name="password" fullWidth required/>
                <FormControlLabel control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember Me"
                        />
                        <Button  type="submit" value="submit" background-color="white" fullWidth variant="contained" style={buttonStyle} onClick={(e) => this.props.handleLogin(e, this.state)}>Sign In</Button>
                        {/* <Typography>
                        <Link href="#" >
                            Forgot Password?
                        </Link>
                        </Typography>
                        <Typography> Do you have an account?
                        <Link to="/asdfas" >
                            Sign Up
                        </Link>
                        </Typography> */}
                        {/* for the links above, consult https://material-ui.com/guides/composition/#link when you have time. */}
                        
            </Paper>
        </Grid>
        </form>
        
    )
    }
   
}

export default Login
