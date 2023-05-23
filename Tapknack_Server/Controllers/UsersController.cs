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
using NadoMapper.Interfaces;
using Tapknack_Server.Interfaces;
using NadoMapper;

namespace Tapknack_Server.Controllers
{
    [Route("api/users")]
    public class UsersController : CRUDApiController<User,IUsersRepository>
    {
        private readonly UsersProvider _usersProv;

        public UsersController(IUsersRepository repo) : base(repo) {
            var usersDataContext = new DataContext<User>();
            _usersProv = new UsersProvider(usersDataContext);
        }

        [HttpPost]
        public override async Task<User> AddAsync([FromBody] User user)
        {
            // .. remove the password from the new user for security reasons
            var usersDataContext = new DataContext<User>();
            var usersProv = new UsersProvider(usersDataContext);
            var newUser = await usersProv.AddUserAsync(user) with { Password = "" };
            return newUser;
        }

        [HttpGet("username/{username}")]
        public async Task<User> GetByUsernameAsync(string username)
        {
            var user = await _repo.GetByUsernameAsync(username);

            if (user == null)
                throw new ApplicationException("USER_INVALID");

            return user with { Password = string.Empty };
        }

        [HttpGet("/email/{email}")]
        public Task<User> GetByEmailAsync(string email)
            => _repo.GetByEmailAsync(email);

        // .. still need to test this!!
        [HttpGet("/search")]
        public Task<IEnumerable<User>> SearchByUsernameEmailAsync([FromBody] UserSearchQuery query)
        {
            return _usersProv.SearchByUsernameEmailAsync(query.Username, query.Email);
        }

        [HttpPut("/username")]
        public async Task<long> UpdateUserUsernameAsync([FromBody] User user)
        {
            var existingUser = await _repo.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            return await _repo.UpdateAsync(user);
        }

        [HttpPut("/password")]
        public Task<long> UpdateUserPasswordAsync([FromBody] User user)
        {
            return _usersProv.UpdateUserPasswordAsync(user);
        }
    }
}
