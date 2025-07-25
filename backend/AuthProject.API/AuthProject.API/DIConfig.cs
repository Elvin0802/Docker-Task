using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace AuthProject.API;

public static class DIConfig
{
	public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
	{
		var jwtKey = configuration["Jwt:Key"];
		var jwtIssuer = configuration["Jwt:Issuer"];
		var jwtAudience = configuration["Jwt:Audience"];

		services.AddAuthentication(options =>
		{
			options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
		})
		.AddJwtBearer(options =>
		{
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = jwtIssuer,
				ValidAudience = jwtAudience,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!))
			};
		});

		return services;
	}
	public static IServiceCollection AddSwagger(this IServiceCollection services, IConfiguration configuration)
	{
		services.AddSwaggerGen(setup =>
		{
			setup.SwaggerDoc("v1",
				new OpenApiInfo
				{
					Title = "Simple API",
					Version = "v1.0"
				});

			setup.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
			{
				Name = "Authorization",
				Type = SecuritySchemeType.ApiKey,
				Scheme = "Bearer",
				BearerFormat = "JWT",
				In = ParameterLocation.Header,
				Description = "JWT Authorization header using the Bearer scheme.\r\n\r\n" +
							 "Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\n" +
							 "Example: \"Bearer eyJhbGciOiJIUz...\""
			});

			setup.AddSecurityRequirement(new OpenApiSecurityRequirement
			{
				{
					new OpenApiSecurityScheme
					{
						Reference = new OpenApiReference
						{
							Type = ReferenceType.SecurityScheme,
							Id = "Bearer"
						}
					},
					Array.Empty<string>()
				}
			});
		});

		return services;
	}
}
