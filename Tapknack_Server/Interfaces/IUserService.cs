using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Interfaces
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> SearchByUsernameEmailAsync(string username, string email);

        public Task<User> AddUserAsync(User user);

        public Task<long> UpdateUserAsync(User user);

        public Task<long> UpdateUserPasswordAsync(User user);
    }
}
