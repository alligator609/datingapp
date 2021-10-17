using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace Controllers
{
    [ServiceFilter(typeof(LogUserActivity))] // all controller can make use of that
    [ApiController]
    [Route("api/[controller]")] 
    public class BaseApiController : ControllerBase
    {

        
    
    }
}