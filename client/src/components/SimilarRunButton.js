import { Button } from '@mui/material';
import React from "react"; 
import { useNavigate } from 'react-router-dom';

const SimilarRunButton = ({row}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(row)
        navigate("/similarRuns", {state: {row}}); // replace "/newPage" with the path you want to navigate to
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