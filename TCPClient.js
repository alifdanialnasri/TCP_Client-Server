// const net = require('net');
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Prompt the user for the IP address and port
// rl.question('Enter the server IP address: ', (ipAddress) => {
//   rl.question('Enter the server port: ', (port) => {
//     // Create a TCP socket
//     const socket = new net.Socket();

//     // Connect to the server
//     socket.connect(port, ipAddress, () => {
//       console.log('Connected to server');

//       // Listen for data from the server
//       socket.on('data', (data) => {
//         console.log(`Received data from server: ${data}`);
//       });

//       // Handle server disconnect
//       socket.on('close', () => {
//         console.log('Connection to server closed');
//         rl.close();
//       });

//       // Handle user input and send messages to the server
//       rl.on('line', (input) => {
//         socket.write(input);
//       });
//     });

//     // Handle connection errors
//     socket.on('error', (err) => {
//       console.error('Error connecting to server:', err.message);
//       rl.close();
//     });
//   });
// });

// // Handle user input for closing the connection
// rl.on('SIGINT', () => {
//   console.log('Closing connection');
//   rl.close();
// });

const readline = require('readline');
const net = require('net');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt the user for the IP address and port
rl.question('Enter the server IP address: ', (ipAddress) => {
  rl.question('Enter the server port: ', (port) => {
    // Hardcoded message to send to the printer
    const message = String.fromCharCode(2) +
      "AA3V+00000H+0000CS6#F5A1V00201H0281Z#003999APSWK#003999%0H0053V00006BG02060>HABCDE%0H0115V00068P02RDB@0,019,019,ABCDEQ#009997LEN000Z#003998";

    // Create a TCP socket
    const socket = new net.Socket();

    // Connect to the server
    socket.connect(port, ipAddress, () => {
      console.log('Connected to server');

      // Send the message to the server
      console.log(`Sending message: ${message}`);
      socket.write(message);
    });

    // Handle server response
    socket.on('data', (data) => {
      console.log(`Received data from server: ${data}`);
    });

    // Handle server disconnect
    socket.on('close', () => {
      console.log('Connection to server closed');
      rl.close();
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
