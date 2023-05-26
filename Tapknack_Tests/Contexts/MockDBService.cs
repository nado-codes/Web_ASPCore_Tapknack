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

        private string modelName => typeof(TEntity).Name;
        private string modelNamePlural { get; }

        private Dictionary<string, Func<long>> nonQueryActions = new();
        private Dictionary<string, Func<IEnumerable<IDictionary<string, object>>>> readerActions = new();
        private Dictionary<string, Func<int[], object>> scalarActions = new();

        private Dictionary<string, MockStoredProcedure<TEntity>> storedProcedures = new();

        private List<TEntity> entities = new();

        public MockDBService(List<TEntity> dummyEntities = null)
        {
            var pluralizer = new Pluralizer();
            modelNamePlural = pluralizer.Pluralize(modelName);

            entities.AddRange(dummyEntities);
        }

        public Task<long> ExecuteNonQueryAsync(string command, CRUDType crudType, IDictionary<string, object> parameters = null)
        {
            if (command == $"Add{modelName}")
            {
                var entity = _NadoMapper.MapPropsToSingle<TEntity>(parameters);
                entities.Add(entity);

                return Task.Run(() => (long)entities.Count);
            }
            else
                throw new NotImplementedException();
        }

        public Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, string parameterName, object parameterValue)
            => ExecuteReaderAsync(command, new Dictionary<string, object> { { parameterName, parameterValue } });

        public Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, IDictionary<string, object> parameters = null)
        {
            if (!readerActions.ContainsKey(command))
                throw new UnknownStoredProcedureException(command);

            return Task.Run(() => readerActions[command]());
        }

        public Task<object> ExecuteScalarAsync(string command, CRUDType crudType, IDictionary<string, object> parameters = null)
        {
            if (!scalarActions.ContainsKey(command))
                throw new UnknownStoredProcedureException(command);

            return Task.Run(() => scalarActions[command]());
        }
    }
}
