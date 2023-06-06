using _NadoMapper = NadoMapper.NadoMapper;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;

namespace Tapknack_Tests.Contexts
{
    public class MockSessionDbService : MockDBService<Session>, IDbService
    {
        public MockSessionDbService(List<Session> mockSessions = null) : base(mockSessions) { }


        public new Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, string parameterName, object parameterValue)
            => ExecuteReaderAsync(command, new Dictionary<string, object>() { { parameterName, parameterValue } });

        public new Task<IEnumerable<IDictionary<string, object>>> ExecuteReaderAsync(string command, IDictionary<string, object> parameters = null)
        {
            if (command.ToLower() == $"getsessionbyuserid")
            {
                if (!parameters.ContainsKey("userid") || parameters["userid"] == null)
                    throw new ArgumentException($"Parameter \"userid\" is required in call to GetSessionByUserId");

                int userId = (int)parameters["userid"];
                var entity = Entities.FirstOrDefault(e => e.UserId == userId);

                if (entity == null)
                    return Task.Run(() => new List<Dictionary<string, object>>().Cast<IDictionary<string, object>>());

                var entityAsDictionary = _NadoMapper.ReflectPropsFromSingle(entity);
                var entityList = new List<IDictionary<string, object>>() { entityAsDictionary };

                return Task.Run(() => entityList.Cast<IDictionary<string, object>>());
            }
            else if (command.ToLower() == $"getsessionbytoken")
            {
                if (!parameters.ContainsKey("token") || parameters["token"] == null)
                    throw new ArgumentException($"Parameter \"token\" is required in call to GetSessionByToken");

                Guid token;

                if (!Guid.TryParse(parameters["token"].ToString(), out token))
                    throw new ApplicationException("token must be parsable to Guid in call to GetSessionByToken");

                var entity = Entities.FirstOrDefault(e => e.Token == token);

                if (entity == null)
                    return Task.Run(() => new List<IDictionary<string, object>>().Cast<IDictionary<string, object>>());

                var entityAsDictionary = _NadoMapper.ReflectPropsFromSingle(entity);
                var entityList = new List<IDictionary<string, object>>() { entityAsDictionary };

                return Task.Run(() => entityList.Cast<IDictionary<string, object>>());
            }
            else if (command.ToLower() == $"getsessionbyaccesstoken")
            {
                if (!parameters.ContainsKey("accesstoken") || parameters["accesstoken"] == null)
                    throw new ArgumentException($"Parameter \"accesstoken\" is required in call to GetSessionByAccessToken");

                Guid accessToken;

                if (!Guid.TryParse(parameters["accesstoken"].ToString(), out accessToken))
                    throw new ApplicationException("accesstoken must be parsable to Guid in call to GetSessionByAccessToken");

                var entity = Entities.FirstOrDefault(e => e.AccessToken == accessToken);

                if (entity == null)
                    return Task.Run(() => new List<IDictionary<string, object>>().Cast<IDictionary<string, object>>());

                var entityAsDictionary = _NadoMapper.ReflectPropsFromSingle(entity);
                var entityList = new List<IDictionary<string, object>>() { entityAsDictionary };

                return Task.Run(() => entityList.Cast<IDictionary<string, object>>());
            }
            else
                return base.ExecuteReaderAsync(command, parameters);
        }
    }
}
