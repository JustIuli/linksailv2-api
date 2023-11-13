const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const api = require('./api');
require('dotenv').config();

app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.options('*', cors());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', api);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 4000, function() {
        console.log('Server running on port 4000', '');
    });
  })
  .catch(err => {
    console.log(err)
})