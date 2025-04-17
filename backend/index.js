const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const connect = require('./mongodb')
const cors = require('cors');
connect()
app.use(express.json());
app.use(cors());
app.use('/auth',require('./routes/auth'))
app.use('/mssg',require('./routes/livemssg'))
app.use('/upload' , require('./routes/upload'))

module.exports = app;
