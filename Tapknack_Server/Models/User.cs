using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NadoMapper.Models;
using Newtonsoft.Json;

namespace Tapknack_Server.Models
{
  public record User : ModelBase
  {
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public T Copy<T>() where T : User
        => JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(this));
  }
}
