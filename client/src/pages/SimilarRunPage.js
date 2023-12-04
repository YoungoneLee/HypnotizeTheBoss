import React, { useContext } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import RunContext from '../components/RunContext';
import Container from '@mui/material/Container';
import Header from '../components/Header'
import ReusableListRuns from '../components/ReusableListRuns';
import Typography from '@mui/material/Typography';
import DeleteRunButton from '../components/DeleteButton';
import EditRunButton from '../components/EditRunButton';


const SimilarRunPage = () => {
    const { similarRunsResults = [], rowData } = useContext(RunContext);

    const formattedSimilarRuns = similarRunsResults.map(run => ({
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
          <Header title="similar run page"/>
          <Typography gutterBottom variant="h4" component="div" sx={{ m: 2}}>
            Chosen Run
          </Typography>
    
          <CssBaseline />
            <Container sx={{ height: 'fit-content', marginLeft: '5px', marginBottom: '10px'}}>
            {rowData ? (
              <TableContainer component={Paper} sx={{backgroundColor: '#cfe8fc', marginTop: '20px'}}>
                <Table sx={{ minWidth: 630 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {Object.keys(rowData).map((key, index) => (
                        <TableCell key={index} sx={{ fontWeight: 'bold' }}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {Object.values(rowData).map((value, index) => (
                        <TableCell key={index}>{value}</TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="h6">Loading...</Typography>
            )}
              <Box display="flex" justifyContent="left" sx={{m: '10px'}}>
                <DeleteRunButton rowData={rowData}/>
                <EditRunButton/>
              </Box>
          </Container>
          <ReusableListRuns data={formattedSimilarRuns} columns={columns} />
        </>
      );
}

export default SimilarRunPage;
