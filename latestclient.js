const readline = require('readline');
const net = require('net');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Hardcoded server IP address and port
const ipAddress = '192.168.137.41';
const port = 9100;

// Hardcoded message to send to the printer
const message = String.fromCharCode(2) +
  "AA3V+00000H+0000CS6#F5A1V00201H0281Z#003999APSWK#003999%0H0053V00006BG02060>HABCDE%0H0115V00068P02RDB@0,019,019,ABCDEQ#009997LEN000Z#003998";

// Create a TCP socket
const socket = new net.Socket();

// Function to send the message to the server
function sendMessage() {
  // Check if the socket is already connected
  if (!socket.connecting && socket.writable) {
    // Send the message to the server
    console.log(`Sending message: ${message}`);
    socket.write(message);
  } else {
    console.log('Socket is not connected');
  }
}

// Function to ask the user if they want to continue
function askUser() {
  rl.question('Do you want to continue sending the message? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y') {
      sendMessage();
      askUser(); // Ask again
    } else {
      console.log('Ending the program');
      rl.close();
    }
  });
}

// Connect to the server
socket.connect(port, ipAddress, () => {
  console.log('Connected to server');
  askUser(); // Start by asking the user
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
