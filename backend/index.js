const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const connect = require('./mongodb');
const cors = require('cors');

connect();


const corsOptions = {
origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app', 
methods: ['GET', 'POST', 'PUT', 'DELETE'],
allowedHeaders: ['Content-Type', 'auth-token', 'send-token', 'rec-token'],
};


app.use(cors(corsOptions));
app.options('\*', cors(corsOptions));


app.use(express.json({ limit: '5mb' }));

app.use('/auth', require('./routes/auth'));
app.use('/mssg', require('./routes/livemssg'));
app.use('/upload', require('./routes/upload'));

app.get('/', (req, res) => {
res.send('HelloWorld!');
});

module.exports = app;


