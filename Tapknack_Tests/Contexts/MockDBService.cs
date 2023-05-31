using _NadoMapper = NadoMapper.NadoMapper;
using NadoMapper.Enums;
using NadoMapper.Interfaces;
using Pluralize.NET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Tapknack_Tests.Contexts
{
    public class UnknownStoredProcedureException : NotImplementedException
    {
        public UnknownStoredProcedureException(string command) : base($"Unknown stored procedure \"{command}\"") { }
    }

    public class MockDBService<TEntity> : IDbService where TEntity : IModel,new()
    {
        public List<IPropertyConvention> PropertyConventions { get; } = new List<IPropertyConvention>();

        private string ModelName => typeof(TEntity).Name;
        private string ModelNamePlural { get; }

        protected List<TEntity> Entities = new();

        public MockDBService(List<TEntity> dummyEntities = null)
        {
            var pluralizer = new Pluralizer();
            ModelNamePlural = pluralizer.Pluralize(ModelName);

            if (dummyEntities != null)
            {
                foreach(var entity in dummyEntities)
                    ExecuteScalarAsync($"Add{ModelName}", CRUDType.Create, _NadoMapper.ReflectPropsFromSingle(entity));
            }
        }


        public Task<long> ExecuteNonQueryAsync(string command, CRUDType crudType, IDictionary<string, object> parameters = null)
        {
            if (command == $"Update{ModelName}")
            {
                var entityToUpdate = _NadoMapper.MapPropsToSingle<TEntity>(parameters);

                var existingEntity = Entities.FirstOrDefault(e => e.Id == entityToUpdate.Id);

                if (existingEntity == null)
                    throw new NullReferenceException($"No entity exists with id {entityToUpdate.Id}");

                if (!existingEntity.LastModified.SequenceEqual(entityToUpdate.LastModified))
                    throw new ApplicationException("Failed to update");

                var indexOfEntity = Entities.IndexOf(existingEntity);
                Entities[indexOfEntity] = entityToUpdate;

                return Task.Run(() => (long)1);
            }
            else if (command == $"Delete{ModelName}")
            {
                if (!parameters.ContainsKey("id"))
                    throw new ArgumentException($"Parameter \"id\" is required in call to Delete{ModelName}");

                if (!int.TryParse(parameters["id"].ToString(), out int id))
                    throw new ArgumentException($"Parameter \"id\" must be parsable to int in call to Delete{ModelName}");

                if (!parameters.ContainsKey("lastModified") || parameters["lastModified"] == null)
                    throw new ArgumentException($"Parameter \"lastModified\" is required in call to Delete{ModelName}");

                var existingEntity = Entities.FirstOrDefault(e => e.Id == id);

                if (existingEntity == null)
                    throw new NullReferenceException($"No entity exists with id {id}");

                byte[] lastModified = (byte[])parameters["lastModified"];

                if (!existingEntity.LastModified.SequenceEqual(lastModified))
                    throw new ApplicationException("Failed to delete");

                Entities.Remove(existingEntity);

                return Task.Run(() => (long)1);
            }
            else
                throw new NotImplementedException();
        }

        public Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, string parameterName, object parameterValue)
            => ExecuteReaderAsync(command, new Dictionary<string, object> { { parameterName, parameterValue } });

        public Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, IDictionary<string, object> parameters = null)
        {
            if(command == $"Get{ModelNamePlural}")
            {
                var entitiesAsDictionary = Entities.Select(e => _NadoMapper.ReflectPropsFromSingle(e));
                return Task.Run(() => entitiesAsDictionary);
            }
            else if (command == $"Get{ModelName}ById")
            {
                if (!parameters.ContainsKey("id"))
                    throw new ArgumentException($"Parameter \"id\" is required in call to Get{ModelName}ById");

                if (!int.TryParse(parameters["id"].ToString(), out int id))
                    throw new ArgumentException($"Parameter \"id\" must be parsable to int in call to Get{ModelName}ById");

                var entity = Entities.FirstOrDefault(e => e.Id == id);

                if (entity == null)
                {
                    var emptyDictionary = new Dictionary<string, object>();
                    return Task.Run(() => emptyDictionary.Cast<IDictionary<string,object>>());
                }

                var entityAsDictionary = _NadoMapper.ReflectPropsFromSingle(entity);
                var entityList = new List<IDictionary<string, object>>() { entityAsDictionary };

                return Task.Run(() => entityList.Cast<IDictionary<string, object>>());
            }
            else
                throw new NotImplementedException();
        }

        public Task<object> ExecuteScalarAsync(string command, CRUDType crudType, IDictionary<string, object> parameters = null)
        {
            if (command == $"Add{ModelName}")
            {
                var entity = _NadoMapper.MapPropsToSingle<TEntity>(parameters);
                entity.Id = Entities.Count + 1;
                entity.LastModified = Encoding.UTF8.GetBytes(DateTime.Now.Ticks.ToString());
                Entities.Add(entity);

                return Task.Run(() => (object)(long)Entities.Count);
            }
            else
                throw new NotImplementedException();
        }
    }
}
