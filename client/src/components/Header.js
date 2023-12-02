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
    const [gamename, setGamename] = useState('');


    return (
        <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
            <Toolbar>
                <img src={Logo} alt="logo" className="logo" />

                <Fragment>
                    <RunnerSearchBar setUsername={setUsername}/>
                    <GameSearchBar setGamename={setGamename}/>
                    <RuntimeDropdown/>
                    <SubmissionPicker/>
                    <SubmitHeaderButton username={username} gamename ={gamename}/>
                </Fragment>

                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}