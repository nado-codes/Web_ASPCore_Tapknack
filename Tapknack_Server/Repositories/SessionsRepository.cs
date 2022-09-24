using NadoMapper;
using Tapknack_Server.Models;
using System.Threading.Tasks;

namespace Tapknack_Server.Repositories
{
    public class SessionsRepository : TPKRepoBase<Session>
    {
        public Task<Session> GetByUserIdAsync(int userId)
            => GetSingleAsync("userid", userId);
    }
}
