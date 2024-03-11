using System;
using System.Net.Sockets;
using System.Text;
using var client = TcpClient();



var HostName = "192.168.137.41";
client.Connect(HostName, 9100);

using NetworkStream networkstream = client.GetStream();


var mesage = "AA3V+00000H+0000CS6#F5A1V00201H0281Z#003999APSWK#003999%0H0053V00006BG02060>HABCDE%0H0115V00068P02RDB@0,019,019,ABCDEQ#009997LEN000Z#003998";

Console.WriteLine(mesage);

using var reader = new StreamReader(networkstream, Encoding.UTF8);

