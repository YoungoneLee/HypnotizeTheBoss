import React, {Fragment, useState} from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from '../images/waddlesleep.png'; // replace with your logo path
import './Header.css'; // import the CSS file
import RunnerSearchBar from './RunnerSearchBar';
import GameSearchBar from './GameSearchBar';
import RuntimeDropdown from './RuntimeDropdown';
import SubmissionPicker from './SubmissionPickers';
import SubmitHeaderButton from './SubmitButton';


export default function Header() {
    const [username, setUsername] = useState('');


    return (
        <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
            <Toolbar>
                <img src={Logo} alt="logo" className="logo" />

                <Fragment>
                    {/* <InputData/> */}
                    <RunnerSearchBar setUsername={setUsername}/>
                    <GameSearchBar/>
                    <RuntimeDropdown/>
                    <SubmissionPicker/>
                    <SubmitHeaderButton username={username}/>
                </Fragment>

                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}