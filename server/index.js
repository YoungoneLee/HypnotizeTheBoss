const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body
const port = 3000;


//wen
app.post('/insertData', async (req, res) => {
  const { number } = req.body;
  try {
    const result = await pool.query('INSERT INTO testtable (number) VALUES ($1) RETURNING *', [number]);
    console.log(`Data inserted with ID: ${result.rows[0].id}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//wen
app.post('/insertRunData', async (req, res) => {
  const { vod, runtime, type, gameName } = req.body;
  try {
    const result = await pool.query('INSERT INTO run (vod, runtime, type, gameName) VALUES ($1, $2, $3, $4) RETURNING *', [vod, runtime, type, gameName]);
    console.log(`Data inserted with RunID: ${result.rows[0].vod}`);
    
    const result2 = await pool.query('INSERT INTO submits (time, date, runID, runnerID) VALUES (now(), now(), $1, 1) RETURNING *', [result.rows[0].runid]);
    //console.log(`Data inserted with SubmissionID: ${result2.rows[0].submissionID}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//wen
app.post('/insertCategoryData', async (req, res) => {
  const { extension, type } = req.body;
  try {
    const result = await pool.query('INSERT INTO category (extension, type) VALUES ($1, $2) RETURNING *', [extension, type]);
    console.log(`Data inserted with CategoryID: ${result.rows[0].categoryID}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//wen
app.post('/insertGameData', async (req, res) => {
  const { gameName, genre, releaseYear } = req.body;
  try {
    const result = await pool.query('INSERT INTO game (gameName, genre, releaseYear) VALUES ($1, $2, $3) RETURNING *', [gameName, genre, releaseYear]);
    
    console.log(`Data inserted for game: ${result.rows[0].gameName}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//leah
//search for runs associated with a runner 
//(i.e., with runs that have a runner username containing user input)
//run = runner's username, game name, category name, run time, vod, submission date, submission time
app.get('/searchByRunner', async (req, res) => {
  const runner = req.query.runner;
  console.log('Search Term:', runner);
  try {
    const results = await pool.query(
      `SELECT runner.username, run.gamename, category.type, run.runtime, run.vod, submits.date, submits.time
       FROM runner, run, category, submits
       WHERE runner.username ILIKE $1
         AND category.categoryID = run.categoryID
         AND runner.runnerID = submits.runnerID
         AND submits.runID = run.runID`,
      [`${runner}%`]
    );
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//to test, need to do /searchByRunner?runner=runnername, can change to post so that it doesn't do this, but shouldn't be necessary


//leah
//search for runs associated with a a game name
app.get('/searchByGame', async (req, res) => {
  const game = req.query.game;
  console.log('Search Term:', game);
  try {
    const results = await pool.query(
      `SELECT runner.username, run.gamename, category.type, run.runtime, run.vod, submits.date, submits.time
       FROM runner, run, category, submits
       WHERE run.gamename ILIKE $1
         AND category.categoryID = run.categoryID
         AND runner.runnerID = submits.runnerID
         AND submits.runID = run.runID`,
      [`${game}%`]
    );
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//leah
//search for runs associated with a category type
app.get('/searchByCategory', async (req, res) => {
  const category = req.query.category;
  console.log('Search Term:', category);
  try {
    const results = await pool.query(
      `SELECT runner.username, run.gamename, category.type, run.runtime, run.vod, submits.date, submits.time
       FROM runner, run, category, submits
       WHERE category.type ILIKE $1
         AND category.categoryID = run.categoryID
         AND runner.runnerID = submits.runnerID
         AND submits.runID = run.runID`,
      [`${category}%`]
    );
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//wen
app.get('/getData', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM testtable');
    data.rows.forEach(row => {
      console.log(`Data number with value: ${row.number}`);
    });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//wen
app.get('/getRunData', async (req, res) => {
  console.log('GET request to /getRunData received');

  try {
    const data = await pool.query('SELECT * FROM run');
    data.rows.forEach(row => {
      console.log(`RunID: ${row.runid}, VOD: ${row.vod}, Runtime: ${row.runtime}, CategoryID: ${row.categoryid}, GameName: ${row.gamename}`);
    });
    res.status(200).json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//wen
//deletes both a run and the submit associated with it based on the runid of that run
app.delete('/deleteRunData/:runid', async (req, res) => {
const runid = req.params.runid;

try {
  const results1 = await pool.query('DELETE FROM run WHERE runid = $1 RETURNING *', [runid]);
  const results2 = await pool.query('DELETE FROM submits WHERE runid = $1 RETURNING *', [runid]);

  if ((results1.rows.length > 0) && (results2.rows.length > 0)) {
    console.log(`Data with number ${runid} deleted successfully`);
    res.status(200).json({ message: 'Data deleted successfully', 
      deletedData1: results1.rows[0],
      deletedData2: results2.rows[0] 
    });
  } else {
    console.log(`No data found with runid ${runid}`);
    res.status(404).json({ error: 'Data not found' });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});


//wen
//http://localhost:3000/deleteRunnerData/2 !! works 
//deletes runner based on their username -- rewritten code but it's more readable prolly
app.delete('/deleteRunnerData/:runnerid', async (req, res) => {
  const runner = req.params.runnerid
  try {
    
    //returns the runid we want from the tables
    const runidResult = await pool.query('SELECT run.runid FROM run, submits  WHERE run.runid = submits.runid AND  submits.runnerid = $1', [runner]);
    
    if (runidResult.rows.length === 0) {
      console.log(`No runid found for runner ${runner}`);
      res.status(404).json({ error: 'Data not found' });
      return;
    }

    const runid = runidResult.rows[0].runid;

    const results1 = await pool.query('DELETE FROM runner WHERE runnerID = $1 RETURNING *', [runner]);
    const results2 = await pool.query('DELETE FROM submits WHERE runnerID = $1 RETURNING *', [runner]);
    const results3 = await pool.query('DELETE FROM run WHERE runid = $1 RETURNING *', [runid]);

    if (results1.rows.length > 0) {
      console.log(`Data with number ${runner} deleted successfully`);
      res.status(200).json({ message: 'Data deleted successfully', 
        deletedData1: results1.rows[0],
        deletedData2: results2.rows[0], 
        deletedData3: results3.rows[0], 
        });
    } else {
      console.log(`No data found with username ${runner}`);
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//wen 
//delete game 
//delete run associated with game 
//delete submit associated with run associated with game
app.delete('/deleteGameData/:gamename', async (req, res) => {
  const gamename = req.params.gamename
  try {
    
    //returns the runid we want from the tables
    const runidResult = await pool.query('SELECT submits.runid FROM run, submits  WHERE run.runid = submits.runid AND  run.gamename = $1', [gamename]);
    
    if (runidResult.rows.length === 0) {
      console.log(`No runid found for runner ${gamename}`);
      res.status(404).json({ error: 'Data not found' });
      return;
    }

    const runid = runidResult.rows[0].runid;

    const results1 = await pool.query('DELETE FROM game WHERE gamename = $1 RETURNING *', [gamename]);
    const results2 = await pool.query('DELETE FROM run WHERE gamename = $1 RETURNING *', [gamename]);
    const results3 = await pool.query('DELETE FROM submits WHERE runid = $1 RETURNING *', [runid]);

    if (results1.rows.length > 0) {
      console.log(`Game data with title ${gamename} deleted successfully`);
      res.status(200).json({ message: 'Data deleted successfully', 
        deletedData1: results1.rows[0],
        deletedData2: results2.rows[0], 
        deletedData3: results3.rows[0], 
        });
    } else {
      console.log(`No data found with Gamename ${gamename}`);
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




//wen
app.delete('/deleteData/:number', async (req, res) => {
  const number = req.params.number;

  try {
    const result = await pool.query('DELETE FROM testtable WHERE number = $1 RETURNING *', [number]);

    if (result.rows.length > 0) {
      console.log(`Data with number ${number} deleted successfully`);
      res.status(200).json({ message: 'Data deleted successfully', deletedData: result.rows[0] });
    } else {
      console.log(`No data found with number ${number}`);
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//wen
app.put('/updateData/:number', async (req, res) => {
  const number = req.params.number;
  const { newNumber } = req.body;

  try {
    const result = await pool.query('UPDATE testtable SET number = $1 WHERE number = $2 RETURNING *', [newNumber, number]);

    if (result.rows.length > 0) {
      console.log(`Data with number ${number} updated successfully`);
      res.status(200).json({ message: 'Data updated successfully', updatedData: result.rows[0] });
    } else {
      console.log(`No data found with number ${number}`);
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//wen
app.put('/updateRunner/:username', async (req, res) => {
  const username = req.params.username;
  const { newUsername } = req.body;

  try {
    const result = await pool.query('UPDATE runner SET username = $1 WHERE username = $2 RETURNING *', [newUsername, username]);

    if (result.rows.length > 0) {
      console.log(`Runner with username ${username} updated successfully`);
      res.status(200).json({ message: 'Runner updated successfully', updatedRunner: result.rows[0] });
    } else {
      console.log(`No runner found with username ${username}`);
      res.status(404).json({ error: 'Runner not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
