import React, {Fragment} from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Logo from '../images/waddlesleep.png'; // replace with your logo path
import './Header.css'; // import the CSS file
import InputData from './InputData';
import RunnerSearchBar from './RunnerSearchBar';
import GameSearchBar from './GameSearchBar';
import RuntimeDropdown from './RuntimeDropdown';
import SubmissionPicker from './SubmissionPickers';


export default function Header({title}) {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
            <Toolbar>
                <img src={Logo} alt="logo" className="logo" />
                {/* <Typography variant="h6">
                   {title}
                </Typography> */}

                <Fragment>
                    {/* <InputData/> */}
                    <RunnerSearchBar/>
                    <GameSearchBar/>
                    <RuntimeDropdown/>
                    <SubmissionPicker/>
                </Fragment>

                <Box sx={{ flexGrow: 1 }} />

                <Button className="customButton">Submit</Button>
            </Toolbar>
        </AppBar>
    );
}