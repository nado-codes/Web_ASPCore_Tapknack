using Microsoft.AspNetCore.Http;
using NadoMapper;
using NadoMapper.SqlProvider;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;

using Tapknack_Tests.Utils;
using Xunit;

namespace Tapknack_Tests.Integration_Tests
{
    public class AuthenticationControllerIntegrationTests
    {
        private readonly HttpClient _client;

        public AuthenticationControllerIntegrationTests()
        {
            /*var mockDbService = new MockDBService<User>();
            var usersDataContext = new DataContext<User>(mockDbService);
            _usersRepository = new UsersRepository(usersDataContext);
            var authService = new AuthService(_usersRepository);
            _authController = new AuthenticationController(authService);*/
            var server = new TestServer(new WebHostBuilder().UseStartup<Tapknack_Server.Startup>());
            _client = server.CreateClient();
        }

        [Theory]
        [InlineData()]
        public async void CreateUserAndSignin()
        {
            var testUser = await TestHelpers.CreateTestUser();

            // var content = new Content
            // var signinResponse = await _client.PostAsync("/api/authentication",)
        }
    }
}
