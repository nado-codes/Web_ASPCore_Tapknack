using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NadoMapper;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Providers
{
    public class AuthenticationProvider
    {
        public async Task<string> AuthenticateAsync(HttpRequest request)
        {
            var authHeader = request.Headers["Authorization"].ToString();

            if (authHeader == "")
                throw new ApplicationException("Authorization header must be provided");

            var token = authHeader.Split(" ")[1];

            if (token == "undefined")
                throw new ApplicationException("Token cannot be undefined");

            var authToken = Guid.Parse(token);

            var authProv = new AuthenticationProvider();
            return await authProv.AuthenticateAsync(authToken);
        }

        public async Task<string> AuthenticateAsync(Guid accessToken)
        {
            var sessionsDataContext = new DataContext<Session>();
            var sessionsRepo = new SessionsRepository(sessionsDataContext);
            var session = await sessionsRepo.GetByAccessTokenAsync(accessToken);

            if (session == null)
                throw new AuthenticationException("SESSION_INVALID");

            if (session.Expiry < DateTime.UtcNow)
                throw new AuthenticationException("SESSION_EXPIRED");

            if (session.AccessExpiry < DateTime.UtcNow)
            {
                // .. generate and return new access token
                var newAccess = Guid.NewGuid();
                await sessionsRepo.UpdateAsync(session with { AccessToken = newAccess, AccessExpiry = DateTime.UtcNow.AddSeconds(5) });
            }

            var updatedSession = await sessionsRepo.GetSingleAsync(session.Id);
            return updatedSession.AccessToken.ToString();
        }
    }

}