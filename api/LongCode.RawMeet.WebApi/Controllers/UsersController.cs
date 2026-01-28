using Microsoft.AspNetCore.Mvc;
using LongCode.RawMeet.WebApi.Models;

namespace LongCode.RawMeet.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ILogger<UsersController> _logger;

    public UsersController(ILogger<UsersController> logger)
    {
        _logger = logger;
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult<User>> GetUser(Guid userId)
    {
        // TODO: Implement database query
        var user = new User
        {
            Id = userId,
            Username = "testuser",
            Email = "test@example.com",
            DisplayName = "Test User",
            CreatedAt = DateTime.UtcNow.AddDays(-30)
        };

        return Ok(user);
    }

    [HttpPut("{userId}")]
    public async Task<ActionResult<User>> UpdateProfile(Guid userId, [FromForm] UpdateProfileDto dto)
    {
        // TODO: Implement profile update
        // TODO: Handle avatar upload to S3
        return Ok(new User
        {
            Id = userId,
            Username = "testuser",
            Email = "test@example.com",
            DisplayName = dto.DisplayName ?? "Test User",
            Bio = dto.Bio,
            CreatedAt = DateTime.UtcNow.AddDays(-30)
        });
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<User>>> SearchUsers([FromQuery] string q)
    {
        // TODO: Implement user search
        return Ok(Array.Empty<User>());
    }
}
