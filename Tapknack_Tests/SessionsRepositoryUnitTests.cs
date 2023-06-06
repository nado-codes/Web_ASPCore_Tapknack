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
using Tapknack_Tests.Utils;
using Xunit;

namespace Tapknack_Tests
{
    public class SessionsRepositoryUnitTests
    {
        private readonly SessionsRepository _sessionsRepository;

        public SessionsRepositoryUnitTests()
        {
            var sessionDbService = new MockSessionDbService();
            var sessionsDataContext = new DataContext<Session>(sessionDbService);
            _sessionsRepository = new SessionsRepository(sessionsDataContext);
        }

        [Fact]
        public async void GetByUserId()
        {
            var testUser = await TestHelpers.CreateTestUser();

            var token = Guid.NewGuid();
            var accessToken = Guid.NewGuid();
            var expiry = DateTime.UtcNow;
            var accessExpiry = DateTime.UtcNow;

            var session = await _sessionsRepository.AddAsync(new Session()
            {
                UserId = testUser.Id,
                Token = token,
                Expiry = expiry,
                AccessToken = accessToken,
                AccessExpiry = accessExpiry
            });

            var sessionByUserId = await _sessionsRepository.GetByUserIdAsync(testUser.Id);
            Assert.NotNull(sessionByUserId);
            Assert.Equal(testUser.Id, sessionByUserId.UserId);
            Assert.Equal(session.Id, sessionByUserId.Id);
        }

        [Fact]
        public async void GetByToken()
        {
            var token = Guid.NewGuid();
            var accessToken = Guid.NewGuid();
            var expiry = DateTime.UtcNow;
            var accessExpiry = DateTime.UtcNow;

            var session = await _sessionsRepository.AddAsync(new Session()
            {
                UserId = -1,
                Token = token,
                Expiry = expiry,
                AccessToken = accessToken,
                AccessExpiry = accessExpiry
            });

            var sessionByToken = await _sessionsRepository.GetByTokenAsync(token);
            Assert.NotNull(sessionByToken);
            Assert.Equal(token, sessionByToken.Token);
            Assert.Equal(session.Id, sessionByToken.Id);
        }

        [Fact]
        public async void GetByAccessToken()
        {
            var token = Guid.NewGuid();
            var accessToken = Guid.NewGuid();
            var expiry = DateTime.UtcNow;
            var accessExpiry = DateTime.UtcNow;

            var session = await _sessionsRepository.AddAsync(new Session()
            {
                UserId = -1,
                Token = token,
                Expiry = expiry,
                AccessToken = accessToken,
                AccessExpiry = accessExpiry
            });

            var sessionByAccessToken = await _sessionsRepository.GetByAccessTokenAsync(accessToken);
            Assert.NotNull(sessionByAccessToken);
            Assert.Equal(accessToken, sessionByAccessToken.AccessToken);
            Assert.Equal(session.Id, sessionByAccessToken.Id);
        }

        [Fact]
        public async void UpdateAccessToken()
        {
            var token = Guid.NewGuid();
            var accessToken = Guid.NewGuid();
            var expiry = DateTime.UtcNow;
            var accessExpiry = DateTime.UtcNow;

            var session = await _sessionsRepository.AddAsync(new Session()
            {
                UserId = -1,
                Token = token,
                Expiry = expiry,
                AccessToken = accessToken,
                AccessExpiry = accessExpiry
            });

            var accessTokenNew = Guid.NewGuid();
            var accessExpiryNew = DateTime.UtcNow.AddSeconds(1);
            var updatedSessionCount = await _sessionsRepository.UpdateAsync(session with
            {
                AccessToken = accessTokenNew,
                AccessExpiry = accessExpiryNew
            });

            Assert.Equal(1, updatedSessionCount);

            var updatedAccessTokenSession = await _sessionsRepository.GetSingleAsync(session.Id);
            Assert.NotNull(updatedAccessTokenSession);
            Assert.Equal(accessTokenNew, updatedAccessTokenSession.AccessToken);
            Assert.Equal(accessExpiryNew, updatedAccessTokenSession.AccessExpiry);
        }
    }
}
