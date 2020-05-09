import RecipeStep from "./RecipeStep";
import UuidValidate from "uuid-validate";

describe("RecipeStep", () => {
  test("Constructor should create UUID", () => {
    //Act
    const recipeStep = new RecipeStep("title");

    //Assert
    UuidValidate(recipeStep.id, 4);
  });
  test("Should throw error is title is whitespace", () => {
    //Assemble
    const recipeStep = new RecipeStep("title");

    //Act
    expect(() => new RecipeStep("")).toThrow();
    expect(() => (recipeStep.title = "")).toThrow();
  });

  test("Should set title if value is valid", () => {
    //Assemble
    const recipeStep = new RecipeStep("title");
    const newTitle = "valid";

    //Act
    expect(() => (recipeStep.title = newTitle)).not.toThrow();
    expect(recipeStep.title).toBe(newTitle);
  });
});
