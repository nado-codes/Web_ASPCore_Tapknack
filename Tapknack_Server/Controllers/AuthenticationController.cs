using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Tapknack_Server.Interfaces;
using Tapknack_Server.Models;
using Tapknack_Server.Providers;

namespace Tapknack_Server.Controllers
{
  [Route("api/authentication")]
  public class AuthenticationController : ControllerBase
  {
        private readonly IAuthService _authService;
        public AuthenticationController(IAuthService authService)
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

        [HttpGet]
        public async Task<object> AuthenticateAsync()
        {
            try
            {
                var authHeader = Request.Headers["Authorization"].ToString();

                if (authHeader == "")
                    throw new ApplicationException("Authorization header must be provided");

                var token = authHeader.Split(" ")[1];

                if (token == "undefined")
                    throw new ApplicationException("Token cannot be undefined");

                var authToken = Guid.Parse(token);

                var newToken = await _authService.AuthenticateAsync(authToken);
                return new { Token = newToken };
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }
        }
    }
}