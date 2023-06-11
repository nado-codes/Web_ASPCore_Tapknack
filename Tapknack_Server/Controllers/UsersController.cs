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
        private readonly IUserService _userService;

        public UsersController(IUserService userService, IUsersRepository usersRepository, IAuthService authService) : base(usersRepository,authService) {
            _userService = userService;
        }

        [HttpPost]
        public override async Task<User> AddAsync([FromBody] User user)
        {
            var newUser = await _userService.AddUserAsync(user) with { Password = "" };
            return newUser;
        }

        [HttpGet("username/{username}")]
        public async Task<User> GetByUsernameAsync(string username)
        {
            var user = await _repository.GetByUsernameAsync(username);

            if (user == null)
                throw new ApplicationException("USER_INVALID");

            return user with { Password = string.Empty };
        }

        [HttpGet("/email/{email}")]
        public Task<User> GetByEmailAsync(string email)
            => _repository.GetByEmailAsync(email);

        // .. still need to test this!!
        [HttpGet("/search")]
        public Task<IEnumerable<User>> SearchByUsernameEmailAsync([FromBody] UserSearchQuery query)
        {
            return _userService.SearchByUsernameEmailAsync(query.Username, query.Email);
        }

        [HttpPut("/username")]
        public async Task<long> UpdateUserUsernameAsync([FromBody] User user)
        {
            var existingUser = await _repository.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            return await _repository.UpdateAsync(user);
        }

        [HttpPut("/password")]
        public Task<long> UpdateUserPasswordAsync([FromBody] User user)
        {
            return _userService.UpdateUserPasswordAsync(user);
        }
    }
}
