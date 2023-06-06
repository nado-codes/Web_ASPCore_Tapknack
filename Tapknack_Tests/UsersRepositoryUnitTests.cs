using NadoMapper;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;
using Tapknack_Tests.Contexts;
using Xunit;

namespace Tapknack_Tests
{
    public class UsersRepositoryUnitTests
    {
        private IDbService _mockUserDbService;

        public UsersRepositoryUnitTests()
        {
            _mockUserDbService = new MockUserDbService();
        }

        [Theory]
        [InlineData("testUser", "123")]
        public async void AddUser(string username, string password)
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = username, Password = password });

            Assert.NotNull(user);
            Assert.Equal(username, user.Username);
            Assert.Equal(password, user.Password);
        }

        [Theory]
        [InlineData("testUser", "123")]
        public async void GetUserById(string username, string password)
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = username, Password = password });

            var getUserById = await userRepo.GetSingleAsync(user.Id);

            Assert.NotNull(getUserById);
            Assert.Equal(username, getUserById.Username);
            Assert.Equal(password, getUserById.Password);
            Assert.Equal(user.LastModified, getUserById.LastModified);
        }

        [Theory]
        [InlineData("testUser", "123")]
        public async void GetUserByUsername(string username, string password)
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = username, Password = password });

            var getUserByUsername = await userRepo.GetByUsernameAsync(user.Username);

            Assert.NotNull(getUserByUsername);
            Assert.Equal(username, getUserByUsername.Username);
            Assert.Equal(password, getUserByUsername.Password);
            Assert.Equal(user.LastModified, getUserByUsername.LastModified);
        }

        [Theory]
        [InlineData("testUser", "testUser@mail.com", "123")]
        public async void GetUserByEmail(string username, string email, string password)
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = username, Email = email, Password = password });

            var getUserByEmail = await userRepo.GetByEmailAsync(user.Email);

            Assert.NotNull(getUserByEmail);
            Assert.Equal(username, getUserByEmail.Username);
            Assert.Equal(email, getUserByEmail.Email);
            Assert.Equal(password, getUserByEmail.Password);
            Assert.Equal(user.LastModified, getUserByEmail.LastModified);
        }

        [Theory]
        [InlineData("testUser", "123", "updatedUser", "321")]
        public async void UpdateUser(string username, string password, string updatedUsername, string updatedPassword)
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = username, Password = password });

            user.Username = updatedUsername;
            user.Password = updatedPassword;
            var rowsUpdated = await userRepo.UpdateAsync(user);

            Assert.Equal(1, rowsUpdated);
            var updatedUser = await userRepo.GetSingleAsync(user.Id);

            Assert.NotNull(updatedUser);
            Assert.Equal(updatedUsername, updatedUser.Username);
            Assert.Equal(updatedPassword, updatedUser.Password);
        }

        [Fact]
        public async void UpdateUserWithWrongLastModified_ExpectApplicationException()
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = "user123", Password = "123" });

            user.LastModified = Encoding.UTF8.GetBytes("OopsieDaisie");

            await Assert.ThrowsAsync<ApplicationException>(async () => await userRepo.UpdateAsync(user));
        }

        [Theory]
        [InlineData("testUser", "123")]
        public async void DeleteUser(string username, string password)
        {
            var mockUserDbService = new MockUserDbService();
            var userDataContext = new DataContext<User>(mockUserDbService);
            var usersRepository = new UsersRepository(userDataContext);

            var newUser = await usersRepository.AddAsync(new User() { Username = username, Password = password });

            var getUserById = await usersRepository.GetSingleAsync(1);

            var updatedRows = await usersRepository.DeleteAsync(getUserById);

            Assert.Equal(1, updatedRows);

            var tryGetDeletedUser = await usersRepository.GetSingleAsync(newUser.Id);
            Assert.Null(tryGetDeletedUser);
        }
    }
}
