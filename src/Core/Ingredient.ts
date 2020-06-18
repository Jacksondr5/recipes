export interface Ingredient {
  name: string;
  notes: string;
  quantity: string;
}

export interface IngredientValidation {
  name?: string;
}

export const IngredientValidationMessages = { NameRequired: "Required" };

export const ValidateIngredient = (
  ingredient: Ingredient
): IngredientValidation => {
  const retVal: IngredientValidation = {};
  if (!ingredient.name || ingredient.name.trim() === "") {
    retVal.name = IngredientValidationMessages.NameRequired;
  }

  return retVal;
};
