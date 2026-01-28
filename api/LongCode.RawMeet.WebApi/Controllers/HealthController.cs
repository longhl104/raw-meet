using Microsoft.AspNetCore.Mvc;

namespace LongCode.RawMeet.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            Status = "Healthy",
            Timestamp = DateTime.UtcNow,
            Service = "LongCode.RawMeet.WebApi"
        });
    }
}
