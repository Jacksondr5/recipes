import React from "react";
import { action } from "@storybook/addon-actions";
import RecipeBuilder from "./RecipeBuilder";
import IngredientForm, { IngredientFormProps } from "./IngredientForm";

export default {
  component: RecipeBuilder,
  title: "RecipeBuilder",
  excludeStories: /.*Props$/,
};

export const ingredientProps: IngredientFormProps = {
  buttonLabel: "Save",
  ingredient: { name: "name", notes: "notes", quantity: "4" },
  onNewIngredientChange: action("onIngredientAdd"),
  onAddIngredientClick: action("onAddIngredientClick"),
};

export const Default = () => <IngredientForm {...ingredientProps} />;
export const Empty = () => (
  <IngredientForm
    {...ingredientProps}
    ingredient={{ name: "", notes: "", quantity: "" }}
  />
);
export const NoName = () => (
  <IngredientForm
    {...ingredientProps}
    ingredient={{ ...ingredientProps.ingredient, name: "" }}
  />
);
export const NoNotes = () => (
  <IngredientForm
    {...ingredientProps}
    ingredient={{ ...ingredientProps.ingredient, notes: "" }}
  />
);
export const NoQuantity = () => (
  <IngredientForm
    {...ingredientProps}
    ingredient={{ ...ingredientProps.ingredient, quantity: "" }}
  />
);
export const ButtonLabelIsAdd = () => (
  <IngredientForm {...ingredientProps} buttonLabel="Add Ingredient" />
);

//TODO: find out how to test the actions (that functions get called when you type)
//save button not clicked when form is invalid
