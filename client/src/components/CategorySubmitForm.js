import React, { Fragment, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Checkbox, FormControlLabel } from '@mui/material';

const CategorySubmitForm = () => {
    const [type, setCategoryType] = useState('');
    const [extension, setExtension] = useState(false);


  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const body = { type: type, extension: extension };
        const response = await fetch("http://localhost:3000/insertCategoryData", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
          // Reset form fields upon successful submission
          setCategoryType('');
          setExtension(false);
        }

        // window.location = "/"; 
        console.log(response)
    } catch (err) {
        console.error(err.message);
        setCategoryType('Error');
        setExtension(false);
    }
  };

  return (
    <Fragment>
    <div className="container">
      <Paper elevation={3} className="form-container">
        <form onSubmit={handleSubmit}>

        <TextField
            label="Category type"
            fullWidth
            variant="outlined"
            margin="normal"
            className="form-field"
            value={type}
            onChange={(e) => setCategoryType(e.target.value)}
        />

        <FormControlLabel
            control={<Checkbox checked={extension} onChange={(e) => setExtension(e.target.checked)} />}
            label="Extension"
            className="form-field"
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

export default CategorySubmitForm;