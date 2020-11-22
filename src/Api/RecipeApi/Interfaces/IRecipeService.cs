using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecipeApi
{
    public interface IRecipeService
    {
        Task<List<Recipe>> GetAllRecipes();
        Task<Recipe> GetRecipe(Guid id);
    }
}