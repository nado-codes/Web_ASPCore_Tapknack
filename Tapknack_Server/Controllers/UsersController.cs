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
    [Route("api/users")]
    public class UsersController : CRUDApiController<User, UsersRepository>
    {
        [HttpPost]
        public override async Task<User> AddAsync([FromBody] User user)
        {
            // .. remove the password from the new user for security reasons
            var usersProv = new UsersProvider();
            var newUser = await usersProv.AddUserAsync(user) with { Password = "" };
            return newUser;
        }

        [HttpGet("username/{username}")]
        public async Task<User> GetByUsernameAsync(string username)
        {
            var user = await _Repo.GetByUsernameAsync(username);

            if (user == null)
                throw new ApplicationException("USER_INVALID");

            return user with { Password = string.Empty };
        }

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

        [HttpPut("/username")]
        public async Task<long> UpdateUserUsernameAsync([FromBody] User user)
        {
            var existingUser = await _Repo.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            return await _Repo.UpdateAsync(user);
        }

        [HttpPut("/password")]
        public Task<long> UpdateUserPasswordAsync([FromBody] User user)
        {
            var usersProv = new UsersProvider();
            return usersProv.UpdateUserPasswordAsync(user);
        }
    }
}
