using NadoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;
using Tapknack_Server.Repositories;
using Tapknack_Tests.Contexts;

namespace Tapknack_Tests.Utils
{
    public static class TestHelpers
    {
        public static Task<User> CreateTestUser(string username = null, string email = null, string password = null)
        {
            var userDbService = new MockUserDbService();
            var usersDataContext = new DataContext<User>(userDbService);
            var usersRepository = new UsersRepository(usersDataContext);
            var usersProvider = new UserService(usersRepository);

            // .. add a user
            var newUsername = username ?? $"TestUser~{Guid.NewGuid()}";
            var newEmail = email ?? $"TestMail@mail.com~{Guid.NewGuid()}";
            var newPassword = password ?? $"123";

            return usersProvider.AddUserAsync(new User()
            {
                Username = newUsername,
                Email = newEmail,
                Password = newPassword
            });
        }
    }
}
