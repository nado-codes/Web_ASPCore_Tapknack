
using System.Threading.Tasks;
using Tapknack_Server.Models;

namespace Tapknack_Server.Repositories
{
    public class UsersRepository : TPKRepoBase<User>
    {
        public Task<User> GetByUsernameAsync(string username)
            => GetSingleAsync("username", username);
    }
}
