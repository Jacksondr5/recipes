import { RecipeStep } from "./RecipeStep";
import { Ingredient } from "./Ingredient";

/** Represents a recipe, including the ingredients and steps */
export default class Recipe {
  private _ingredients: Ingredient[];
  private _steps: RecipeStep[];
  public id: string;
  public name: string;
  constructor() {
    this._ingredients = [];
    this._steps = [];
    this.name = "";
    this.id = "";
  }

  /**
   * Adds a step to the recipe
   * @param step The step to be added
   * @param index The index where the new step should be spliced in
   */
  public addRecipeStep(step: RecipeStep, index: number | null = null) {
    if (index == null) this._steps.push(step);
    else if (Math.abs(index) > this._steps.length)
      throw new Error(
        `The provided index of ${index} is greater then the length of the steps list ${this._steps.length}`
      );
    else this._steps.splice(index, 0, step);
  }

  /**
   * Removes a step from the recipe
   * @param stepId The step to be removed
   */
  public removeRecipeStep(stepId: string): RecipeStep {
    const index = this._steps.findIndex((x) => x.id === stepId);
    if (index === -1)
      throw new Error(`The Recipe Step ID ${stepId} is invalid`);
    return this._steps.splice(index, 1)[0];
  }

  /**
   * Adds an ingredient to the list
   * @param ingredient Ingredient to be added
   */
  public addIngredient(ingredient: Ingredient) {
    if (this._ingredients.some((x) => x.name === ingredient.name)) {
      throw new Error(
        `Tried to add ingredient, found that name "${ingredient.name}" already existed`
      );
    }
    this._ingredients.push(ingredient);
  }

  /**
   * Removed an ingredient from the list
   * @param ingredientName Ingredient to be removed
   */
  public removeIngredient(ingredientName: string) {
    if (!this._ingredients.some((x) => x.name === ingredientName)) {
      throw new Error(
        `Tried to remove ingredient with name ${ingredientName}, but it does not exist`
      );
    }
    const index = this._ingredients.findIndex((x) => x.name === ingredientName);
    this._ingredients.splice(index, 1);
  }

  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  public get steps(): RecipeStep[] {
    return this._steps;
  }

  public toJson(): string {
    const retVal: SerializableRecipe = {
      ingredients: this._ingredients,
      steps: this._steps,
    };
    return JSON.stringify(retVal);
  }

  public static Deserialize(json: string): Recipe {
    const thing = new Recipe();
    const value: SerializableRecipe = JSON.parse(json);
    thing._ingredients = value.ingredients;
    thing._steps = value.steps;
    return thing;
  }
}

interface SerializableRecipe {
  ingredients: Ingredient[];
  steps: RecipeStep[];
}
