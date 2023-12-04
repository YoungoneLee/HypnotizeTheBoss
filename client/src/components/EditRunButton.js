import { Button } from '@mui/material';
import React from "react"; 

const EditRunButton = () => {
    return(
        <div> 
            <Button 
                className="editRunButton"
                sx = {{ m: 1 }}>
             Edit Run </Button>
        </div>
    );
}

export default EditRunButton;