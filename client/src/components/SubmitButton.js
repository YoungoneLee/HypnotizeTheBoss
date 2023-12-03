import {Button} from '@mui/material';
import React, { Fragment, useEffect, useState } from "react"; 


const SubmitHeaderButton = ({username, gamename, type, runtime, fromDate, toDate, tillPresent, checked}) => {
    const onSubmitForm = async () => {
        try {
            console.log("within the try block of the submit button file");
            console.log("username from submit button: " + username.toString());
            console.log("gamename from submit button: " + gamename.toString());
            console.log("type from submit button: " + type.toString());
            console.log("runtime from submit button: " + runtime.toString());
            console.log("from date: " + fromDate.toString());
            console.log("to date: " + toDate.toString());
            console.log("till present check: " + tillPresent.toString());
            console.log("is slowest: " + checked.toString());



        } catch (err) {
            console.log(err.message);
        }
    };


    const [searchbarRuns, setSearchbarRuns] = useState([]);
    

    // const onSubmitForm = async(gamename, username) => {
    //     try {
    //         const queryString = `?gameName=${encodeURIComponent(gamename)}&username=${encodeURIComponent(username)}`;

    //         const response = await fetch(`http://localhost:3000/getSearchbarRuns${queryString}`);
    //         const jsonData = await response.json();

    //         if (Array.isArray(jsonData)) {
    //             // Assuming setRuns is a function to update state or handle the data
    //             setSearchbarRuns(jsonData);
    //           } else {
    //             console.error('Data fetched is not an array:', jsonData);
    //           }


    //     } catch (err) {
    //         console.log(err.message);
    //     }
    // }

    useEffect(() => {
        setSearchbarRuns([]);
    }, []);

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