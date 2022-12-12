using System;
using NadoMapper.Models;

namespace Tapknack_Server.Models
{
  public record Session : ModelBase
  {
    public int UserId { get; set; }
    public Guid Token { get; set; }
    public DateTime Expiry { get; set; }
    public Guid AccessToken { get; set; }
    public DateTime AccessExpiry { get; set; }
  }
}
