using Microsoft.Extensions.Configuration;
using NadoMapper.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Models;
using Tapknack_Tests.Contexts;
using Xunit;

namespace Tapknack_Tests.Fixtures
{
    public class TapknackTestsFixture
    {
        public IDbService MockUserDbService;
        public IDbService MockSessionDbService;

        // This method is called once before any tests in this fixture are run
        public TapknackTestsFixture()
        {
            MockUserDbService = new MockDBService<User>();
            MockSessionDbService = new MockDBService<Session>();
        }
    }

    // This attribute defines the name of the fixture collection
    [CollectionDefinition("TapknackTestCollection")]
    public class ShippableToolbarServiceUnitTestCollection : ICollectionFixture<TapknackTestsFixture> { }
}
