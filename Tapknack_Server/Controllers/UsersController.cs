using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Controllers
{
    [Authorize]
    [Route("api/users")]
    public class UsersController : CRUDApiController<User,UsersRepository>
    {
        [HttpPost]
        [AllowAnonymous]
        public override async Task<User> AddAsync([FromBody] User user)
        {
            try
            {
                // .. remove the password from the new user for security reasons
                var newUser = await base.AddAsync(user);
                newUser.Password = "";

                return newUser;
            }
            catch (Exception e)
            {
                throw;
            }
            
        }
    }
}
