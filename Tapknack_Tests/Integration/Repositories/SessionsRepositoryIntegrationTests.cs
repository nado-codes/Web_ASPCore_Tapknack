using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;
using Tapknack_Server.Repositories;
using Xunit;

namespace Tapknack_Tests.Integration.Repositories
{
    public class SessionsRepositoryIntegrationTests
    {
        [Fact]
        public async Task IntegrationTest()
        {
            var testUser = TestHelpers.CreateTestUser();
            var sessionsRepo = new SessionsRepository();

            var session = await sessionsRepo.AddAsync(new Session()
            {
                UserId = testUser.Id,
                Token = Guid.NewGuid(),
                Expiry = DateTime.UtcNow,
            });

            Assert.NotNull(session);

            var getSessionById = await sessionsRepo.GetSingleAsync(session.Id);
            Assert.NotNull(getSessionById);
            Assert.Equal(session.Id, getSessionById.Id);

            var getSessionByUserId = await sessionsRepo.GetByUserIdAsync(testUser.Id);
            Assert.NotNull(getSessionByUserId);
            Assert.Equal(testUser.Id, getSessionByUserId.UserId);
        }
    }
}
