using AuthProject.API.Data;
using AuthProject.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthProject.API.Services;

public class AuthService
{
	private readonly AppDbContext _context;
	private readonly JwtService _jwtService;

	public AuthService(AppDbContext context, JwtService jwtService)
	{
		_context = context;
		_jwtService = jwtService;
	}

	public async Task<string> RegisterAsync(string username, string password, string email)
	{
		if (await _context.Users.AnyAsync(u => u.Email == email || u.Username == username))
			throw new InvalidOperationException("User with this email or username already exists");

		username = username.Trim();
		password = password.Trim();
		email = email.Trim();

		if (username.Length < 1 || password.Length < 1 || email.Length < 1)
			throw new InvalidDataException("Data is incorrect , please enter correct data.");

		var user = new User(username, password, email);

		await _context.Users.AddAsync(user);
		await _context.SaveChangesAsync();

		var token = _jwtService.GenerateAccessToken(user.Id.ToString(), user.Email, user.Username);

		return token;
	}

	public async Task<string> LoginAsync(string email, string password)
	{
		var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email)
					?? throw new InvalidOperationException("Invalid email or password");

		if (password != user.Password)
			throw new InvalidOperationException("Invalid email or password");

		var token = _jwtService.GenerateAccessToken(user.Id.ToString(), user.Email, user.Username);

		return token;
	}

}
