using AuthProject.API.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthProject.API.Data;

public class AppDbContext : DbContext
{
	public DbSet<User> Users { get; set; }

	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
	{
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{

		modelBuilder.Entity<User>()
			.HasKey(u => u.Id);

		modelBuilder.Entity<User>()
			.Property(u => u.Username)
			.IsRequired();

		modelBuilder.Entity<User>()
			.Property(u => u.Password)
			.IsRequired();

		modelBuilder.Entity<User>()
			.Property(u => u.Email)
			.IsRequired();

	}
}
