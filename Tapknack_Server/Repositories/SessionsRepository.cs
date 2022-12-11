using NadoMapper;
using Tapknack_Server.Models;
using System.Threading.Tasks;
using System;

namespace Tapknack_Server.Repositories
{
  public class SessionsRepository : TPKRepoBase<Session>
  {
    public Task<Session> GetByUserIdAsync(int userId)
        => GetSingleAsync("userid", userId);

    public Task<Session> GetByTokenAsync(Guid token)
        => GetSingleAsync("token", token);

    public Task<Session> GetByAccessTokenAsync(Guid accessToken)
        => GetSingleAsync("accesstoken", accessToken);
  }
}
