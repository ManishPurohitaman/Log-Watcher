// Import required libraries
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO and attach it to the server
const io = socketIo(server);

const getLastNLines = require('./src/readFileInChunks');
// Serve a simple HTML page on the root URL
app.get('/logs', (req, res) => {
    res.sendFile('/Users/mpurohit/Documents/BrowserStack/client' + '/index.html');
});

io.on('connection', async(socket) => {
    console.log('New user connected');
    const text = await getLastNLines('sample.log', 10)
    socket.emit('fileEvent', text);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Set the server to listen on a port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = io;