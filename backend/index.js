const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');
const connect = require('./mongodb');

// Connect to MongoDB
connect();

const app = express();
const server = http.createServer(app);

// CORS setup
const corsOptions = {
  origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app', // Vercel frontend URL
  methods: ['GET', 'POST'],
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

// Test route
app.get('/', (req, res) => {
  res.send('HelloWorld!');
});

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app', // Ensure this matches your frontend URL
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('leave_room', (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on('send_message', (data) => {
    const { room, text, sender, receiver } = data;
    console.log(`Message from ${sender} to ${receiver} in ${room}: ${text}`);
    io.to(room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
