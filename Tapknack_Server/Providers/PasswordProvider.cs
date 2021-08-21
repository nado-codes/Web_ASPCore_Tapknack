using System;

namespace Tapknack_Server.Providers
{
    public class PasswordProvider
    {
        public string Encrypt(string password)
        {
            if(string.IsNullOrEmpty(password)) throw new ArgumentException("Password cannot be empty");
            return BCrypt.Net.BCrypt.EnhancedHashPassword(password);
        }

        public bool Verify(string password, string hash)
        {
            if (string.IsNullOrEmpty(password)) throw new ArgumentException("Password cannot be empty");
            if (string.IsNullOrEmpty(hash)) throw new ArgumentException("Hash cannot be empty");

            return BCrypt.Net.BCrypt.EnhancedVerify(password, hash);
        }
    }
}
