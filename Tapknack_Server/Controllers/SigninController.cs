using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;
using Tapknack_Server.Providers;
using Microsoft.Extensions.Configuration;
using Tapknack_Server.Interfaces;

namespace Tapknack_Server.Controllers
{
  [Route("api/signin")]
  public class SigninController : ControllerBase
  {
        private readonly IAuthService _authService;
        public SigninController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<SigninResponse> SigninAsync()
        {
            try
            {
                var response = await _authService.SigninAsync(HttpContext.Request);
                return response;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

    }
}
