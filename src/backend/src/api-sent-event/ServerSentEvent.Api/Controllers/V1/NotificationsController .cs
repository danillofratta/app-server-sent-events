using Microsoft.AspNetCore.Mvc;

namespace ServerSentEvent.Api.Controllers.V1
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NotificationsController : ControllerBase
    {
        private readonly ILogger<NotificationsController> _logger;

        public NotificationsController(ILogger<NotificationsController> logger)
        {
            _logger = logger;
        }

        [HttpGet("getstream")]
        public async Task GetStream()
        {
            Response.Headers.Add("Content-Type", "text/event-stream");
            Response.Headers.Add("Cache-Control", "no-cache");
            Response.Headers.Add("Connection", "keep-alive");

            HttpContext.Response.StatusCode = StatusCodes.Status200OK;

            for (int i = 0; i < 10; i++)
            {
                var message = $"Evento {i} - {DateTime.Now}";

                await Response.WriteAsync($"data: {message}\n\n");
                await Response.Body.FlushAsync(); 
                await Task.Delay(3000); 
            }
        }
    }
}
