using AuthProject.API.Models;
using AuthProject.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace AuthProject.API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
	private readonly UserService _userService;

	public UserController(UserService userService)
	{
		_userService = userService;
	}

	[HttpGet]
	public async Task<ActionResult<User>> GetUserData()
	{
		try
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (userId == null)
				return StatusCode(500, "User ID not found in token.");

			var user = await _userService.GetUserDataAsync(Guid.Parse(userId));

			return Ok(user);
		}
		catch (Exception ex)
		{
			return StatusCode(500, ex.Message);
		}
	}

	[HttpPost]
	public async Task<ActionResult<string>> ChangePassword([FromQuery] string oldPassword, [FromQuery] string newPassword)
	{
		try
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (userId == null)
				return StatusCode(500, "User ID not found in token.");

			await _userService.ChangePasswordAsync(Guid.Parse(userId), oldPassword, newPassword);
			return Ok("Password changed successfully.");
		}
		catch (Exception ex)
		{
			return StatusCode(500, ex.Message);
		}
	}

	[HttpPost]
	public async Task<ActionResult<string>> ChangeUsername([FromQuery] string newUsername)
	{
		try
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (userId == null)
				return StatusCode(500, "User ID not found in token.");

			await _userService.ChangeUsernameAsync(Guid.Parse(userId), newUsername);
			return Ok("Username changed successfully.");
		}
		catch (Exception ex)
		{
			return StatusCode(500, ex.Message);
		}
	}
}
