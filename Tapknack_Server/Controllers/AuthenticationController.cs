using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tapknack_Server.Providers;

namespace Tapknack_Server.Controllers
{
  [Route("api/authentication")]
  public class AuthenticationController : ControllerBase
  {
    [HttpGet]
    public async Task AuthenticateAsync()
    {
      try
      {
        var authHeader = Request.Headers["Authorization"].ToString();
        var authToken = Guid.Parse(authHeader.Split(" ")[1]);

        var authProv = new AuthenticationProvider();
        await authProv.AuthenticateAsync(authToken);

        // return Task.CompletedTask;
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        throw;
      }
    }
  }
}