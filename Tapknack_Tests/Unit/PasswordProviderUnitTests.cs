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
        const string passwordToEncrypt = "testPass";

        [Fact]
        public void EncryptVerifyPasswordUnitTest()
        {
            var passwordProv = new PasswordProvider();
            var encryptedPassword = passwordProv.Encrypt(passwordToEncrypt);

            // .. We'll fake a login using the pre-encryption password. To pass, the login must succeed
            Assert.True(BCrypt.Net.BCrypt.EnhancedVerify(passwordToEncrypt, encryptedPassword));
        }

        [Fact]
        public void VerifyUnitTest()
        {
            var passwordProv = new PasswordProvider();

            var encryptedPassword = passwordProv.Encrypt(passwordToEncrypt);

            var passwordProvVerification = passwordProv.Verify(passwordToEncrypt, encryptedPassword);
            var bCryptVerification = BCrypt.Net.BCrypt.EnhancedVerify(passwordToEncrypt, encryptedPassword);

            // .. We'll verify a fake password using both the password provider and BCrypt directly. To pass, both results must be equal
            Assert.Equal(bCryptVerification, passwordProvVerification);
        }
    }
}
