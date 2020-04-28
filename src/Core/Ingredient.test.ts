import Ingredient from "./Ingredient";

describe("Ingredient", () => {
  test("Constructor should use default values", () => {
    //Assemble
    const expectedNotes = "";
    const expectedQuantity = 0;

    //Act
    const actual = new Ingredient("test");

    //Assert
    expect(actual.notes).toBe(expectedNotes);
    expect(actual.quantity).toBe(expectedQuantity);
  });

  test("Should throw error if name is whitespace", () => {
    //Assemble
    const ingredient = new Ingredient("Valid");

    //Act
    expect(() => new Ingredient("")).toThrow();
    expect(() => (ingredient.name = "")).toThrow();
  });

  test("Should set name if value is valid", () => {
    //Assemble
    const ingredient = new Ingredient("name");
    const newName = "valid";

    //Act
    expect(() => (ingredient.name = newName)).not.toThrow();
    expect(ingredient.name).toBe(newName);
  });

  test("Should throw error if quantity is < 0", () => {
    //Assemble
    const ingredient = new Ingredient("test");

    //Act
    expect(() => new Ingredient("name", -1)).toThrow();
    expect(() => (ingredient.quantity = -1)).toThrow();
  });

  test("Should set quantity is value is valid", () => {
    const ingredient = new Ingredient("name");
    const newQuantity = 5;

    //Act
    expect(() => (ingredient.quantity = newQuantity)).not.toThrow();
    expect(ingredient.quantity).toBe(newQuantity);
  });
});
