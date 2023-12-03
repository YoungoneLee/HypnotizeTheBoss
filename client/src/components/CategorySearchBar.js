import React, {Fragment} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CategorySearchBar = ({setCategory}) => {
  const handleInputChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Fragment>
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
          label="Category Type" 
          variant="outlined" 
          onChange={handleInputChange} 
          />
      </Box>
      </Fragment>
    );
  };

  export default CategorySearchBar;