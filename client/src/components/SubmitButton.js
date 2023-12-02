import React from 'react';
import {Button} from '@mui/material';

const SubmitHeaderButton = ({username, gamename}) => {
    const onSubmitForm = async () => {
        try {
            console.log("within the try block of the submit button file");
            console.log("username from submit button: " + username.toString());
            console.log("gamename from submit button: " + gamename.toString());
        } catch (err) {
            console.log(err.message);
        }
    };

    return(
        <div>
            <Button 
                className="customButton"
                onClick={() => onSubmitForm()}> 
                Search 
            </Button>
        </div>  
    );
}

export default SubmitHeaderButton;