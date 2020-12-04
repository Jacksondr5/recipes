import React from "react";
import { v4 as uuid } from "uuid";

import IngredientList, { IngredientListProps } from "./IngredientList";

export default {
  component: IngredientList,
  title: "IngredientList",
  excludeStories: /.*Props$/,
};

export const ingredientListProps: IngredientListProps = {
  ingredients: [
    {
      ingredient: {
        id: uuid(),
        name: "Apple",
        notes: "Get good ones",
        quantity: "3",
      },
      isChecked: false,
    },
    {
      ingredient: {
        id: uuid(),
        name: "Unsalted Butter",
        notes: "",
        quantity: "2 tbsp.",
      },
      isChecked: false,
    },
    {
      ingredient: { id: uuid(), name: "Bosch Pears", notes: "", quantity: "4" },
      isChecked: false,
    },
  ],
  setIngredientList: () => 5,
};

export const NothingChecked = () => <IngredientList {...ingredientListProps} />;

const oneCheckedingredientListProps: IngredientListProps = {
  ingredients: [
    {
      ingredient: {
        id: uuid(),
        name: "Apple",
        notes: "Get good ones",
        quantity: "3",
      },
      isChecked: false,
    },
    {
      ingredient: {
        id: uuid(),
        name: "Unsalted Butter",
        notes: "",
        quantity: "2 tbsp.",
      },
      isChecked: true,
    },
    {
      ingredient: { id: uuid(), name: "Bosch Pears", notes: "", quantity: "4" },
      isChecked: false,
    },
  ],
  setIngredientList: () => 5,
};

export const OneItemChecked = () => (
  <IngredientList {...oneCheckedingredientListProps} />
);

const allCheckedingredientListProps: IngredientListProps = {
  ingredients: [
    {
      ingredient: {
        id: uuid(),
        name: "Apple",
        notes: "Get good ones",
        quantity: "3",
      },
      isChecked: true,
    },
    {
      ingredient: {
        id: uuid(),
        name: "Unsalted Butter",
        notes: "",
        quantity: "2 tbsp.",
      },
      isChecked: true,
    },
    {
      ingredient: { id: uuid(), name: "Bosch Pears", notes: "", quantity: "4" },
      isChecked: true,
    },
  ],
  setIngredientList: () => 5,
};

export const AllItemsChecked = () => (
  <IngredientList {...allCheckedingredientListProps} />
);
const moreIngredients = [
  ...ingredientListProps.ingredients,
  {
    ingredient: { id: uuid(), name: "Leeks", notes: "", quantity: "2" },
    isChecked: true,
  },
  {
    ingredient: {
      id: uuid(),
      name: "Cereal",
      notes: "",
      quantity: "1 small box",
    },
    isChecked: false,
  },
  {
    ingredient: {
      id: uuid(),
      name: "Ground beef",
      notes: "USDA Prime",
      quantity: "1 lb.",
    },
    isChecked: true,
  },
];
export const LotsOfIngredients = () => (
  <IngredientList {...ingredientListProps} ingredients={[...moreIngredients]} />
);
