import React, { useContext } from 'react';
import RunContext from '../components/RunContext';
import Header from '../components/Header'
import ReusableListRuns from '../components/ReusableListRuns';


export default function SearchResult(){
    const { searchbarRuns = [] } = useContext(RunContext);
    const columns = [
      { id: 'runid', label: 'Run ID' },
      { id: 'vod', label: 'VOD link', align: 'left' },
      { id: 'runtime', label: 'Run Time', align: 'left' },
      { id: 'type', label: 'Category Type', align: 'left' },
      { id: 'gamename', label: 'Game Name', align: 'left' },
  ];
  
  return (
      <div>
        <Header title="Results here!"/>
        <ReusableListRuns data={searchbarRuns} columns={columns} />
      </div>
  );
}