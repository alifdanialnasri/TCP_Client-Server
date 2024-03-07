const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for the IP address and port
rl.question('Enter the server IP address: ', (ipAddress) => {
  rl.question('Enter the server port: ', (port) => {
    // Create a TCP socket
    const socket = new net.Socket();

    // Connect to the server
    socket.connect(port, ipAddress, () => {
      console.log('Connected to server');

      // Listen for data from the server
      socket.on('data', (data) => {
        console.log(`Received data from server: ${data}`);
      });

      // Handle server disconnect
      socket.on('close', () => {
        console.log('Connection to server closed');
        rl.close();
      });

      // Handle user input and send messages to the server
      rl.on('line', (input) => {
        socket.write(input);
      });
    });

    // Handle connection errors
    socket.on('error', (err) => {
      console.error('Error connecting to server:', err.message);
      rl.close();
    });
  });
});

// Handle user input for closing the connection
rl.on('SIGINT', () => {
  console.log('Closing connection');
  rl.close();
});
