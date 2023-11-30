import React, {Fragment} from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Select, MenuItem, InputLabel, FormControl, TextField } from '@mui/material';
import Logo from '../images/poliwhirl.jpg'; // replace with your logo path
import './Header.css'; // import the CSS file
import InputData from './InputData';


export default function Header({title}) {

    const [filter, setFilter] = React.useState('');

    const handleFilterChange = (event) => {
            setFilter(event.target.value);
        };


    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    

    const selectStyle = {
        backgroundColor: '#ffffff',
        color: '#000000',
        '&:before': {
            borderColor: '#000000', // Border color when not focused
          },
        '&:after': {
            borderColor: '#000000', // Border color when focused
          },
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <img src={Logo} alt="logo" className="logo" />

                <Typography variant="h6">
                   {title}
                </Typography>
                    
                <Select
                    labelId="filter-select-label"
                    id="filter-select"
                    style={selectStyle}
                    value={filter || "Runner"} //could use enum instead?
                    onChange={handleFilterChange}
                >
                    <MenuItem value={"Runner"}>Runner</MenuItem> 
                    <MenuItem value={"Game"}>Game</MenuItem>
                    <MenuItem value={"Category"}>Category</MenuItem>
                </Select>
                
                

                {/* <Fragment>
                    <InputData/>
                </Fragment> */}

                <Box sx={{ flexGrow: 1 }} />

                {/* <Button className="customButton">Button</Button> */}
            </Toolbar>
        </AppBar>
    );
}