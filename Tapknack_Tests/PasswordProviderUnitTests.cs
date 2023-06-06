using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tapknack_Server.Providers;
using Xunit;

namespace Tapknack_Tests
{
    public class PasswordProviderUnitTests
    {
        const string passwordToEncrypt = "testPass";

        private readonly PasswordProvider _passwordProvider;

        public PasswordProviderUnitTests()
        {
            _passwordProvider = new PasswordProvider();
        }

        [Fact]
        public void EncryptAndVerifyPassword()
        {
            var encryptedPassword = _passwordProvider.Encrypt(passwordToEncrypt);

            Assert.True(BCrypt.Net.BCrypt.EnhancedVerify(passwordToEncrypt, encryptedPassword));
        }

        [Fact]
        public void VerifyUnitTest()
        {
            var encryptedPassword = _passwordProvider.Encrypt(passwordToEncrypt);

            var passwordProvVerification = _passwordProvider.Verify(passwordToEncrypt, encryptedPassword);
            var bCryptVerification = BCrypt.Net.BCrypt.EnhancedVerify(passwordToEncrypt, encryptedPassword);

            Assert.Equal(bCryptVerification, passwordProvVerification);
        }

        [Fact]
        public void EnsureEncryptingEmptyPasswordThrowsException()
        {
            Assert.Throws<ArgumentException>(() => _passwordProvider.Encrypt(string.Empty));
        }

        [Fact]
        public void EnsureVerifyingEmptyPasswordOrHashThrowsException()
        {
            Assert.Throws<ArgumentException>(() => _passwordProvider.Verify(string.Empty, "123"));
            Assert.Throws<ArgumentException>(() => _passwordProvider.Verify("123", string.Empty));
        }
    }
}
