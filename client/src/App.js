import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
    <GoogleOAuthProvider clientId='278248019764-d0epbfo26lofk4ppcet5c222hqk8jc4e.apps.googleusercontent.com'>
    <BrowserRouter>
        <Container maxwidth="xl"> 
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to="/posts" />} />
                <Route path="/" element={<Home />}/>
                <Route path="/posts" element={<Home />}/>
                <Route path="/posts/search" element={<Home />}/>
                <Route path="/posts/:id" element={<PostDetails />}/>
                <Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" />} />
            </Routes>
        </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
    )
}


export default App;
