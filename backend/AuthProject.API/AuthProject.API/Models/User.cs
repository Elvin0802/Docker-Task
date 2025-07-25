namespace AuthProject.API.Models;

public class User
{

	public Guid Id { get; set; }
	public string Username { get; set; }
	public string Password { get; set; }
	public string Email { get; set; }
	public DateTimeOffset CreatedAt { get; set; }


	public User(string username, string password, string email)
	{
		Id = Guid.NewGuid();
		Username = username;
		Password = password;
		Email = email;
		CreatedAt = DateTimeOffset.UtcNow;
	}

}
