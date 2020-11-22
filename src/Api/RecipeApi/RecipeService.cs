using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace RecipeApi
{
    public class RecipeService : IRecipeService
    {
        private readonly string _dataFilePath;
        public RecipeService(IConfiguration config)
        {
            _dataFilePath = config["DataJsonFile"];
        }

        public async Task<List<Recipe>> GetAllRecipes()
        {
            Console.WriteLine(_dataFilePath);
            var data = await File.ReadAllTextAsync(_dataFilePath);
            return JsonConvert.DeserializeObject<List<Recipe>>(data);
        }

        public Task<Recipe> GetRecipe(Guid id)
        {
            throw new System.NotImplementedException();
        }
    }
}