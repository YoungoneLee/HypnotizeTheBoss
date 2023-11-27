import React, { Fragment, useEffect, useState } from "react"; 

//mui components table import 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ListTodos = () => {

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


    // console.log(todos);
    return (
        <Fragment>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Run ID</TableCell>
                    <TableCell align="right">VOD link</TableCell>
                    <TableCell align="right">Run Time</TableCell>
                    <TableCell align="right">Category ID</TableCell>
                    <TableCell align="right">Game Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {todos.map((run) => (
                    <TableRow
                    key={run.runid}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {run.runid}
                    </TableCell>
                    <TableCell align="right">{run.vod}</TableCell>
                    <TableCell align="right">{run.runtime}</TableCell>
                    <TableCell align="right">{run.categoryid}</TableCell>
                    <TableCell align="right">{run.gamename}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Fragment>
      );
}


export default ListTodos;
