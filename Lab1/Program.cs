using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Lab1
{   
    class Program
    {

        private const string Ip = "127.0.0.1";
        static private User ThisUser;
        static private int AnotherPort;

        private static void InitUser()
        {
            Console.WriteLine("Username:");
            ThisUser.UserName = Console.ReadLine();

            Console.WriteLine("My port:");
            ThisUser.Port = int.Parse(Console.ReadLine());
            Console.Clear();
        }

        static void Main(string[] args)
        {
            ThisUser = new User();
            InitUser();
            Console.WriteLine("Enter the port you want to connect to:");
            AnotherPort = int.Parse(Console.ReadLine());
            Connector connector = new Connector(Ip, ThisUser, AnotherPort);
            AnotherPort = connector.Connect();
            Messager messager = new Messager(Ip, ThisUser, AnotherPort);
            Thread.Sleep(1500);
            messager.ChangeMessages();
        }     
    }
}
