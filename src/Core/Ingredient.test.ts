import { v4 as uuidv4 } from "uuid";

import {
  Ingredient,
  ValidateIngredient,
  IngredientValidationMessages,
} from "./Ingredient";

describe("ValidateIngredient", () => {
  test("Should return error if name is whitespace", () => {
    //Assemble
    const ingredient: Ingredient = {
      id: uuidv4(),
      name: "",
      notes: "",
      quantity: "0",
    };

    //Act
    const result = ValidateIngredient(ingredient);

    //Assert
    expect(result.name).toBe(IngredientValidationMessages.NameRequired);
  });
  test("Should return error if id is not valid", () => {
    //Assemble
    const ingredient: Ingredient = {
      id: "not a valid uuid v4",
      name: "",
      notes: "",
      quantity: "0",
    };

    //Act
    const result = ValidateIngredient(ingredient);

    //Assert
    expect(result.id).toBe(IngredientValidationMessages.IdInvalid);
  });
});
