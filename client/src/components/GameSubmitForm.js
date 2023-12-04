import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Checkbox, FormControlLabel } from '@mui/material';

const UserForm = () => {
    const [gameName, setGameName] = useState('');
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const body = { gameName: gameName, genre: genre, releaseYear: releaseYear };
        const response = await fetch("http://localhost:3000/insertGameData", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
          // Reset form fields upon successful submission
          setGameName('');
          setGenre('');
          setReleaseYear('');
        }

        // window.location = "/"; 
        console.log(response)
    } catch (err) {
        console.error(err.message);
        setGameName('Error');
        setGenre('Error');
        setReleaseYear('Error');
    }
  };

  return (
    <Fragment>
    <div className="container">
      <Paper elevation={3} className="form-container">
        <form onSubmit={handleSubmit}>

        <TextField
            label="Game name"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
        />

        <TextField
            label="Game genre"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
        />

        <TextField
            label="Release year"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
        />


        <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
            Submit
        </Button>

        </form>
      </Paper>
    </div>
    </Fragment>
  );
};

export default UserForm;
