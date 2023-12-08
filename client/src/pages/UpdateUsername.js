import WaddleDeeHeader from '../components/WaddleDeeBar';
import PageTextField from '../components/PageTextField';
import React, { Fragment, useState,useContext } from 'react';
import TextField from '@mui/material/TextField';
import RunContext from '../components/RunContext';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export default function UpdateUsernamePage(){
    const [userName, setUsername] = useState('');
    const {rowData } = useContext(RunContext);


    
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
        const lk = userName;
        const body = { newUsername: lk};
        //const asd = rowData.username
        //const 
        console.log(userName);
        const response = await fetch(`http://localhost:3000/updateRunner/${rowData.username}`, {
            method: "PUT", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
          // Reset form fields upon successful submission
          setUsername('');
        }

        // window.location = "/"; 
        console.log(response)
    } catch (err) {
        console.error(err.message);
        setUsername('Error');
    }
  };
    return(

        <>
            <WaddleDeeHeader/>
            <div className="container">
             <Paper elevation={3} className="form-container" sx={{mt: 10}}>
              <form onSubmit={handleSubmit}>
            <PageTextField 
                title={"Update Run Username"} 
                body={"This page is to update the username of the current run you selected"}/>
                <h1>
                    old username is {rowData.username}
                </h1>
                 <TextField
                label="New Username"
                 fullWidth
                 variant="outlined"
                  margin="normal"
                 className="form-field"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                />
                 <Button type="submit" variant="contained" color="primary" fullWidth className="submit-button">
                    Submit
                </Button>
                </form>
                 </Paper>
             </div>
        </>
    )
}