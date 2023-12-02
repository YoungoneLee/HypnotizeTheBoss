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


const SubmissionPicker = () => {

    //dates const to use for useState
    //const [submit]
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        try {
            //send post stuff here 
            console.log("we sending stuff");
        } catch (err) {
            console.log(err.message);
        }
    }


    return(
        <div>
            <Box> 
            <Stack direction="row" spacing={2} sx = {{mt: 11}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                        label="Controlled picker"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        />
                    <DatePicker
                        label="Controlled picker"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            </Stack>

            <Stack>
                <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel required control={<Switch />} label="Required" />
                </FormGroup>
            </Stack>
            </Box>
        </div>
    );
};

export default SubmissionPicker;