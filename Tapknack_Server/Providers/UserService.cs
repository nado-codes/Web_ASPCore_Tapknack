using NadoMapper;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tapknack_Server.Interfaces;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Providers
{
    public class UserService : IUserService
    {
        private readonly IUsersRepository _usersRepository;

        public UserService(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        public Task<IEnumerable<User>> SearchByUsernameEmailAsync(string username, string email)
          => _usersRepository.SearchByUsernameEmailAsync(username, email);

        public async Task<User> AddUserAsync(User user)
        {
            if (user.Password == string.Empty)
                throw new ArgumentException("PASS_NULL");

            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(user.Password);

            var existingUser = await _usersRepository.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            if (user.Email != string.Empty)
            {
                existingUser = await _usersRepository.GetByEmailAsync(user.Email);
                if (existingUser != null)
                    throw new ApplicationException("EMAIL_DUPLICATE");
            }

            return await _usersRepository.AddAsync(user with
            {
                Password = hashedPassword
            });
        }

        public async Task<long> UpdateUserAsync(User user)
        {
            var existingUser = await _usersRepository.GetByUsernameAsync(user.Username);
            if (existingUser != null)
                throw new ApplicationException("USERNAME_DUPLICATE");

            if (user.Email != string.Empty)
            {
                existingUser = await _usersRepository.GetByEmailAsync(user.Email);
                if (existingUser != null)
                    throw new ApplicationException("EMAIL_DUPLICATE");
            }

            return await _usersRepository.UpdateAsync(user);
        }

        public Task<long> UpdateUserPasswordAsync(User user)
        {
            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(user.Password);

            return _usersRepository.UpdateAsync(user with { Password = hashedPassword });
        }
    }
}
