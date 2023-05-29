using NadoMapper.Interfaces;
using System.Threading.Tasks;

namespace Tapknack_Server.Interfaces
{
    public interface ITPKRepository<TModel> : IRepository<TModel> where TModel : IModel, new() 
    {
        public new Task<TModel> AddAsync(TModel entity);
    }
}
