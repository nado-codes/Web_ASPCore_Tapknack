using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tapknack_Server.Models
{
    public class SigninResponse
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public Guid Token { get; set; }
    }
}
