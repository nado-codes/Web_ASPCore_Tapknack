using System;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Providers
{
  public class SigninProvider
  {
    public async Task<SigninResponse> SigninAsync(HttpRequest request)
    {
      // .. Probably wanna remove this stuff (try not to copy other projects)
      // .. Or at least, make sure I properly understand what this code actually does rather than just copypasta everything
      var authorization = request.Headers["Authorization"][0];

      // .. Authorization header cannot be empty
      if (authorization == "")
        throw new BadHttpRequestException("AUTH_MISSING");

      var encoded = Convert.FromBase64String(authorization);
      var text = Encoding.ASCII.GetString(encoded);
      var userPass = text.Split(':');

      // .. Authorization parameter must contain a JSON-encoded string in the format: user:password
      if (userPass.Length != 2)
        throw new BadHttpRequestException("AUTH_PARAM_FAIL");

      var userName = userPass[0];
      var password = userPass[1];

      var usersRepo = new UsersRepository();
      var user = await usersRepo.GetByUsernameAsync(userName);

      if (user == null)
        throw new AuthenticationException("USER_INVALID");

      var passwordProvider = new PasswordProvider();
      var isValid = passwordProvider.Verify(password, user.Password);

      if (!isValid)
        throw new AuthenticationException("PASSWORD_FAIL");

      var sessionsRepo = new SessionsRepository();
      var session = await sessionsRepo.AddAsync(new Session()
      {
        UserId = user.Id,
        Token = Guid.NewGuid(),
        Expiry = DateTime.UtcNow.AddSeconds(30),
        AccessToken = Guid.NewGuid(),
        AccessExpiry = DateTime.UtcNow.AddSeconds(5)
      });

      if (session == null)
        throw new ApplicationException("SESSION_INVALID");

      return new SigninResponse()
      {
        UserId = user.Id,
        Token = session.AccessToken,
      };
    }
  }
}
