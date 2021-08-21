using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Providers;
using Xunit;

namespace Tapknack_Tests.Unit
{
    public class PasswordProviderUnitTests
    {
        [Fact]
        public async Task EncryptVerifyUnitTest()
        {
            var passwordProv = new PasswordProvider();

            var passwordToEncrypt = "testPass";
            var encryptedPassword = passwordProv.Encrypt(passwordToEncrypt);

            // .. We'll fake a login using the pre-encryption password. To pass, the login must succeed
            Assert.True(BCrypt.Net.BCrypt.EnhancedVerify(passwordToEncrypt, encryptedPassword));
        }

        [Fact]
        public async Task VerifyUnitTest()
        {
            var passwordProv = new PasswordProvider();

            var passwordToEncrypt = "testPass";
            var encryptedPassword = passwordProv.Encrypt(passwordToEncrypt);

            var passwordProvVerification = passwordProv.Verify(passwordToEncrypt, encryptedPassword);
            var bcryptVerification = BCrypt.Net.BCrypt.EnhancedVerify(passwordToEncrypt, encryptedPassword);

            // .. We'll verify a fake password using both the password provider and BCrypt directly. To pass, both results must be equal
            Assert.Equal(bcryptVerification,passwordProvVerification);
        }
    }
}
