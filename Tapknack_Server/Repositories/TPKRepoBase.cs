using System.Collections.Generic;
using System.Threading.Tasks;
using NadoMapper;
using NadoMapper.Interfaces;

namespace Tapknack_Server.Repositories
{
    public class TPKRepoBase<T> : RepositoryBase<T> where T : IModel, new()
    {
        //TODO: This should be encrypted in somewhere like AppConfig ... not hardcoded here!!
        const string connectionString = "Server=localhost;Database=Tapknack;Trusted_Connection=True;";

        public TPKRepoBase(IDataContext<T> dataContext) : base(dataContext) { }

        public new async Task<T> AddAsync(T entity)
        {
            var addedId = await base.AddAsync(entity);
            return await GetSingleAsync(addedId);
        }
    }
}
