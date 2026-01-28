namespace LongCode.RawMeet.WebApi.Models;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public string? Bio { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Post
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string MediaUrl { get; set; } = string.Empty;
    public string MediaType { get; set; } = string.Empty; // "photo" or "video"
    public string? Caption { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public int CommentsCount { get; set; }
}

public class Comment
{
    public Guid Id { get; set; }
    public Guid PostId { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class CreatePostDto
{
    public IFormFile MediaFile { get; set; } = null!;
    public string MediaType { get; set; } = string.Empty;
    public string? Caption { get; set; }
}

public class CreateCommentDto
{
    public Guid PostId { get; set; }
    public string Content { get; set; } = string.Empty;
}

public class UpdateProfileDto
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public IFormFile? AvatarFile { get; set; }
}
