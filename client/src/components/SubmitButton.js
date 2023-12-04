import React, { useContext } from "react"; 
import { Button } from '@mui/material';
import RunContext from './RunContext';
import { useNavigate } from 'react-router-dom';


const SubmitHeaderButton = ({username, gamename, type, runtime, fromDate, toDate, tillPresent, checked}) => {
    const { setSearchbarRuns } = useContext(RunContext);
    const navigate = useNavigate();


    const onSubmitForm = async() => {
        try {

            let fDate = new Date(fromDate);
            let tDate = new Date(toDate);

            let formattedFromDate = fDate.toISOString().split('T')[0];
            let formattedToDate = tDate.toISOString().split('T')[0];

            const queryString = `?gamename=${encodeURIComponent(gamename)}&type=${encodeURIComponent(type)}&runtime=${encodeURIComponent(runtime)}&username=${encodeURIComponent(username)}&fromDate=${encodeURIComponent(formattedFromDate)}&toDate=${encodeURIComponent(formattedToDate)}&checked=${encodeURIComponent(checked)}`;
            const response = await fetch(`http://localhost:3000/getSearchbarRuns${queryString}`);
            const jsonData = await response.json();

            if (Array.isArray(jsonData)) {
                // Assuming setRuns is a function to update state or handle the data
                setSearchbarRuns(jsonData);
                navigate("/searchResult"); // navigate to SearchResults page
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
                sx={{ m: 3}}
                onClick={onSubmitForm}> 
                Search 
            </Button>
        </div>          
    );
}

export default SubmitHeaderButton;