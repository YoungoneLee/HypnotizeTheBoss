import React from 'react';
import {Button} from '@mui/material';
import RunnerSearchBar from './RunnerSearchBar';

const SubmitHeaderButton = ({username}) => {
    const onSubmitForm = async () => {
        try {
            console.log("within the try block of the submit button file");
            console.log("username from submit button: " + username.toString());
        } catch (err) {
            console.log(err.message);
        }
    };

    return(
        <div>
            {/* <RunnerSearchBar onSubmitForm={onSubmitForm} /> */}
            <Button 
                className="customButton"
                onClick={() => onSubmitForm()}> 
                Search 
            </Button>
        </div>
        
    );
}

export default SubmitHeaderButton;