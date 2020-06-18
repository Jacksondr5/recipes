import UuidValidate from "uuid-validate";

export interface RecipeStep {
  details: string;
  id: string;
  title: string;
}

export interface RecipeStepValidation {
  id?: string;
  title?: string;
}

export const RecipeStepValidationMessages = {
  IdInvalid: "Invalid UUID",
  PredecessorStepDoesNotExist: "A predecessor step does not exist",
  PredecessorStepsInvalidId: "A predecessor step has an invalid UUID",
  SuccessorStepDoesNotExist: "A predecessor step does not exist",
  SuccessorStepsInvalidId: "A predecessor step has an invalid UUID",
  TitleRequired: "Required",
};

export const ValidateRecipeStep = (
  recipeStep: RecipeStep
): RecipeStepValidation => {
  const retVal: RecipeStepValidation = {};
  if (!UuidValidate(recipeStep.id, 4)) {
    retVal.id = RecipeStepValidationMessages.IdInvalid;
  }
  if (!recipeStep.title || recipeStep.title.trim() === "") {
    retVal.title = RecipeStepValidationMessages.TitleRequired;
  }
  return retVal;
};
