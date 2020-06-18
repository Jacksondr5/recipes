import {
  RecipeStep,
  ValidateRecipeStep,
  RecipeStepValidationMessages,
} from "./RecipeStep";
import { v4 as uuidv4 } from "uuid";

describe("ValidateRecipeStep", () => {
  test("Should return error if title is empty", () => {
    //Assemble
    const recipeStep: RecipeStep = {
      details: "",
      id: uuidv4(),
      title: "",
    };

    //Act
    const result = ValidateRecipeStep(recipeStep);

    //Assert
    expect(result.title).toBe(RecipeStepValidationMessages.TitleRequired);
  });

  test("Should return error if id is not valid", () => {
    //Assemble
    const recipeStep: RecipeStep = {
      details: "",
      id: "not a uuid V4",
      title: "",
    };

    //Act
    const result = ValidateRecipeStep(recipeStep);

    //Assert
    expect(result.id).toBe(RecipeStepValidationMessages.IdInvalid);
  });
});
