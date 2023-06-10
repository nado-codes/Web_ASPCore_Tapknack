using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Tapknack_Server.Models;

namespace Tapknack_Server.Interfaces
{
    public interface IAuthService
    {
        public Task<SigninResponse> SigninAsync(HttpRequest request);
    }
}
