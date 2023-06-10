using System.Threading.Tasks;
using System;
using Tapknack_Server.Models;

namespace Tapknack_Server.Interfaces
{
    public interface ISessionsRepository
    {
        public Task<Session> GetByUserIdAsync(int userId);

        public Task<Session> GetByTokenAsync(Guid token);

        public Task<Session> GetByAccessTokenAsync(Guid accessToken);
    }
}
