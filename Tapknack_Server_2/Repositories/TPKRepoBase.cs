using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NadoMapper;
using NadoMapper.Models;

namespace Tapknack_Server.Repositories
{
    public class TPKRepoBase<T> : RepositoryBase<T> where T : ModelBase, new()
    {
        //TODO: This should be encrypted in somewhere like AppConfig ... not hardcoded here!!
        const string connectionString = "Data Source=localhost;Initial Catalog=Tapknack;Integrated Security=True;";
        
        public TPKRepoBase()
        {
            VerifyInitialize(connectionString);
        }

        public new async Task<T> AddAsync(T entity)
        {
            var addedId = await base.AddAsync(entity);
            return await GetSingleAsync(addedId);
        }
    }
}
