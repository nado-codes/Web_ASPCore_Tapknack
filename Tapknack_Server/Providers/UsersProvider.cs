using NadoMapper;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Providers
{
    public class UsersProvider
    {
        private UsersRepository _repo;

        public UsersProvider(IDataContext<User> dataContext)
        {
            _repo = new UsersRepository(dataContext);
        }

        public Task<IEnumerable<User>> SearchByUsernameEmailAsync(string username, string email)
          => _repo.SearchByUsernameEmailAsync(username, email);

        public async Task<User> AddUserAsync(User user)
        {
            if (user.Password == string.Empty)
                throw new ArgumentException("PASS_NULL");

            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(user.Password);

            var existingUser = await _repo.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            if (user.Email != string.Empty)
            {
                existingUser = await _repo.GetByEmailAsync(user.Email);
                if (existingUser != null)
                    throw new ApplicationException("EMAIL_DUPLICATE");
            }

            return await _repo.AddAsync(user with
            {
                Password = hashedPassword
            });
        }

        public async Task<long> UpdateUserAsync(User user)
        {
            var existingUser = await _repo.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            if (user.Email != string.Empty)
            {
                existingUser = await _repo.GetByEmailAsync(user.Email);
                if (existingUser != null)
                    throw new ApplicationException("EMAIL_DUPLICATE");
            }

            return await _repo.UpdateAsync(user with
            {
                Username = user.Username.ToLower(),
                Email = user.Email.ToLower()
            });
        }

        public Task<long> UpdateUserPasswordAsync(User user)
        {
            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(user.Password);

            return _repo.UpdateAsync(user with { Password = hashedPassword });
        }
    }
}
