using Tapknack_Server.Models;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using NadoMapper.Interfaces;
using Tapknack_Server.Interfaces;

namespace Tapknack_Server.Repositories
{
  public class SessionsRepository : TPKRepoBase<Session>, ISessionsRepository
  {
    public SessionsRepository(IDataContext<Session> dataContext) : base(dataContext)
    {
      PropertyConventions.Add(new IgnoreUserIdDuringUpdatePropertyConvention());
    }

    public Task<Session> GetByUserIdAsync(int userId)
        => GetSingleAsync("userid", userId);

    public Task<Session> GetByTokenAsync(Guid token)
        => GetSingleAsync("token", token);

    public Task<Session> GetByAccessTokenAsync(Guid accessToken)
        => GetSingleAsync("accesstoken", accessToken);

  }
}
