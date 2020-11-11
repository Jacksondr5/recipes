import React from "react";
import RecipeViewer, { RecipeViewerProps } from "./RecipeStepViewer";
import { ingredientProps } from "./IngredientForm.stories";
import { recipeStepProps } from "./RecipeStepForm.stories";
import Recipe from "../Core/Recipe";

export default {
  component: RecipeViewer,
  title: "RecipeViewer",
  excludeStories: /.*Props$/,
};

var recipe = new Recipe();
recipe.addIngredient(ingredientProps.ingredient);
recipe.addRecipeStep(recipeStepProps.otherSteps[0]);

export const recipeViewerProps: RecipeViewerProps = {
  recipe,
};

export const Default = () => <RecipeViewer {...recipeViewerProps} />;
recipe.addRecipeStep({
  details: "more details",
  id: "2",
  title: "Second Step",
});
recipe.addRecipeStep({ details: "more details", id: "3", title: "Third Step" });
recipe.addRecipeStep({
  details: "more details",
  id: "4",
  title: "Fourth Step",
});
recipe.addRecipeStep({ details: "more details", id: "5", title: "Fifth Step" });
recipe.addRecipeStep({ details: "more details", id: "6", title: "Sixth Step" });
recipe.addRecipeStep({
  details: "more details",
  id: "7",
  title: "Seventh Step",
});
export const MultipleSteps = () => <RecipeViewer {...recipeViewerProps} />;
