import UuidValidate from "uuid-validate";

export interface Ingredient {
  id: string;
  name: string;
  notes: string;
  quantity: string;
}

export interface IngredientValidation {
  id?: string;
  name?: string;
}

export const IngredientValidationMessages = {
  IdInvalid: "Invalid UUID",
  NameRequired: "Required",
};

export const ValidateIngredient = (
  ingredient: Ingredient
): IngredientValidation => {
  const retVal: IngredientValidation = {};
  if (!UuidValidate(ingredient.id, 4)) {
    retVal.id = IngredientValidationMessages.IdInvalid;
  }
  if (!ingredient.name || ingredient.name.trim() === "") {
    retVal.name = IngredientValidationMessages.NameRequired;
  }

  return retVal;
};
