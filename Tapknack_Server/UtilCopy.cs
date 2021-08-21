using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Tapknack_Server
{
    public static class UtilCopy
    {
        public static T Copy<T>(this object source)
            => JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(source));
    }
}
