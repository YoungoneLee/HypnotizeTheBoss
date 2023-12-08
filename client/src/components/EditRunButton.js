import { Button } from '@mui/material';
import React from "react"; 
import { useNavigate } from 'react-router-dom';


const EditRunButton =  ({rowData}) => {
    const navigate = useNavigate();


    const handleClick = async(e) => {
        console.log(rowData)
        navigate("/updateUsername"); // navigate to SearchResults page
    }


    return(
        <div> 
            <Button 
                onClick={handleClick}
                className="editRunButton"
                sx = {{ m: 1 }}>
             Edit This Run</Button>
        </div>
    );
    
}

export default EditRunButton;