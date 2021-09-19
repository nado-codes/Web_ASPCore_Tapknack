using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using NadoMapper.Models;
using Tapknack_Server.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tapknack_Server.Controllers
{
    [Authorize]
    [ApiController]
    public class CRUDApiController<TModel,TRepo> : ControllerBase where TRepo : TPKRepoBase<TModel>, new() where TModel : ModelBase, new()
    {
        protected TRepo _Repo = new TRepo();

        // GET: api/<CRUDApiController>
        // GetAll
        /* [HttpGet]
        public IEnumerable<TModel> GetAllAsync()
        {
            return new string[] { "value1", "value2" };
        } */

        // GET api/<CRUDApiController>/5
        [HttpGet("{id}")]
        public virtual async Task<TModel> GetById(int id)
        {
            //TODO: Add authentication checking here
            return await _Repo.GetSingleAsync(id);
        }

        // POST api/<CRUDApiController>
        [HttpPost("")]
        public virtual async Task<TModel> AddAsync([FromBody] TModel user)
        {
            //TODO: Add authentication checking here
            return await _Repo.AddAsync(user);
        }

        // PUT api/<CRUDApiController>/5
        /* [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CRUDApiController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
