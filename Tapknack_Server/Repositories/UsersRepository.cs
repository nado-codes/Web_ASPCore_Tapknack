
using Microsoft.Extensions.Configuration;
using NadoMapper;
using NadoMapper.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tapknack_Server.Models;

namespace Tapknack_Server.Repositories
{
    public class UsersRepository : TPKRepoBase<User>
    {
        public UsersRepository(IDataContext<User> dataContext) : base(dataContext) { }

        public Task<User> GetByUsernameAsync(string username)
            => GetSingleAsync("username", username);

        public Task<User> GetByEmailAsync(string email)
            => GetSingleAsync("email", email);

        public Task<IEnumerable<User>> SearchByUsernameEmailAsync(string username, string email)
            => ExecuteReaderAsync("SearchUserByUsernameEmail", new Dictionary<string, object>{
                {"username",username},
                {"email",email},
            });
    }
}
