using AuthProject.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AuthProject.API.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AuthController : ControllerBase
{
	private readonly AuthService _authService;

	public AuthController(AuthService authService)
	{
		_authService = authService;
	}

	[HttpPost]
	public async Task<ActionResult<string>> Register([FromQuery] string username, string email, string password)
	{
		try
		{
			var result = await _authService.RegisterAsync(username, password, email);

			return Ok(result);
		}
		catch (Exception ex)
		{
			return StatusCode(500, ex.Message);
		}
	}

	[HttpPost]
	public async Task<ActionResult<string>> Login([FromQuery] string email, string password)
	{
		try
		{
			var result = await _authService.LoginAsync(email, password);

			return Ok(result);
		}
		catch (Exception ex)
		{
			return StatusCode(500, ex.Message);
		}
	}

}
