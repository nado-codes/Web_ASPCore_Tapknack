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
        private UsersRepository _repo = new UsersRepository();

        public Task<IEnumerable<User>> SearchByUsernameEmailAsync(string username, string email)
          => _repo.SearchByUsernameEmailAsync(username, email);

        public async Task<User> AddUserAsync(User user)
        {
            if (user.Password == string.Empty)
                throw new ArgumentException("PASS_NULL");

            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(user.Password);

            var userToAdd = user.Copy<User>();
            userToAdd.Password = hashedPassword;

            var existingUser = await _repo.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            if (user.Email != string.Empty)
            {
                existingUser = await _repo.GetByEmailAsync(user.Email);
                if (existingUser != null)
                    throw new ApplicationException("EMAIL_DUPLICATE");
            }

            return await _repo.AddAsync(userToAdd);
        }

        public Task<long> UpdateUserPasswordAsync(User user)
        {
            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(user.Password);

            return _repo.UpdateAsync(user with { Password = hashedPassword });
        }
    }
}
