import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';



const GameSearchBar = ({setGamename}) => {
  const handleInputChange = (e) => {
    setGamename(e.target.value);
  }

    return (
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '15ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField 
            id="outlined-basic" 
            label="Game Name" 
            variant="outlined"
            onChange={handleInputChange} 
            />
        </Box>
      );
};

export default GameSearchBar;