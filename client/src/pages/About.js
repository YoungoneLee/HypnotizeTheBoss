import React, { useEffect, useState } from "react"; 
import ReusableListRuns from "../components/ReusableListRuns"
import WaddleDeeHeader from "../components/WaddleDeeBar"
import Typography from '@mui/material/Typography';

export default function About(){


    const [todos, setTodos] = useState([]);
    
    const getTodos = async() => {
        try {
            //by default fetch is a GET Request 
            const response = await fetch("http://localhost:3000/getRunData")
            const jsonData = await response.json();

            if (Array.isArray(jsonData)) {
                setTodos(jsonData);
            } else {
                console.log(jsonData);
                console.error('Data fetched is not an array');
            }
        } catch (err) {
            console.error(err.messsage)
        }
    }

    useEffect(() => {
        getTodos();
    }, []);


    const formattedAllRuns = todos.map(run => ({
        ...run,
        date: new Date(run.date).toLocaleDateString()
      }));

    const columns = [
        // { id: 'runid', label: 'Run ID' },
        { id: 'vod', label: 'VOD link', align: 'left' },
        { id: 'runtime', label: 'Run Time', align: 'left' },
        { id: 'type', label: 'Category Type', align: 'left' },
        { id: 'gamename', label: 'Game Name', align: 'left' },
        { id: 'username', label: 'Username', align: 'left' },
        { id: 'date', label: 'Submission Date', align: 'left' },
        { id: 'time', label: 'Submission Time', align: 'left' },
        ];

    return(
        <>
            <WaddleDeeHeader/>
            <Typography gutterBottom variant="h4" component="div" sx={{ m: 2}}>
              Runs of the day
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ m: 2}}>
                These are random runs from our database, click on one you find interesting to see similar runs.
            </Typography>
            <ReusableListRuns data={formattedAllRuns} columns={columns} sx={{m : 3}}/>
        </>
    )
}