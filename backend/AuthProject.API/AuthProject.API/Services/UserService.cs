using AuthProject.API.Data;
using AuthProject.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthProject.API.Services;

public class UserService
{
	private readonly AppDbContext _context;

	public UserService(AppDbContext context)
	{
		_context = context;
	}

	public async Task<User> GetUserDataAsync(Guid userId)
	{
		var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId)
					?? throw new InvalidOperationException("Invalid Id");

		return user;
	}

	public async Task ChangePasswordAsync(Guid userId, string oldPassword, string newPassword)
	{
		var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId)
			?? throw new InvalidOperationException("User not found");

		if (user.Password != oldPassword || oldPassword == newPassword)
			throw new InvalidOperationException("Invalid old password or new password is the same as old password.");

		user.Password = newPassword;

		_context.Users.Update(user);
		await _context.SaveChangesAsync();
	}

	public async Task ChangeUsernameAsync(Guid userId, string newUsername)
	{
		if (await _context.Users.AnyAsync(u => u.Username == newUsername))
			throw new InvalidOperationException("Username already exists");

		var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId)
			?? throw new InvalidOperationException("User not found");

		user.Username = newUsername;

		_context.Users.Update(user);
		await _context.SaveChangesAsync();
	}
}
