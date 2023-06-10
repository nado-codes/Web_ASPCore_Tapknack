using System.Collections.Generic;
using System.Threading.Tasks;
using NadoMapper;
using NadoMapper.Interfaces;
using Tapknack_Server.Interfaces;

namespace Tapknack_Server.Repositories
{
    public class TPKRepoBase<T> : RepositoryBase<T>, ITPKRepository<T> where T : IModel, new()
    {
        public TPKRepoBase(IDataContext<T> dataContext) : base(dataContext) { }

        public new async Task<T> AddAsync(T entity)
        {
            var addedId = await base.AddAsync(entity);
            return await GetSingleAsync(addedId);
        }
    }
}
