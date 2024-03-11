const WebSocket = require('ws');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the server IP address: ', (ipAddress) => {
  rl.question('Enter the server port: ', (port) => {
    // Hardcoded message to send to the server
    const message = "\x02L\nD11\nS1\nq609\nQ203,026\nZT\nJF\nO\nR6,0\nf100\nN\nA100,100,0,3,1,1,N,\"Hello, World!\"\nP1";

    // Create a WebSocket connection to the server
    const ws = new WebSocket(`ws://${ipAddress}:${port}`);

    // Handle connection open
    ws.on('open', () => {
      console.log('Connected to server');
      // Send the message to the server
      ws.send(message);
    });

    // Handle messages from the server
    ws.on('message', (data) => {
      console.log(`Received data from server: ${data}`);
    });

    // Handle connection errors
    ws.on('error', (err) => {
      console.error('Error connecting to server:', err.message);
    });

    // Close the connection when the user presses Ctrl+C
    rl.on('SIGINT', () => {
      console.log('Closing connection');
      ws.close();
      rl.close();
    });
  });
});
