import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';


const App = () => (
    <GoogleOAuthProvider clientId='278248019764-d0epbfo26lofk4ppcet5c222hqk8jc4e.apps.googleusercontent.com'>
    <BrowserRouter>
        <Container maxwidth="lg"> 
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
    
)

export default App;
