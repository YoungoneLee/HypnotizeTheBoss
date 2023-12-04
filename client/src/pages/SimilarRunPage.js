import React, { useContext } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import RunContext from '../components/RunContext';
import Container from '@mui/material/Container';
import Header from '../components/Header'
import ReusableListRuns from '../components/ReusableListRuns';

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
          <h1> Chosen Run </h1>
    
          <CssBaseline />
          <Container sx={{ bgcolor: '#cfe8fc', height: 'fit-content', marginTop: '10px'}}>
            {rowData ? (
              Object.entries(rowData).map(([key, value], index) => (
                <h1 key={index}>{key}: {value}</h1>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
            <Box display="flex" justifyContent="center" >
                <Button className="deleteRunButton"> Delete This Run </Button>
            </Box>
          </Container>
    
          <h1> More runs like this: </h1>
          <ReusableListRuns data={formattedSimilarRuns} columns={columns} />
        </>
      );
}

export default SimilarRunPage;
