using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
    private readonly SymmetricSecurityKey _key;
    private readonly IConfiguration config;

        private readonly UserManager<AppUser> _userManager;

        public TokenService(IConfiguration config,UserManager<AppUser> userManager)
        {
            _userManager= userManager;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token"]));
        }
        public async Task<string>  CreateToken(AppUser user)
        {
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.UniqueName,user.UserName),
            };

            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(roles => new Claim(ClaimTypes.Role, roles)));


            var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);

            // below code gives what is in token
            var  tokenDescrpitor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler(); // intiliaise to create token
            var token = tokenHandler.CreateToken(tokenDescrpitor); // then create token
            return tokenHandler.WriteToken(token); // return token
        }
    }
}