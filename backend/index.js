const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose');
const connect = require('./mongodb')
const cors = require('cors');
connect()

const cors = require('cors');
app.use(cors({
  origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app', // Allow only this frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

app.use(express.json());

app.use('/auth',require('./routes/auth'))
app.use('/mssg',require('./routes/livemssg'))
app.use('/upload' , require('./routes/upload'))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
module.exports = app;
