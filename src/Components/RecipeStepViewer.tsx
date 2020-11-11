import React from "react";
import Recipe from "../Core/Recipe";
import {
  Typography,
  Card,
  CardContent,
  GridList,
  GridListTile,
} from "@material-ui/core";

export interface RecipeViewerProps {
  recipe: Recipe;
}

const RecipeViewer: React.FunctionComponent<RecipeViewerProps> = (props) => {
  const steps = props.recipe.steps.map((x, i) => (
    <GridListTile key={i}>
      <Card>
        <CardContent>
          <Typography variant="h3">{x.title}</Typography>
          <Typography variant="body1">{x.details}</Typography>
        </CardContent>
      </Card>
    </GridListTile>
  ));
  return <GridList cols={1}>{steps}</GridList>;
};

export default RecipeViewer;
