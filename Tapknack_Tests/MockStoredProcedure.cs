using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Tapknack_Tests
{
    public class MockStoredProcedure<TEntity> where TEntity : IModel
    {
        private Func<IDictionary<string, object>,string> _expression;
        private IDictionary<string,object> _expressionParameters;

        public MockStoredProcedure(List<TEntity> entities, Func<IDictionary<string,object>, string> expression)
        {
            _expression = expression;
        }

        // id = 1
        public T Execute<T>(IDictionary<string, object> parameters)
        {
            var result = _expression.Invoke(parameters);
            return JsonSerializer.Deserialize<T>(result);
        }
    }
}
