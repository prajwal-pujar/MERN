const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const connect = require('./mongodb');
const cors = require('cors');

connect();

// CORS configuration
const corsOptions = {
  origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app', // Allowed frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'auth-token', 'send-token', 'rec-token'],
};

// Apply CORS and preflight OPTIONS handling
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Increase body size limit to support base64 image uploads
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/mssg', require('./routes/livemssg'));
app.use('/upload', require('./routes/upload'));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

module.exports = app;
