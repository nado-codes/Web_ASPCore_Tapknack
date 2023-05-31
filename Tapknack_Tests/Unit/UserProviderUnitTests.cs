using BCrypt.Net;
using NadoMapper;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;
using Tapknack_Server.Repositories;
using Tapknack_Tests.Contexts;
using Xunit;

namespace Tapknack_Tests.Unit
{
    public class UserProviderUnitTests
    {
        private UsersProvider _usersProvider;
        private DataContext<User> _userDataContext;

        public UserProviderUnitTests()
        {
            var mockUserDbService = new MockUserDbService();
            _userDataContext = new DataContext<User>(mockUserDbService);
            _usersProvider = new UsersProvider(_userDataContext);
        }

        [Theory]
        [InlineData("testUser","test@mail.com","123")]
        public async void AddUser(string username, string email, string password)
        {
            var user = await _usersProvider.AddUserAsync(new User()
            {
                Username = username,
                Email = email,
                Password = password
            });

            Assert.NotNull(user);
            Assert.Equal(username, user.Username);
            Assert.Equal(email, user.Email);

            var passwordProvider = new PasswordProvider();
            var passwordEncrypted = passwordProvider.Encrypt(password);
            Assert.Equal(passwordEncrypted, user.Password);
        }

        [Theory]
        [InlineData("updatedUser", "updatedTest@mail.com", "321")]
        public async void UpdateUser(string updatedUsername, string updatedEmail, string updatedPassword)
        {
            var user = await _usersProvider.AddUserAsync(new User()
            {
                Username = "testUser",
                Email = "test@mail.com",
                Password = "123"
            });

            var rowsUpdated = await _usersProvider.UpdateUserAsync(new User()
            {
                Id = user.Id,
                Username = updatedUsername,
                Email = updatedEmail,
                Password = updatedPassword
            });

            Assert.Equal(1, rowsUpdated);

            var userRepo = new UsersRepository(_userDataContext);
            var updatedUser = await userRepo.GetSingleAsync(user.Id);

            Assert.NotNull(updatedUser);
            Assert.Equal(updatedUsername, updatedUser.Username);
            Assert.Equal(updatedEmail, updatedUser.Email);
            Assert.Equal(updatedPassword, updatedUser.Password);
        }
    }
}
