using API.Entities;
using System.Threading.Tasks;

namespace API.Interface
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);    }
}