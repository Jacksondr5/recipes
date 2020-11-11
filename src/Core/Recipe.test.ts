import Recipe from "./Recipe";
import { RecipeStep } from "./RecipeStep";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "./Ingredient";

describe("Recipe", () => {
  test("Constructor should set default values", () => {
    //Act
    const actual = new Recipe();

    //Assert
    expect(actual.ingredients).toHaveLength(0);
    expect(actual.steps).toHaveLength(0);
  });
  describe("AddRecipeStep", () => {
    test("Should add RecipeStep to recipe", () => {
      //Assemble
      const step: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "title",
      };
      const recipe = new Recipe();

      //Act
      recipe.addRecipeStep(step);

      //Assert
      expect(recipe.steps).toContain(step);
    });
    test("Should throw Error if index is invalid", () => {
      //Assemble
      const step: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "title",
      };
      const recipe = new Recipe();

      //Act
      expect(() => recipe.addRecipeStep(step, -5)).toThrowError();
      expect(() => recipe.addRecipeStep(step, 5)).toThrowError();
    });
    test("Should add step at index", () => {
      //Assemble
      const first: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "first",
      };
      const recipe = new Recipe();
      const third: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "third",
      };
      recipe.addRecipeStep(first);
      recipe.addRecipeStep(third);
      const second: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "third",
      };

      //Act
      recipe.addRecipeStep(second, 1);

      //Assert
      expect(recipe.steps).toContain(second);
      expect(recipe.steps[1]).toBe(second);
    });
  });
  describe("RemoveRecipeStep", () => {
    test("Should remove and return RecipeStep", () => {
      //Assemble
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };
      const recipe = new Recipe();
      recipe.addRecipeStep(step);

      //Act
      const actual = recipe.removeRecipeStep(step.id);

      //Assert
      expect(recipe.steps).not.toContain(step);
      expect(actual).toBe(step);
    });
    test("Should throw Error if RecipeStep does not exist", () => {
      //Assemble
      const recipe = new Recipe();

      //Act
      expect(() => recipe.removeRecipeStep("not a step")).toThrowError();
    });
  });
  describe("AddIngredient", () => {
    test("Should add Ingredient", () => {
      //Assemble
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        id: "1",
        name: "ingredient",
        notes: "",
        quantity: "",
      };

      //Act
      recipe.addIngredient(ingredient);

      //Assert
      expect(recipe.ingredients).toContain(ingredient);
    });
    test("Should throw error if ingredient already exists", () => {
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        id: "1",
        name: "ingredient",
        notes: "",
        quantity: "",
      };
      recipe.addIngredient(ingredient);

      //Act
      expect(() => recipe.addIngredient(ingredient)).toThrowError();
    });
  });
  describe("RemoveIngredient", () => {
    test("Should remove Ingredient", () => {
      //Assemble
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        id: "1",
        name: "ingredient",
        notes: "",
        quantity: "",
      };
      recipe.addIngredient(ingredient);

      //Act
      recipe.removeIngredient(ingredient.name);

      //Assert
      expect(recipe.ingredients).not.toContain(ingredient);
    });
    test("Should throw Error if Ingredient does not exist", () => {
      //Assemble
      const recipe = new Recipe();

      //Act
      expect(() => recipe.removeIngredient("fake ingredient")).toThrowError();
    });
  });
  describe("Serialize", () => {
    test("Should return JSON serialization", () => {
      //Assemble
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        id: "1",
        name: "ingredient",
        notes: "",
        quantity: "",
      };
      recipe.addIngredient(ingredient);
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };
      recipe.addRecipeStep(step);

      //Act
      const actual = recipe.toJson();

      //Assert
      expect(typeof actual).toBe("string");
    });
  });

  // describe("Deserialize", () => {
  //   test("Should return Recipe", () => {
  //     //Assemble
  //     const expected = new Recipe();
  //     const ingredient = new Ingredient("ingredient");
  //     expected.addIngredient(ingredient);
  //     const step = new RecipeStep("step");
  //     expected.addRecipeStep(step);
  //     const json = expected.toJson();

  //     //Act
  //     const actual = Recipe.Deserialize(json);

  //     //Assert
  //     expect(actual).toBe(expected);
  //   });
  // });
});
