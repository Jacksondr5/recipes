import Joi, { ValidationResult, CustomHelpers } from "@hapi/joi";
import UuidValidate from "uuid-validate";

const detailsSchema = Joi.string().allow("").label("Step Details");
const idValidator = (value: string, helpers: CustomHelpers) =>
  !UuidValidate(value, 4) ? helpers.error("any.invalid") : value;
const idSchema = Joi.string().custom(idValidator).label("Step ID");
const titleSchema = Joi.string().min(1).label("Step Title");

const RecipeStepSchema = Joi.object({
  details: detailsSchema,
  id: idSchema,
  title: titleSchema,
});

export interface RecipeStep {
  details: string;
  id: string;
  title: string;
}

export const ValidateRecipeStep = (recipeStep: RecipeStep): ValidationResult =>
  RecipeStepSchema.validate(recipeStep);
