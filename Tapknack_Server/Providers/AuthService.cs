using System;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using NadoMapper;
using NadoMapper.Interfaces;
using Tapknack_Server.Interfaces;
using Tapknack_Server.Models;
using Tapknack_Server.Repositories;

namespace Tapknack_Server.Providers
{
    public class AuthService : IAuthService
    {
        private readonly IUsersRepository _usersRepository;

        public AuthService(IUsersRepository usersRepository) {
            _usersRepository = usersRepository;
        }

        public async Task<SigninResponse> SigninAsync(HttpRequest request)
        {
            // .. Probably wanna remove this stuff (try not to copy other projects)
            // .. Or at least, make sure I properly understand what this code actually does rather than just copypasta everything
            var authorization = request.Headers["Authorization"][0];

            // .. Authorization header cannot be empty
            if (authorization == "")
                throw new BadHttpRequestException("AUTH_MISSING");

            var encoded = Convert.FromBase64String(authorization);
            var text = Encoding.ASCII.GetString(encoded);
            var userPass = text.Split(':');

            // .. Authorization parameter must contain a JSON-encoded string in the format: user:password
            if (userPass.Length != 2)
                throw new BadHttpRequestException("AUTH_PARAM_FAIL");

            var userName = userPass[0];
            var password = userPass[1];

            
            var user = await _usersRepository.GetByUsernameAsync(userName);

            if (user == null)
                throw new AuthenticationException("USER_INVALID");

            var passwordProvider = new PasswordProvider();
            var isValid = passwordProvider.Verify(password, user.Password);

            if (!isValid)
                throw new AuthenticationException("PASSWORD_FAIL");

            var sessionsDataContext = new DataContext<Session>();
            var sessionsRepo = new SessionsRepository(sessionsDataContext);

            var session = await sessionsRepo.AddAsync(new Session()
            {
                UserId = user.Id,
                Token = Guid.NewGuid(),
                Expiry = DateTime.UtcNow.AddSeconds(30),
                AccessToken = Guid.NewGuid(),
                AccessExpiry = DateTime.UtcNow.AddSeconds(5)
            });

            if (session == null)
                throw new ApplicationException("SESSION_INVALID");

            return new SigninResponse()
            {
                UserId = user.Id,
                Username = user.Username,
                Token = session.AccessToken,
            };
        }

        public async Task<string> AuthenticateAsync(HttpRequest request)
        {
            var authHeader = request.Headers["Authorization"].ToString();

            if (authHeader == "")
                throw new ApplicationException("Authorization header must be provided");

            var token = authHeader.Split(" ")[1];

            if (token == "undefined")
                throw new ApplicationException("Token cannot be undefined");

            var authToken = Guid.Parse(token);

            return await AuthenticateAsync(authToken);
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
