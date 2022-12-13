using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;
using Tapknack_Server.Providers;

namespace Tapknack_Server.Controllers
{
  [Authorize]
  [Route("api/users")]
  public class UsersController : CRUDApiController<User, UsersRepository>
  {
    [HttpPost]
    [AllowAnonymous]
    public override async Task<User> AddAsync([FromBody] User user)
    {
      // .. remove the password from the new user for security reasons
      var usersProv = new UsersProvider();
      var newUser = await usersProv.AddUserAsync(user) with { Password = "" };
      return newUser;
    }

    [HttpGet("/username/{username}")]
    public Task<User> GetByUsernameAsync(string username)
        => _Repo.GetByUsernameAsync(username);

    [HttpGet("/email/{email}")]
    public Task<User> GetByEmailAsync(string email)
        => _Repo.GetByEmailAsync(email);

    // .. still need to test this!!
    [HttpGet("/search")]
    public Task<IEnumerable<User>> SearchByUsernameEmailAsync([FromBody] UserSearchQuery query)
    {
      var usersProv = new UsersProvider();
      return usersProv.SearchByUsernameEmailAsync(query.Username, query.Email);
    }
  }
}
