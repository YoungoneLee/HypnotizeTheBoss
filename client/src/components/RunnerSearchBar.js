import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const RunnerSearchBar = ({setUsername}) => {
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField 
          id="outlined-basic" 
          label="Runner Name" 
          variant="outlined" 
          onChange={handleInputChange} 
          />
      </Box>
      </Fragment>
    );
  };

  export default RunnerSearchBar;