using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Providers
{
  public class AuthenticationProvider
  {
    public async Task AuthenticateAsync(Guid authToken)
    {
      var sessionsRepo = new SessionsRepository();
      var session = await sessionsRepo.GetByTokenAsync(authToken);

      if (session == null)
        throw new AuthenticationException("SESSION_INVALID");

      if (session.Expiry < DateTime.UtcNow)
        throw new AuthenticationException("SESSION_EXPIRED");
    }
  }
}