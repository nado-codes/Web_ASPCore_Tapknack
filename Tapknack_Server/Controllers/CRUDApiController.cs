﻿using Microsoft.AspNetCore.Mvc;
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
        protected TRepository _repository;
        private readonly IAuthService _authService;

        public CRUDApiController(TRepository repository, IAuthService authService)
        {
            _repository = repository;
            _authService = authService;
        }

        protected async Task AuthenticateAsync()
        {
            var newToken = await _authService.AuthenticateAsync(Request);
            Request.Headers["access-token"] = newToken;
        }

        [HttpGet]
        public async Task<IEnumerable<TModel>> GetAllAsync()
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public virtual async Task<TModel> GetById(int id)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repository.GetSingleAsync(id);
        }

        [HttpPost("")]
        public virtual async Task<TModel> AddAsync([FromBody] TModel model)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repository.AddAsync(model);
        }

        [HttpPut]
        public virtual async Task<long> Put([FromBody] TModel model)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repository.UpdateAsync(model);
        }

        [HttpDelete("{id}")]
        public virtual async Task<long> Delete([FromBody] TModel model)
        {
            //TODO: Add authentication checking here
            await AuthenticateAsync();
            return await _repository.DeleteAsync(model);
        }
    }
}
