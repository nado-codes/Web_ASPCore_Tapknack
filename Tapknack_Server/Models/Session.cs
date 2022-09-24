using System;
using NadoMapper.Models;

namespace Tapknack_Server.Models
{
    public class Session : ModelBase
    {
        public int UserId { get; set; }
        public Guid Token { get; set; }
        public DateTime Expiry { get; set; }
    }
}
