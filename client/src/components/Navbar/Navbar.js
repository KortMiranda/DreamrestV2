import React, {useState, useEffect } from 'react'
import { AppBar, Avatar, Typography, Toolbar, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memories from '../../images/memories.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const classes = useStyles();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        navigate('/');

        setUser(null)
    }
    
    useEffect(() => {
        const token = user?.userObject;
        console.log(token)

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
            <img className={classes.image} src={memories} alt="memories" height="60" />
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.userObject.name} src={user.userObject.picture}>{user.userObject.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">{user.userObject.name}</Typography>
                    <Button variant="containted" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign in</Button>
            )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar
