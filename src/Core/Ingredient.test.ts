import {
  Ingredient,
  ValidateIngredient,
  IngredientValidationMessages,
} from "./Ingredient";

describe("ValidateIngredient", () => {
  test("Should return error if name is whitespace", () => {
    //Assemble
    const ingredient: Ingredient = {
      name: "",
      notes: "",
      quantity: "0",
    };

    //Act
    const result = ValidateIngredient(ingredient);

    //Assert
    expect(result.name?.message).toContain(
      IngredientValidationMessages.NameRequired
    );
  });
});
