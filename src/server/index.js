const express = require('express');

const connectDB = require('../config/db');

const app = express();
const Job = require('./models/Job');

app.use(express.static('dist'));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.get('/api', async (req, res) => {
  try {
    const filterParams = req.query;
    const query = {};
    if (filterParams.type) {
      query.type = filterParams.type;
    }
    if (filterParams.location) {
      query.location = filterParams.location;
    }
    if (filterParams.experience) {
      query.type = filterParams.experience;
    }
    if (filterParams.keyword) {
      query.$text = { $search: filterParams.keyword };
    }
    const result = await Job.find(query);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/api', async (req, res) => {
  try {
    const data = req.body;
    const job = new Job(data);
    const result = await job.save(data);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

connectDB();
app.listen(4000, () => console.log('Listening on port 4000!'));
