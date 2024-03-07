public class TcpClient : IDisposable
using System;
using System.Net.Sockets;
using System.Text;

class Program
{
    static void Main()
    {
        // Prompt the user for the IP address
        Console.Write("Enter the server IP address: ");
        string ipAddress = Console.ReadLine();

        // Prompt the user for the port
        Console.Write("Enter the server port: ");
        int port = int.Parse(Console.ReadLine());

        // Hardcoded message to send to the printer
        string message = "AA3V+00000H+0000CS6#F5A1V00201H0281Z#003999APSWK#003999%0H0053V00006BG02060>HABCDE%0H0115V00068P02RDB@0,019,019,ABCDEQ#009997LEN000Z#003998";

        // Convert the message to bytes
        byte[] data = Encoding.ASCII.GetBytes(message);

        // Create a TCP client and connect to the printer
        using (TcpClient client = new TcpClient(ipAddress, port))
        using (NetworkStream stream = client.GetStream())
        {
            Console.WriteLine("Connected to server");

            // Send the message to the printer
            stream.Write(data, 0, data.Length);
            Console.WriteLine($"Sent message: {message}");

            // Handle server response (if needed)
            byte[] responseData = new byte[1024];
            int bytesRead = stream.Read(responseData, 0, responseData.Length);
            string response = Encoding.ASCII.GetString(responseData, 0, bytesRead);
            Console.WriteLine($"Received data from server: {response}");

            Console.WriteLine("Closing connection");
        }
    }
}
