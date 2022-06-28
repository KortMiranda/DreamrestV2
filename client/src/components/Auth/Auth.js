import React, { useState, useEffect } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'

import useStyles from './styles'

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        handleShowPassword(false);
    }

    const googleSuccess = async (credentialResponse) => {
        console.log(credentialResponse)
        var userObject = jwt_decode(credentialResponse?.credential)
        console.log(userObject)

       try {
           dispatch({ type: 'AUTH', data: { userObject} });
           console.log(userObject)

           navigate('/')
       } catch (error) {
           console.log(error)
       }
    }; 
    

    // const handleCallbackResponse = (response) => {
    //     console.log("Encoded JWT ID token: " + response.credential);
    //     var userObject = jwt_decode(response.credential)
    //     console.log(userObject)
    // }

    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //         client_id: "278248019764-d0epbfo26lofk4ppcet5c222hqk8jc4e.apps.googleusercontent.com",
    //         callback: handleCallbackResponse
    //     });

    //     google.accounts.id.renderButton(
    //         document.getElementById("signInDiv"),
    //         { theme: "outline", size: "large"}
    //     );
    // }, [])

    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful. Try Again Later");
    };

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                        <>
                            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half></Input>
                            <Input name="lastName" label="Last Name" handleChange={handleChange} half></Input>
                        </>
                        )
                    }
                    <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                    { isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin 
                    // id="signInDiv"
                    // clientId="278248019764-d0epbfo26lofk4ppcet5c222hqk8jc4e.apps.googleusercontent.com"
                    // render={(renderProps) => (
                    //     <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    //       Google Sign In  
                    //     </Button>
                    // )}
                    onSuccess={googleSuccess}
                    // onSuccess={credentialResponse => {
                    //     console.log(credentialResponse)
                    // }}
                    onFailure={googleFailure}
                    // cookiePolicy="single_host_origin"
                />
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth
