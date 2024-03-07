const net = require('net');

// Specify the IP address and port
const IP_ADDRESS = '127.0.0.1';
const PORT = 3000;

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('Client connected');

  // Handle incoming data from clients
  socket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);
    // Echo the data back to the client
    socket.write(`Server received data: ${data}`);
  });

  // Handle client disconnect
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Start the server and listen on the specified IP address and port
server.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server started and listening on ${IP_ADDRESS}:${PORT}`);
});
