import { Button } from '@mui/material';
import React from "react"; 

const EditRunButton = () => {
    return(
        <Button 
            className="editRunButton"
            sx = {{ m: 1, marginRight: '5px'}}>
        Edit This Run
        </Button>
        
    );
}

export default EditRunButton;