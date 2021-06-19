using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
    private readonly SymmetricSecurityKey _key;
    private readonly IConfiguration config;
    

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token"]));
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>{
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };
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