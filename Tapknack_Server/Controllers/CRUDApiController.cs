using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using NadoMapper.Models;
using Tapknack_Server.Repositories;
using Tapknack_Server.Providers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tapknack_Server.Controllers
{
  [ApiController]
  public class CRUDApiController<TModel, TRepo> : ControllerBase where TRepo : TPKRepoBase<TModel>, new() where TModel : ModelBase, new()
  {
    protected TRepo _Repo = new TRepo();

    protected async Task AuthenticateAsync()
    {
      // .. TODO: difficult to return a new access token to the user if it's
      var authProv = new AuthenticationProvider();

      var newToken = await authProv.AuthenticateAsync(Request);
      Request.Headers["access-token"] = newToken;
    }

    // GET: api/<CRUDApiController>
    // GetAll
    [HttpGet]
    public async Task<IEnumerable<TModel>> GetAllAsync()
    {
      //TODO: Add authentication checking here
      await AuthenticateAsync();
      return await _Repo.GetAllAsync();
    }

    // GET api/<CRUDApiController>/5
    [HttpGet("{id}")]
    public virtual async Task<TModel> GetById(int id)
    {
      //TODO: Add authentication checking here
      await AuthenticateAsync();
      return await _Repo.GetSingleAsync(id);
    }

    // POST api/<CRUDApiController>
    [HttpPost("")]
    public virtual async Task<TModel> AddAsync([FromBody] TModel model)
    {
      //TODO: Add authentication checking here
      await AuthenticateAsync();
      return await _Repo.AddAsync(model);
    }

    // PUT api/<CRUDApiController>/5
    [HttpPut]
    public virtual async Task<long> Put([FromBody] TModel model)
    {
      //TODO: Add authentication checking here
      await AuthenticateAsync();
      return await _Repo.UpdateAsync(model);
    }

    // DELETE api/<CRUDApiController>/5
    [HttpDelete("{id}")]
    public virtual async Task<long> Delete([FromBody] TModel model)
    {
      //TODO: Add authentication checking here
      await AuthenticateAsync();
      return await _Repo.DeleteAsync(model);
    }
  }
}
