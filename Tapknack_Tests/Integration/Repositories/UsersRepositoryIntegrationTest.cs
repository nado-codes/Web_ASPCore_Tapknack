using System;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;
using Tapknack_Server.Repositories;
using Xunit;

namespace Tapknack_Tests.Integration.Repositories
{
  public class UsersRepositoryIntegrationTest
  {
    [Fact]
    public async Task IntegrationTest()
    {
      var usersRepo = new UsersRepository();
      var usersProv = new UsersProvider();

      // .. add a user
      var newUsername = $"UsersRepositoryIntegration~{Guid.NewGuid().ToString().Substring(0, 32)}";
      var newEmail = $"UsersRepositoryIntegration~{Guid.NewGuid().ToString().Substring(0, 32)}";
      var newPassword = $"123";

      var newUser = await usersProv.AddUserAsync(new User()
      {
        Username = newUsername,
        Email = newEmail,
        Password = newPassword
      });

      Assert.NotNull(newUser);
      Assert.Equal(newUsername.ToLower(), newUser.Username);
      Assert.Equal(newEmail.ToLower(), newUser.Email);

      // .. try to use the same username and email twice
      // .. we expect a "USER_DUPLICATE" error message
      var dupeUsername = await Assert.ThrowsAsync<ApplicationException>(() => usersProv.AddUserAsync(newUser));
      Assert.Equal("USERNAME_DUPLICATE", dupeUsername.Message);

      var dupeEmail = await Assert.ThrowsAsync<ApplicationException>(() => usersProv.AddUserAsync(newUser with { Username = newUser.Username + "_" }));
      Assert.Equal("EMAIL_DUPLICATE", dupeEmail.Message);

      // .. verify that the password is valid & can be used for login using BCrypt
      var validPassword = BCrypt.Net.BCrypt.EnhancedVerify(newPassword, newUser.Password);
      Assert.True(validPassword);

      // .. get by id
      var getUserById = await usersRepo.GetSingleAsync(newUser.Id);

      Assert.NotNull(getUserById);
      Assert.Equal(newUser.Id, getUserById.Id);
      Assert.Equal(newUsername.ToLower(), getUserById.Username);
      Assert.Equal(newEmail.ToLower(), getUserById.Email);

      // .. get by username
      var getUserByUsername = await usersRepo.GetByUsernameAsync(newUsername);

      Assert.NotNull(getUserByUsername);
      Assert.Equal(newUser.Id, getUserByUsername.Id);
      Assert.Equal(newUsername.ToLower(), getUserByUsername.Username);
      Assert.Equal(newEmail.ToLower(), getUserByUsername.Email);

      // .. update user
      newUsername = $"UsersRepositoryIntegration~{Guid.NewGuid().ToString().Substring(0, 32)}";
      newEmail = $"UsersRepositoryIntegration~{Guid.NewGuid().ToString().Substring(0, 32)}";
      var rowsUpdated = await usersProv.UpdateUserAsync(getUserByUsername with { Username = newUsername, Email = newEmail });
      var updatedUser = await usersRepo.GetSingleAsync(getUserByUsername.Id);

      Assert.NotEqual(0, rowsUpdated);
      Assert.Equal(newUsername.ToLower(), updatedUser.Username);
      Assert.Equal(newEmail.ToLower(), updatedUser.Email);
      // .. finally, cleanup!

      // TODO: Add cleanup code here later
    }
  }
}
