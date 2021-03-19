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
    public class Messager
    {
        private int AnotherPort;
        private string Ip;
        private User ThisUser;

        private List<Message> MessageList;

        private void AddMessage(Message message)
        {
            MessageList.Add(message);
            MessageList.Sort((a, b) => a.Date.CompareTo(b.Date));
        }

        private void MessagesFromOut()
        {
            UdpClient client = new UdpClient(ThisUser.Port);
            IPEndPoint remoteIp = null;
            try
            {
                while (true)
                {
                    byte[] data = client.Receive(ref remoteIp);
                    string json = Encoding.Unicode.GetString(data);

                    Message message = JsonSerializer.Deserialize<Message>(json.ToString());

                    AddMessage(message);
                    PrintMessages();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                client.Close();
            }
        }

        private void PrintMessages()
        {
            Console.Clear();
            foreach (Message message in MessageList)
            {
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine(message.UserName);
                Console.ResetColor();
                Console.WriteLine(message.Text);
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine(message.Date.ToString("hh:mm dd.MM.yyyy"));
                Console.ResetColor();
                Console.WriteLine();
            }

            Console.WriteLine("Send message:");
        }

        public Messager(string ip, User thisUser, int anothertPort)
        {
            this.Ip = ip;
            this.ThisUser = thisUser;
            this.AnotherPort = anothertPort;
            this.MessageList = new List<Message>();
        }

        public void ChangeMessages()
        {
            UdpClient client = new UdpClient();
            Thread receiveThread = new Thread(new ThreadStart(MessagesFromOut));
            receiveThread.Start();
            try
            {
                while (true)
                {
                    PrintMessages();

                    string text = Console.ReadLine();

                    Message message = new Message() {
                        UserName = ThisUser.UserName,
                        Text = text,
                        Date = TimeZoneInfo.ConvertTimeToUtc(DateTime.Now)
                    };

                    byte[] data = Encoding.Unicode.GetBytes(JsonSerializer.Serialize<Message>(message));
                    client.Send(data, data.Length, Ip, AnotherPort);

                    AddMessage(message);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            finally
            {
                client.Close();
            }
        }
    }
}
