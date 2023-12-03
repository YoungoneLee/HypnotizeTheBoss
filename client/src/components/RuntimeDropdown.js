import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const RuntimeDropdown = ({setRuntime, runtime}) => {
  const handleInputChange = (e) => {
    setRuntime(e.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Run Times</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Run Times"
          onChange={handleInputChange}
          value={runtime} 
        >
          <MenuItem value="" onChange={handleInputChange}>
            <em>None</em>
          </MenuItem >
            <MenuItem value={'Fastest'} onChange={handleInputChange}> Fastest</MenuItem>
            <MenuItem value={'00:05:00'} onChange={handleInputChange}> Sub 5 Minutes</MenuItem>
            <MenuItem value={'00:30:00'} onChange={handleInputChange}> Sub 30 Minutes</MenuItem>
            <MenuItem value={'01:00:00'} onChange={handleInputChange}> Sub 1 Hour</MenuItem>
            <MenuItem value={'03:00:00'} onChange={handleInputChange}> Sub 3 Hour</MenuItem>
            <MenuItem value={'05:00:00'} onChange={handleInputChange}> Sub 5 Hour</MenuItem>
            <MenuItem value={'10:00:00'} onChange={handleInputChange}> Sub 10 Hour</MenuItem>
            <MenuItem value={'Slowest'} onChange={handleInputChange}> Slowest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default RuntimeDropdown;