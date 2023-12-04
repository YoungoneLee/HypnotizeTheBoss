import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header'

const SimilarRunPage = () => {
    const location = useLocation(); 
    const row = location.state ? location.state.row : null; 

    return(
        <>
        <Header title="similar run page"/>
        <h1> Chosen Run </h1>


        <CssBaseline />
            <Container fixed  sx={{ bgcolor: '#cfe8fc', height: '200vh', marginTop: '10px'}}>
            {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} /> */}
                {row && Object.entries(row).map(([key, value], index) => (
                <h1 key={index}>{key}: {value}</h1>
                ))}
        </Container>




        </>
    );
}

export default SimilarRunPage;
