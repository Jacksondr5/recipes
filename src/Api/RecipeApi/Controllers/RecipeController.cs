using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RecipeApi.Controllers
{
    [ApiController]
    [Route("Recipe")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeService _service;
        public RecipeController(IRecipeService service)
        {
            _service = service;
        }

        [HttpGet("All")]
        public Task<List<Recipe>> GetAll() => _service.GetAllRecipes();

        [HttpGet("{id}")]
        public Task<Recipe> Get(Guid id) => _service.GetRecipe(id);
    }
}