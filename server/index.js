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
    
    if (result.rows.length > 0) {
      console.log(`Data inserted with RunID: ${result.rows[0].runid}`);
      // Continue with the rest of the code
    } else {
      console.error('Error inserting data into run table');
      res.status(500).json({ error: 'Internal Server Error' });
      return;  // Stop further execution
    }
    const result2 = await pool.query('INSERT INTO submits (time, date, runID, runnerID) VALUES (now(), now(), $1, 1) RETURNING *', [result.rows[0].runid]);
    if (result2.rows.length > 0) {
      console.log(`Data inserted with SubmissionID: ${result2.rows[0].submissionid}`);
      // Continue with the rest of the code
    } else {
      console.error('Error inserting data into submits table');
      res.status(500).json({ error: 'Internal Server Error' });
      return;  // Stop further execution
    }
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

//leah
//advanced function to get "more like this"
app.get('/moreLikeThis', async (req, res) => {
  const runid = req.query.runid;
  // console.log('Original RunID:', runid);
  try {

    //get other variables used in queries

    const gameResults = await pool.query(`SELECT gamename FROM run WHERE run.runid = '${runid}'`);
    const game = gameResults.rows[0].gamename;

    const genreResults = await pool.query(`SELECT game.genre FROM game WHERE game.gamename = '${game}'`);
    const genre = genreResults.rows[0].genre;

    const usernameResults = await pool.query(`SELECT runner.username FROM run, submits, runner WHERE run.runid = '${runid}' AND run.runid = submits.runid AND submits.runnerid=runner.runnerid`);
    const username = usernameResults.rows[0].username;

    const categoryResults = await pool.query(`SELECT run.type FROM run WHERE run.runid = '${runid}'`);
    const category = categoryResults.rows[0].type;

    const runtimeResults = await pool.query(`SELECT run.runtime FROM run WHERE run.runID= '${runid}'`);
    const runtime = runtimeResults.rows[0].runtime;

    //(re)make omegatable

    // await pool.query(`
    //    CREATE OR REPLACE VIEW omegatable AS
    //   SELECT runner.runnerid, runner.username, 
    //     run.runid, run.vod, run.runtime, run.type, 
    //     game.gamename, game.genre, game.releaseyear, 
    //     submits.submissionid, submits.time, submits.date
    //   FROM run, runner, game, submits
    //   WHERE run.runid = submits.runid 
    //     AND submits.runnerid = runner.runnerid
    //     AND run.gamename = game.gamename
    // `)

    //(re)make views for each combo of attributes

    await pool.query(`
      CREATE OR REPLACE VIEW runnergenre AS
      SELECT *
      FROM omegatable
      WHERE gamename <> '${game}'
        AND genre = '${genre}'
        AND username = '${username}'
    `);

    await pool.query(`  
      CREATE OR REPLACE VIEW genretime AS
      SELECT *
      FROM omegatable
      WHERE genre = '${genre}'
        AND (runtime <= time '${runtime}'::time + '5 minutes'::interval 
        AND runtime >= time '${runtime}'::time - '5 minutes'::interval) 
        AND gamename <> '${game}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW runnertime AS
      SELECT *
      FROM omegatable
      WHERE username = '${username}'
        AND (runtime <= time '${runtime}'::time + '5 minutes'::interval 
        AND runtime >= time '${runtime}'::time - '5 minutes'::interval) 
        AND runid <> '${runid}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW genrecategory AS
      SELECT *
      FROM omegatable
      WHERE genre = '${genre}'
        AND gamename <> '${game}'
        AND type = '${category}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW runnercategory AS
      SELECT *
      FROM omegatable
      WHERE username = '${username}' 
        AND type = '${category}'
        AND runid <> '${runid}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW categorytime AS
      SELECT *
      FROM omegatable
      WHERE type = '${category}' 
        AND (runtime <= time '${runtime}'::time + '5 minutes'::interval 
        AND runtime >= time '${runtime}'::time - '5 minutes'::interval)
        AND runid <> '${runid}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW gamerunner AS
      SELECT *
      FROM omegatable
      WHERE gamename = '${game}' 
        AND username = '${username}' 
        AND runID <> '${runid}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW gametime AS
      SELECT *
      FROM omegatable
      WHERE gamename = '${game}' 
        AND (runtime <= time '${runtime}'::time + '5 minutes'::interval 
        AND runtime >= time '${runtime}'::time - '5 minutes'::interval) 
        AND runID <> '${runid}'
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW gamecategory AS
      SELECT *
      FROM omegatable
      WHERE gamename = '${game}' 
        AND type = '${category}' 
        AND runID <> '${runid}'
    `);

    //(re)make views for each set of priorities

    await pool.query(`
      CREATE OR REPLACE VIEW high AS
      (SELECT * FROM runnergenre)
      UNION
      (SELECT * FROM runnertime)
      UNION
      (SELECT * FROM gamecategory)
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW mid AS
      (SELECT * FROM runnercategory)
      UNION
      (SELECT * FROM gamerunner)
      UNION
      (SELECT * FROM gametime) 
    `);

    await pool.query(`
      CREATE OR REPLACE VIEW low AS
      (SELECT * FROM genretime)
      UNION
      (SELECT * FROM genrecategory)
      UNION
      (SELECT * FROM categorytime)
    `);

    //(re)make view containing 5 high, 3 mid, 2 low priority runs

    await pool.query(`
      CREATE OR REPLACE VIEW morelikethis AS
      (SELECT * FROM high LIMIT 5)
      UNION
      (SELECT * FROM mid LIMIT 3)
      UNION
      (SELECT * FROM low LIMIT 2)
    `);

    //select info to return from last view

    const results = await pool.query(`
      SELECT username, gamename, type, runtime, vod, time, date
      FROM morelikethis
    `);

    //return info
    
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
  // console.log('GET request to /getRunData received');

  try {

    // await pool.query(`
    //   CREATE OR REPLACE VIEW omegatable AS
    //   SELECT runner.runnerid, runner.username, 
    //     run.runid, run.vod, run.runtime, run.type, 
    //     game.gamename, game.genre, game.releaseyear, 
    //     submits.submissionid, submits.time, submits.date
    //   FROM run, runner, game, submits
    //   WHERE run.runid = submits.runid 
    //     AND submits.runnerid = runner.runnerid
    //     AND run.gamename = game.gamename
    // `)

    const data = await pool.query('SELECT * FROM omegatable');
    // data.rows.forEach(row => {
    //   console.log(`RunID: ${row.runid}, VOD: ${row.vod}, Runtime: ${row.runtime}, CategoryID: ${row.categoryid}, GameName: ${row.gamename}`);
    // });
    res.status(200).json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//getSearchbarRuns
app.get('/getSearchbarRuns', async (req, res) => {
  // Extract the parameters from the query string
  const { username, gamename, type, runtime, checked, fromDate, toDate } = req.query;
  
  // await pool.query(`
  //   CREATE OR REPLACE VIEW omegatable AS
  //   SELECT runner.runnerid, runner.username, 
  //     run.runid, run.vod, run.runtime, run.type, 
  //     game.gamename, game.genre, game.releaseyear, 
  //     submits.submissionid, submits.time, submits.date
  //   FROM run, runner, game, submits
  //   WHERE run.runid = submits.runid 
  //     AND submits.runnerid = runner.runnerid
  //     AND run.gamename = game.gamename`)
  
  let queryString = 'SELECT * FROM omegatable';
  const queryParams = [];

  if (username) {
    queryParams.push(`username ILIKE'${username}%'`);
  }

  if (gamename) {
    queryParams.push(`gamename ILIKE '${gamename}%'`);
  }

  if (type) {
    queryParams.push(`type ILIKE '${type}%'`);
  }

  if (runtime && runtime != 'fastest' && runtime != 'slowest') {
    queryParams.push(`runtime < TIME '${runtime}'`);
  } 

  if (fromDate) {
    queryParams.push(`date >= DATE '${fromDate}'`);
  }

  if (toDate) {
    queryParams.push(`date <= DATE '${toDate}'`);
  }

  if (queryParams.length > 0) {
    queryString += ' WHERE ' + queryParams.join(' AND ');
  }

  if (runtime == 'fastest') {
    queryString += ' ORDER BY runtime ASC';
  } else if (runtime == 'slowest') {
    queryString += ' ORDER BY runtime DESC';
  }

  //show by oldest submission
  //TODO: this does not currently work
  if(checked == true) {
    queryString += ' ORDER BY date ASC, time ASC';
  } else if (checked == false) {
    //show by most recent submission 
    queryString += ' ORDER BY date DESC, time DESC';
  }

  try {
    const data = await pool.query(queryString);
    res.status(200).json(data.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//wen
//deletes both a run and the submit associated with it based on the runid of that run
app.delete('/deleteRunData/:runid', async (req, res) => { ///:runid
  const runid = req.params.runid;
  console.log("Run deleted");
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

//leah
//delete category
//delete submits and runs associated with deleted category
//note that for categories containing a %, the url must be encoded so that the % is properly parsed (e.g., for 100% url must be http://localhost:3000/deleteCategoryData/100%25)
app.delete('/deleteCategoryData/:category', async(req, res) => {
  const category = req.params.category;
  try {
    
    //returns the runid we want from the tables
    const runidResult = await pool.query('SELECT submits.runid FROM run, submits  WHERE run.runid = submits.runid AND run.type = $1', [category]);
    
    if (runidResult.rows.length === 0) {
      console.log(`No runid found for category ${category}`);
      res.status(404).json({ error: 'Data not found' });
      return;
    }

    const runid = runidResult.rows[0].runid;

    const results1 = await pool.query('DELETE FROM category WHERE type = $1 RETURNING *', [category]);
    const results2 = await pool.query('DELETE FROM run WHERE type = $1 RETURNING *', [category]);
    const results3 = await pool.query('DELETE FROM submits WHERE runid = $1 RETURNING *', [runid]);

    if (results1.rows.length > 0) {
      console.log(`Category with title ${category} deleted successfully`);
      res.status(200).json({ message: 'Data deleted successfully', 
        deletedData1: results1.rows[0],
        deletedData2: results2.rows[0], 
        deletedData3: results3.rows[0], 
        });
    } else {
      console.log(`No data found with category type ${category}`);
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


//wen insert 
app.post('/insertRunner', async (req, res) => {
  const { username } = req.body;

  try {
    const results = await pool.query('INSERT INTO runner(username) VALUES($1) RETURNING *', [username]);

    console.log(`Runner with username ${username} inserted successfully`);
    res.status(201).json({
      message: 'Runner inserted successfully',
      insertedRunner: results.rows[0],
    });
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
console.log(newUsername);
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
