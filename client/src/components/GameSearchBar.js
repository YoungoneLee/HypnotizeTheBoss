import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const GameSearchBar = () => {
    const [gamename, setGamename] = useState('');

    const handleSubmit = async(e) => {
        //avoid refreshing constantly
        e.preventDefault();

        try {
            //write the post 
            console.log("within the try block");
        } catch (err) {
            console.log(err.message);
        }
    }
    
    
    return (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
          {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        </Box>
      );
};

export default GameSearchBar;