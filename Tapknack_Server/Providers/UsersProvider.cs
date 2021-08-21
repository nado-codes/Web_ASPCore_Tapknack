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
        public async Task<User> GetByUsernameAsync(string username)
        {
            var usersRepo = new UsersRepository();
            return await usersRepo.GetByUsernameAsync(username);
        }

        public async Task<User> AddUserAsync(User user, string password)
        {
            var passwordProv = new PasswordProvider();
            var hashedPassword = passwordProv.Encrypt(password);

            var userToAdd = user.Copy<User>();
            userToAdd.Password = hashedPassword;

            var usersRepo = new UsersRepository();
            var newUser = await usersRepo.AddAsync(userToAdd);

            if(newUser == null) throw new ApplicationException("Expected a user to be created, got null");

            return newUser;
        }
    }
}
