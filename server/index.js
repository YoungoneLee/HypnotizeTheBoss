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

app.get('/getData', async (req, res) => {
  try {
    const data = await await pool.query('SELECT * FROM testtable');
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
