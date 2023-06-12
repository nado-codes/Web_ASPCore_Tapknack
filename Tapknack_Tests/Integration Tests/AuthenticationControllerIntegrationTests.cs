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
using System.Net.Http.Headers;
using System.Text;

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
            var username = $"TestUser~{Guid.NewGuid()}";
            var email = $"TestMail@mail.com~{Guid.NewGuid()}";
            var password = "123";
            var testUser = await TestHelpers.CreateTestUser(username,email,password);

            var authString = $"{username}:{password}";
            var auth64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(authString));
            var authHeaderValue = new AuthenticationHeaderValue("Bearer", auth64);

            _client.DefaultRequestHeaders.Authorization = authHeaderValue;
            //var signinResponse = await _client.PostAsync("api/authentication",null);
            var resp = await _client.GetAsync("api/authentication/test");
        }
    }
}
