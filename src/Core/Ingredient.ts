import { ValidationError } from "./ValidationError";

export interface Ingredient {
  name: string;
  notes: string;
  quantity: string;
}

export interface IngredientValidation {
  name?: ValidationError;
}

export const IngredientValidationMessages = { NameRequired: "Required" };

export const ValidateIngredient = (
  ingredient: Ingredient
): IngredientValidation => {
  const retVal: IngredientValidation = {};
  if (!ingredient.name || ingredient.name.trim() === "")
    retVal.name = {
      propName: "name",
      message: IngredientValidationMessages.NameRequired,
    };
  return retVal;
};
