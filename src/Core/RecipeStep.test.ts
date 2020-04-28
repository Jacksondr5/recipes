import RecipeStep from "./RecipeStep";

describe("RecipeStep", () => {
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
