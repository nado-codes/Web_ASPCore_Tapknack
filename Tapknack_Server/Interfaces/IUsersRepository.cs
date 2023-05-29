using System.Collections.Generic;
using System.Threading.Tasks;
using Tapknack_Server.Models;

namespace Tapknack_Server.Interfaces
{
    public interface IUsersRepository : ITPKRepository<User>
    {
        public Task<User> GetByUsernameAsync(string username)
            => GetSingleAsync("username", username);

        public Task<User> GetByEmailAsync(string email)
            => GetSingleAsync("email", email);

        // .. still need to test this!!
        public Task<IEnumerable<User>> SearchByUsernameEmailAsync(string username, string email);
    }
}
