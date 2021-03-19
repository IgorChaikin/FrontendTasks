using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Lab1
{
    class Connector
    {
        private int AnotherPort;
        private string Ip;
        private User ThisUser;
        
        private string GetFromStream(NetworkStream streamFromOutside)
        {
            byte[] data = new byte[64];

            StringBuilder builder = new StringBuilder();
            int bytes = 0;
            do
            {
                bytes = streamFromOutside.Read(data, 0, data.Length);
                builder.Append(Encoding.Unicode.GetString(data, 0, bytes));
            }
            while (streamFromOutside.DataAvailable);

            return builder.ToString();
        }

        private void SuccefullOutput(string template, string name, int port)
        {
            Console.Clear();
            Console.WriteLine(template, name, port);
        }

        public Connector(string ip, User thisUser, int anothertPort)
        {
            this.Ip = ip;
            this.ThisUser = thisUser;
            this.AnotherPort = anothertPort;
        }

        public int Connect()
        {
            //connection from outside
            TcpListener listener = new TcpListener(IPAddress.Parse(Ip), ThisUser.Port);
            listener.Start();

            //connection from inside
            TcpClient myClient = null;
            byte[] data;

            while (true)
            {
                try
                {
                    if (listener.Pending())
                    {
                        TcpClient anotherClient = listener.AcceptTcpClient();
                        NetworkStream streamFromOutside = anotherClient.GetStream();
                        User AnotherUser = JsonSerializer.Deserialize<User>(GetFromStream(streamFromOutside));
                        listener.Stop();
                        SuccefullOutput("{0} was connected to you by port {1}", AnotherUser.UserName, AnotherUser.Port);
                        return AnotherUser.Port;
                    }

                    myClient = new TcpClient(Ip, AnotherPort);
                    NetworkStream streamFromInside = myClient.GetStream();
                    data = Encoding.Unicode.GetBytes(JsonSerializer.Serialize<User>(ThisUser));
                    streamFromInside.Write(data, 0, data.Length);
                    streamFromInside.Close();
                    myClient.Close();
                    SuccefullOutput("You ({0}) was succefully connected to port {1}", ThisUser.UserName, AnotherPort);
                    return AnotherPort;
                }
                catch (SocketException)
                {
                    Thread.Sleep(10);
                    Console.WriteLine("Waiting for connection");
                }
            }
        }
    }
}
