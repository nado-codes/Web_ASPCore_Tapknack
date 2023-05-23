using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using NadoMapper.Models;
using Tapknack_Server.Repositories;
using Tapknack_Server.Providers;
using NadoMapper;
using NadoMapper.Interfaces;
using Tapknack_Server.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tapknack_Server.Controllers
{
    [ApiController]
    public class CRUDApiController<TModel, TRepository> : ControllerBase where TModel : ModelBase, new() where TRepository : ITPKRepository<TModel>
    {
        protected TRepository _repo;

        public CRUDApiController(TRepository repo)
        {
            _repo = repo;
        }

        protected async Task AuthenticateAsync()
        {
            // .. TODO: difficult to return a new access token to the user if it's
            var authProv = new AuthenticationProvider();

            var newToken = await authProv.AuthenticateAsync(Request);
            Request.Headers["access-token"] = newToken;
        }

        [HttpGet]
        public async Task<IEnumerable<TModel>> GetAllAsync()
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repo.GetAllAsync();
        }

        [HttpGet("{id}")]
        public virtual async Task<TModel> GetById(int id)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repo.GetSingleAsync(id);
        }

        [HttpPost("")]
        public virtual async Task<TModel> AddAsync([FromBody] TModel model)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repo.AddAsync(model);
        }

        [HttpPut]
        public virtual async Task<long> Put([FromBody] TModel model)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repo.UpdateAsync(model);
        }

        [HttpDelete("{id}")]
        public virtual async Task<long> Delete([FromBody] TModel model)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repo.DeleteAsync(model);
        }
    }
}
