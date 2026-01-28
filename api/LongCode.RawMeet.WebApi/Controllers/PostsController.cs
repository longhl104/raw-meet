using Microsoft.AspNetCore.Mvc;
using LongCode.RawMeet.WebApi.Models;

namespace LongCode.RawMeet.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly ILogger<PostsController> _logger;

    public PostsController(ILogger<PostsController> logger)
    {
        _logger = logger;
    }

    [HttpGet("feed")]
    public async Task<ActionResult<IEnumerable<Post>>> GetFeed([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        // TODO: Implement feed query from database
        // TODO: Include pagination
        var mockPosts = new List<Post>
        {
            new Post
            {
                Id = Guid.NewGuid(),
                UserId = Guid.NewGuid(),
                User = new User { Id = Guid.NewGuid(), Username = "john_doe", DisplayName = "John Doe" },
                MediaUrl = "https://picsum.photos/600/800",
                MediaType = "photo",
                Caption = "Beautiful sunset!",
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                CommentsCount = 5
            }
        };

        return Ok(mockPosts);
    }

    [HttpGet("{postId}")]
    public async Task<ActionResult<Post>> GetPost(Guid postId)
    {
        // TODO: Implement database query
        var post = new Post
        {
            Id = postId,
            UserId = Guid.NewGuid(),
            User = new User { Id = Guid.NewGuid(), Username = "john_doe", DisplayName = "John Doe" },
            MediaUrl = "https://picsum.photos/600/800",
            MediaType = "photo",
            Caption = "Amazing view!",
            CreatedAt = DateTime.UtcNow.AddHours(-1),
            CommentsCount = 3
        };

        return Ok(post);
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Post>>> GetUserPosts(Guid userId)
    {
        // TODO: Implement database query
        return Ok(new List<Post>());
    }

    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost([FromForm] CreatePostDto dto)
    {
        // TODO: Validate user authentication
        // TODO: Upload media to S3
        // TODO: Save post to database
        var post = new Post
        {
            Id = Guid.NewGuid(),
            UserId = Guid.NewGuid(),
            MediaUrl = "https://example.com/media.jpg",
            MediaType = dto.MediaType,
            Caption = dto.Caption,
            CreatedAt = DateTime.UtcNow,
            CommentsCount = 0
        };

        return CreatedAtAction(nameof(GetPost), new { postId = post.Id }, post);
    }

    [HttpDelete("{postId}")]
    public async Task<IActionResult> DeletePost(Guid postId)
    {
        // TODO: Validate user owns the post
        // TODO: Delete media from S3
        // TODO: Delete post from database
        return NoContent();
    }

    [HttpGet("{postId}/comments")]
    public async Task<ActionResult<IEnumerable<Comment>>> GetComments(Guid postId)
    {
        // TODO: Implement database query
        var mockComments = new List<Comment>
        {
            new Comment
            {
                Id = Guid.NewGuid(),
                PostId = postId,
                UserId = Guid.NewGuid(),
                User = new User { Id = Guid.NewGuid(), Username = "jane_doe", DisplayName = "Jane Doe" },
                Content = "Great photo!",
                CreatedAt = DateTime.UtcNow.AddMinutes(-30)
            }
        };

        return Ok(mockComments);
    }

    [HttpPost("{postId}/comments")]
    public async Task<ActionResult<Comment>> AddComment(Guid postId, [FromBody] CreateCommentDto dto)
    {
        // TODO: Validate user authentication
        // TODO: Save comment to database
        var comment = new Comment
        {
            Id = Guid.NewGuid(),
            PostId = postId,
            UserId = Guid.NewGuid(),
            Content = dto.Content,
            CreatedAt = DateTime.UtcNow
        };

        return CreatedAtAction(nameof(GetComments), new { postId }, comment);
    }
}
