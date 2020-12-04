using System;
using System.Collections.Generic;

namespace RecipeApi
{
    public class Recipe
    {
        public Guid Id { get; set; }
        public List<Ingredient> Ingredients { get; set; }
        public string Name { get; set; }
        public List<RecipeStep> Steps { get; set; }
    }

    public class Ingredient
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string Quantity { get; set; }
    }

    public class RecipeStep
    {
        public string Details { get; set; }
        public Guid Id { get; set; }
        public string Title { get; set; }
    }
}