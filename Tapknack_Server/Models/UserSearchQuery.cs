namespace Tapknack_Server
{
  public record UserSearchQuery
  {
    public string Username { get; set; }
    public string Email { get; set; }
  }
}