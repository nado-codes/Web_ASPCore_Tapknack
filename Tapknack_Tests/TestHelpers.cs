using NadoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;
using Tapknack_Server.Repositories;

namespace Tapknack_Tests
{
    public static class TestHelpers
    {
        public static Task<User> CreateTestUser()
        {
            var usersDataContext = new DataContext<User>();
            var usersProvider = new UsersProvider(usersDataContext);

            // .. add a user
            var newUsername = $"TestUser~{Guid.NewGuid()}";
            var newEmail = $"TestMail@mail.com~{Guid.NewGuid()}";
            var newPassword = $"123";

            return usersProvider.AddUserAsync(new User()
            {
                Username = newUsername,
                Email = newEmail,
                Password = newPassword
            });
        }
    }
}
