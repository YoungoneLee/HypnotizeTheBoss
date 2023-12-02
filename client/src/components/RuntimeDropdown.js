import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const RuntimeDropdown = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Run Times</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={age}
          label="Run Times"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value={10}>Sub 5 Minutes</MenuItem>
            <MenuItem value={20}>Sub 30 Minutes</MenuItem>
            <MenuItem value={30}>Sub 1 Hour</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default RuntimeDropdown;