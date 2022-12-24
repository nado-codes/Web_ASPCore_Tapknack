using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;
using Tapknack_Server.Providers;

namespace Tapknack_Server.Controllers
{
  [Route("api/signin")]
  public class SigninController : ControllerBase
  {
    [HttpPost]
    [AllowAnonymous]
    public async Task<SigninResponse> SigninAsync()
    {
      try
      {
        // .. remove the password from the new user for security reasons
        var signinProv = new SigninProvider();
        var response = await signinProv.SigninAsync(HttpContext.Request);

        return response;
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        throw;
      }
    }
  }
}
