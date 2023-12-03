import {Button} from '@mui/material';
import React, { Fragment, useEffect, useState, useContext } from "react"; 
import RunContext from './RunContext';

const SubmitHeaderButton = ({username, gamename, type, runtime, fromDate, toDate, tillPresent, checked}) => {
    const { setSearchbarRuns } = useContext(RunContext);

    const onSubmitForm = async() => {
        try {
            const queryString = `?gamename=${encodeURIComponent(gamename)}&type=${encodeURIComponent(type)}&username=${encodeURIComponent(username)}`;
            const response = await fetch(`http://localhost:3000/getSearchbarRuns${queryString}`);
            const jsonData = await response.json();

            if (Array.isArray(jsonData)) {
                // Assuming setRuns is a function to update state or handle the data
                setSearchbarRuns(jsonData);
              } else {
                console.error('Data fetched is not an array:', jsonData);
              }


        } catch (err) {
            console.log(err.message);
        }
    }

    return(
        <div>
            <Button 
                className="customButton"
                onClick={onSubmitForm}> 
                Search 
            </Button>
        </div>          
    );
}

export default SubmitHeaderButton;