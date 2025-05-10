const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

// Create HTTP server and pass to Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: ['https://mern-6gc8-prajwal-pujars-projects.vercel.app'],  // Allow specific origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,  // Optional: if you need credentials support (cookies, authorization headers)
  },
});

// Enable CORS for Express
app.use(cors({
  origin: 'https://mern-6gc8-prajwal-pujars-projects.vercel.app',  // Allow specific origin
  methods: 'GET,POST',
  credentials: true,  // Optional: Allow credentials (cookies, headers)
}));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Set up a connection handler for Socket.IO
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle events from the client
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  
  // Example event
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);  // Emit to all clients
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
