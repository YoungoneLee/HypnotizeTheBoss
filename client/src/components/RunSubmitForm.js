// App.jsx

import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './RunSubmitForm.css'; // Import the CSS file

const UserForm = () => {
    const [vodLink, setVodLink] = useState('');
    const [runTime, setRuntime] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [gameName, setGameName] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const body = { vod: vodLink, runtime: runTime, categoryID: categoryId, gameName: gameName };
        const response = await fetch("http://localhost:3000/insertRunData", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        // window.location = "/"; 
        console.log(response)
    } catch (err) {
        console.error(err.message); 
    }
  };

  return (
    <Fragment>
    <div className="container">
      <Paper elevation={3} className="form-container">
        <form onSubmit={handleSubmit}>

        <TextField
            label="VOD link"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={vodLink}
            onChange={(e) => setVodLink(e.target.value)}
          />

        <TextField
            label="Runtime"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={runTime}
            onChange={(e) => setRuntime(e.target.value)}
          />

        <TextField
            label="Category ID"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
        />

        <TextField
            label="Game Name"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
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
