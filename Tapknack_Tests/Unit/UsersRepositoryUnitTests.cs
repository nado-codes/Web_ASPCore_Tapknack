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

namespace Tapknack_Tests.Unit
{
    public class UsersRepositoryUnitTests
    {
        private IDbService _mockUserDbService;

        public UsersRepositoryUnitTests()
        {
            _mockUserDbService = new MockDBService<User>();
        }

        [Theory]
        [InlineData("testUser","123")]
        public async void AddUser(string username, string password)
        {
            var userDataContext = new DataContext<User>(_mockUserDbService);
            var userRepo = new UsersRepository(userDataContext);
            var user = await userRepo.AddAsync(new User() { Username = username, Password = password });

            Assert.NotNull(user);
        }
    }
}
