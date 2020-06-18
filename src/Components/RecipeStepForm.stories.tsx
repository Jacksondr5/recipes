import React from "react";
import { action } from "@storybook/addon-actions";
import RecipeStepForm, { RecipeStepFormProps } from "./RecipeStepForm";
import { v4 as uuid } from "uuid";
import { RecipeStep } from "../Core/RecipeStep";

export default {
  component: RecipeStepForm,
  title: "RecipeStepForm",
  excludeStories: /.*Props$/,
};

const otherSteps: RecipeStep[] = [
  { details: "some details", id: uuid(), title: "First Step" },
  { details: "some other details", id: uuid(), title: "Predecessor Step 1" },
  { details: "some more details", id: uuid(), title: "Predecessor Step 2" },
  { details: "even more details", id: uuid(), title: "Successor Step 1" },
];

export const recipeStepProps: RecipeStepFormProps = {
  onRecipeStepChanged: action("onRecipeStepChanged"),
  onRecipeStepSaved: action("onRecipeStepSaved"),
  otherSteps: otherSteps,
  predecessorIds: [otherSteps[1].id, otherSteps[2].id],
  shouldRenderMultiline: false,
  step: { details: "some details", id: uuid(), title: "Some title" },
  successorIds: [otherSteps[3].id],
};

export const Default = () => <RecipeStepForm {...recipeStepProps} />;
export const Empty = () => (
  <RecipeStepForm
    {...recipeStepProps}
    step={{ details: "", id: uuid(), title: "" }}
  />
);
export const InvalidId = () => (
  <RecipeStepForm
    {...recipeStepProps}
    step={{ ...recipeStepProps.step, id: "" }}
  />
);
export const NoTitle = () => (
  <RecipeStepForm
    {...recipeStepProps}
    step={{ ...recipeStepProps.step, title: "" }}
  />
);
export const NoDetails = () => (
  <RecipeStepForm
    {...recipeStepProps}
    step={{ ...recipeStepProps.step, details: "" }}
  />
);
export const NoPredecessors = () => (
  <RecipeStepForm {...recipeStepProps} predecessorIds={[]} />
);
export const NoSuccessors = () => (
  <RecipeStepForm {...recipeStepProps} successorIds={[]} />
);
export const LotsOfDetails = () => (
  <RecipeStepForm
    {...recipeStepProps}
    step={{
      ...recipeStepProps.step,
      details:
        "First, you need to cut the tomatoes.  then, you need to put the tomatoes in a box.  Next, you need to take that box and put it in another box.  Lastly, take that final box and throw it away, because what are we meant to do with inceptual boxes of tomatoes?  That's just silly.",
    }}
  />
);
