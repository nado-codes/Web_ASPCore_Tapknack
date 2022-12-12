using Tapknack_Server.Models;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace Tapknack_Server.Repositories
{
  public class SessionsRepository : TPKRepoBase<Session>
  {
    public SessionsRepository()
    {
      PropertyConventions.Add(new IgnoreUserIdDuringUpdatePropertyConvention());
    }

    public Task<Session> GetByUserIdAsync(int userId)
        => GetSingleAsync("userid", userId);

    public Task<Session> GetByTokenAsync(Guid token)
        => GetSingleAsync("token", token);

    public Task<Session> GetByAccessTokenAsync(Guid accessToken)
        => GetSingleAsync("accesstoken", accessToken);

    /* public Task<long> UpdateSessionAccessToken(int id, Guid accessTokenNew, byte[] lastModified)
        => ExecuteNonQueryAsync("UpdateSessionAccessToken", new Dictionary<string, object>{
          {"id",id},
          {"accessTokenNew",accessTokenNew},
          {"lastModified",lastModified}
        }); */

  }
}
