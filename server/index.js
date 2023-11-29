const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./db");

//middleware
app.use(cors());
// app.use(cors({ origin: '*' }));
app.use(express.json()); //req.body
const port = 3000;

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

app.post('/insertRunData', async (req, res) => {
  const { vod, runtime, categoryID, gameName } = req.body;
  try {
    const result = await pool.query('INSERT INTO run (vod, runtime, categoryID, gameName) VALUES ($1, $2, $3, $4) RETURNING *', [vod, runtime, categoryID, gameName]);
    console.log(`Data inserted with RunID: ${result.rows[0].runID}`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
