import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import './RunSubmitForm.css'; // Import the CSS file
// import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

const UserForm = () => {
    const [vodLink, setVodLink] = useState('');
    const [runTime, setRuntime] = useState('');
    const [type, setCategoryType] = useState('');
    const [gameName, setGameName] = useState('');


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const body = { vod: vodLink, runtime: runTime, type: type, gameName: gameName };
        const response = await fetch("http://localhost:3000/insertRunData", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
          // Reset form fields upon successful submission
          setVodLink('');
          setRuntime('');
          setCategoryType('');
          setGameName('');
        }

        // window.location = "/"; 
        console.log(response)
    } catch (err) {
        console.error(err.message);
        setVodLink('Error');
        setRuntime('Error');
        setCategoryType('Error');
        setGameName('Error');
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
            label="Run time"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={runTime}
            onChange={(e) => setRuntime(e.target.value)}
          />

        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            fullWidth
            margin="normal"
            sx={{ width: '100%' }}
            label="Run time"
            views={['hours', 'minutes', 'seconds']}
            format="hh:mm:ss"
            ampm={false}
            className="form-field"
            value={runTime || '00:00:00'}
            onChange={(e) => setRuntime(e.target.value)}
          />
        </LocalizationProvider> */}

        <TextField
            label="Category type"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={type}
            onChange={(e) => setCategoryType(e.target.value)}
        />

        <TextField
            label="Game name"
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
