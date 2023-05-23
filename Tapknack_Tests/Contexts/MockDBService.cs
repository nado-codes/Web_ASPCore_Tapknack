using NadoMapper.Enums;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tapknack_Tests.Contexts
{
    public class MockDBService<TEntity> : IDbService where TEntity : IModel,new()
    {
        public List<IPropertyConvention> PropertyConventions { get; } = new List<IPropertyConvention>();

        private readonly Dictionary<string, Action> _storedProcedures = new Dictionary<string, Action>();

        // .. TODO implement registering stored procedures so they can be executed by the service methods. they need to accept arbritrary return
        // types and arbritrary numbers of parameters
        public void RegisterStoredProcedure<T>(string command, Action<T> action)
        {
            _storedProcedures.Add(command, action);
        }

        public Task<long> ExecuteNonQueryAsync(string command, CRUDType crudType, IDictionary<string, object> parameters = null)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, string parameterName, object parameterValue)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, IDictionary<string, object> parameters = null)
        {
            throw new NotImplementedException();
        }

        public Task<object> ExecuteScalarAsync(string command, CRUDType crudType, IDictionary<string, object> parameters = null)
        {
            throw new NotImplementedException();
        }
    }
}
