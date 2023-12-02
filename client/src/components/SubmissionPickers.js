import React, {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/system/Stack';
import dayjs from 'dayjs';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from '@mui/material/Typography';


const SubmissionPicker = ({setFromDate, setToDate, setTillPresent, toDate, fromDate, tillPresent}) => {
    const handleFromInputChange = (value) => {
        setFromDate(value);
    };

    const handleToInputChange = (value) => {
        setToDate(value);
    };

    const handleTillPresentChange = (e) => {
        setTillPresent(e.target.checked);
    };
  

    return(
        <div>
            <Box> 
            <Stack direction="row" spacing={2} sx = {{mt: 10.5}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                        label="Range From: "
                        value={fromDate}
                        onChange={handleFromInputChange}
                        />
                    <DatePicker
                        label="Range To: "
                        value={toDate}
                        onChange={handleToInputChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
            </Stack>

            <Stack>
                <FormGroup>
                    <FormControlLabel 
                        control={<Checkbox/>} 
                        label="Till Present" 
                        checked={tillPresent}
                        onChange={handleTillPresentChange}
                        />
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography>Fastest</Typography>
                        <FormControlLabel required control={<Switch />} />
                        <Typography>Slowest</Typography>
                    </Stack>
                </FormGroup>
            </Stack>
            </Box>



            
        </div>
    );
};

export default SubmissionPicker;