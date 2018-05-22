using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace  one.web.image
{
    [Route("api/[controller]")]
    public class ImageController:Controller{
        [HttpGet]
        public async Task<IActionResult> Search(string term, int page, [FromServices]IImageService imageService){
            return  Ok(await imageService.Search(term,page));
        }
    }
}