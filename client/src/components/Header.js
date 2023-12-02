import React, {Fragment, useState} from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from '../images/waddlesleep.png'; // replace with your logo path
import './Header.css'; // import the CSS file
import RunnerSearchBar from './RunnerSearchBar';
import GameSearchBar from './GameSearchBar';
import RuntimeDropdown from './RuntimeDropdown';
import SubmissionPicker from './SubmissionPickers';
import SubmitHeaderButton from './SubmitButton';
import dayjs from 'dayjs';

export default function Header() {
    const [username, setUsername] = useState('');
    const [gamename, setGamename] = useState('');
    const [runtime, setRuntime] = useState('');
    const [fromDate, setFromDate] = useState(dayjs('')); 
    const [toDate, setToDate] = useState(dayjs(''));
    const [tillPresent, setTillPresent] = useState(false);
    const [checked, setChecked] = useState(false);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
            <Toolbar>
                <img src={Logo} alt="logo" className="logo" />

                <Fragment>
                    <RunnerSearchBar setUsername={setUsername}/>
                    <GameSearchBar setGamename={setGamename}/>
                    <RuntimeDropdown setRuntime={setRuntime} runtime={runtime}/>
                    <SubmissionPicker setFromDate={setFromDate} setToDate={setToDate} setTillPresent={setTillPresent} setChecked={setChecked} fromDate={fromDate} toDate={toDate} tillPresent={tillPresent} checked={checked} />
                    <SubmitHeaderButton username={username} gamename ={gamename} runtime={runtime} fromDate={fromDate} toDate={toDate} tillPresent={tillPresent} checked={checked}/>
                </Fragment>

                <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}