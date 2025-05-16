const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const connect = require('./mongodb');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'auth-token', 'send-token', 'rec-token'],
  }
});

// MongoDB connection
connect();

// CORS middleware
const corsOptions = {
  origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'auth-token', 'send-token', 'rec-token'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Body parser
app.use(express.json({ limit: '5mb' }));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/mssg', require('./routes/livemssg'));
app.use('/upload', require('./routes/upload'));

app.get('/', (req, res) => {
  res.send('HelloWorld!');
});

// Socket.IO handlers
io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('send-message', ({ from, to, text }) => {
    io.to(to).emit('receive-message', { name: from, text });
  });
});


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
