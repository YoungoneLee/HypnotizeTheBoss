import { Button } from '@mui/material';
import React from "react"; 
import { useNavigate } from 'react-router-dom';

const SimilarRunButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/similarRuns"); // replace "/newPage" with the path you want to navigate to
    }

    return(
        <div> 
            <Button 
                className="similarRunButton"
                sx = {{ m: 1 }}
                onClick={handleClick}> 
                Similar Runs 
            </Button>
        </div>
    );
}

export default SimilarRunButton;