using NadoMapper.SqlProvider;
using NadoMapper.Conventions;

namespace Tapknack_Server.Repositories
{
  public class IgnoreUserIdDuringUpdatePropertyConvention : PropertyConventionBase
  {
    public IgnoreUserIdDuringUpdatePropertyConvention()
    {
      PropertyName = "UserId";
      CRUDType = CRUDType.Update;
    }
  }
}