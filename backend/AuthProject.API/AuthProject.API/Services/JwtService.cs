using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthProject.API.Services;

public class JwtService
{
	private readonly IConfiguration _configuration;

	public JwtService(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public string GenerateAccessToken(string userId, string email, string username)
	{
		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, userId),
			new Claim(ClaimTypes.Email, email),
			new Claim(ClaimTypes.Name, username)
		};

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
		var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var token = new JwtSecurityToken(
			issuer: _configuration["Jwt:Issuer"],
			audience: _configuration["Jwt:Audience"],
			claims: claims,
			expires: DateTime.UtcNow.AddMonths(1),
			signingCredentials: credentials
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}
