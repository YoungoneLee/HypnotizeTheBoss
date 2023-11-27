import React, {Fragment} from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Logo from '../images/waddlesleep.png'; // replace with your logo path
import './Header.css'; // import the CSS file
import InputData from './InputData';


export default function Header({title}) {
    return (
        <AppBar position="static">
            <Toolbar>
                <img src={Logo} alt="logo" className="logo" />
                <Typography variant="h6">
                   {title}
                </Typography>

                <Fragment>
                    <InputData/>
                </Fragment>

                <Box sx={{ flexGrow: 1 }} />

                <Button className="customButton">Button</Button>
            </Toolbar>
        </AppBar>
    );
}