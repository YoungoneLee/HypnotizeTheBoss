import React, { useContext } from "react"; 
import { Button } from '@mui/material';
import RunContext from './RunContext';
import { useNavigate } from 'react-router-dom';

const SimilarRunButton = ({row}) => {
    // const { setSimilarRuns } = useContext(RunContext);
    const { setSimilarRuns, setRowData } = useContext(RunContext);
    const navigate = useNavigate();

    const handleClick = async(e) => {
        // e.preventDefault();
        console.log(row)
        setRowData(row);
        navigate("/similarRuns", {state: {row}}); // replace "/newPage" with the path you want to navigate to

        try {

            const runid = row.runid;

            const queryString = `?runid=${encodeURIComponent(runid)}`;

            const response = await fetch(`http://localhost:3000/moreLikeThis${queryString}`);
            const jsonData = await response.json(); 

            if (Array.isArray(jsonData)) {
                // Assuming setRuns is a function to update state or handle the data
                setSimilarRuns(jsonData);
                navigate("/similarRuns"); // navigate to SearchResults page
            } else if (Array.isArray(jsonData.rows)) {
                setSimilarRuns(jsonData.rows);
                navigate("/similarRuns");
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
                className="similarRunButton"
                sx = {{ m: 1 }}
                onClick={handleClick}> 
                Similar Runs 
            </Button>
        </div>
    );
}

export default SimilarRunButton;