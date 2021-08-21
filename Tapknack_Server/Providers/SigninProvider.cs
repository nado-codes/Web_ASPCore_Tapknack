using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Tapknack_Server.Models;

namespace Tapknack_Server.Providers
{
    public class SigninProvider
    {
        public async Task<SigninResponse> SigninAsync(HttpRequestMessage request)
        {
            var authorization = request.Headers.Authorization;

            if(authorization == null)
                throw new BadHttpRequestException("Authorization header cannot be empty");

            // var scheme = authorization.Scheme;
            var parameter = authorization.Parameter;

            if(string.IsNullOrEmpty(parameter))
                throw new BadHttpRequestException("Authorization parameter cannot be empty");

            var encoded = Convert.FromBase64String(parameter);
            var text = Encoding.ASCII.GetString(encoded);
            var userPass = text.Split(':');
            
            if(userPass.Length != 2)
                throw new BadHttpRequestException("Authorization parameter must contain a JSON-encoded string in the format: user:password");

            var userName = userPass[0];
            var password = userPass[1];

            var usersProvider = new UsersProvider();
            var user = await usersProvider.GetByUsernameAsync(userName);

            if(user == null) 
                throw new AuthenticationException($"User {userName} does not exist");

            var passwordProvider = new PasswordProvider();
            var isValid = passwordProvider.Verify(password, user.Password);

            if(!isValid)
                throw new AuthenticationException("Passwords do not match");

            return new SigninResponse()
            {
                UserId = user.Id
            };
        }
    }
}
