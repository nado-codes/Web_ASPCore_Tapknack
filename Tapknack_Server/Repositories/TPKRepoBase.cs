using System.Threading.Tasks;
using NadoMapper;
using NadoMapper.Models;

namespace Tapknack_Server.Repositories
{
  public class TPKRepoBase<T> : RepositoryBase<T> where T : ModelBase, new()
  {
    //TODO: This should be encrypted in somewhere like AppConfig ... not hardcoded here!!
    const string connectionString = "Server=localhost;Database=Tapknack;Trusted_Connection=True;";

    public TPKRepoBase() : base(connectionString)
    {

    }

    public new async Task<T> AddAsync(T entity)
    {
      var addedId = await base.AddAsync(entity);
      return await GetSingleAsync(addedId);
    }
  }
}
