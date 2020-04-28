import RecipeStep from "./RecipeStep";
import Ingredient from "./Ingredient";

export default class Recipe {
  ingredients: Ingredient[];
  steps: RecipeStep[];
  constructor() {
    this.ingredients = [];
    this.steps = [];
  }
}
