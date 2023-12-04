import React, { Fragment } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import Stack from '@mui/system/Stack';
import SimilarRunButton from "./SimilarRunButton";
import EditRunButton from "./EditRunButton";

const ReusableListRuns = ({ columns, data }) => {
  console.log('columns:', columns);
  console.log('data:', data);

  return (
    <Fragment>
      <TableContainer component={Paper} sx={{backgroundColor: '#ece6fc', marginTop: '20px'}}>
        <Table sx={{ minWidth: 630 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>{column.label} </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
                <TableRow key={row.submissionid}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} >
                    {row[column.id]}
                  </TableCell>
                ))}
                <Stack>
                  <SimilarRunButton row={row}/>
                  <EditRunButton/>
                </Stack>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default ReusableListRuns;
