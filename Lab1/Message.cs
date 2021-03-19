using System;
using System.Collections.Generic;
using System.Text;

namespace Lab1
{
    public class Message
    {
        public Message() { }
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}
