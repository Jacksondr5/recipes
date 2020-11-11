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

const recipe = new Recipe();
recipe.addIngredient(ingredientProps.ingredient);
recipe.addRecipeStep(recipeStepProps.otherSteps[0]);

export const recipeViewerProps: RecipeViewerProps = {
  recipe,
};

export const Default = () => <RecipeViewer {...recipeViewerProps} />;
export const MultipleSteps = () => (
  <RecipeViewer
    recipe={{
      ...recipeViewerProps,
      steps: [
        ...recipeViewerProps.recipe.steps,
        { details: "more details", id: "2", title: "Second Step" },
        { details: "more details", id: "3", title: "Third Step" },
        { details: "more details", id: "4", title: "Fourth Step" },
        { details: "more details", id: "5", title: "Fifth Step" },
        { details: "more details", id: "6", title: "Sixth Step" },
        { details: "more details", id: "7", title: "Seventh Step" },
      ],
    }}
  />
);
