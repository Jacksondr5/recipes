import React from "react";
import { Ingredient } from "../Core/Ingredient";
import {
  List,
  makeStyles,
  createStyles,
  Theme,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography,
} from "@material-ui/core";

export interface IngredientListProps {
  ingredients: IngredientChecklistItem[];
  setIngredientList: React.Dispatch<
    React.SetStateAction<IngredientChecklistItem[]>
  >;
}

export interface IngredientChecklistItem {
  ingredient: Ingredient;
  isChecked: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      "& hr": {
        margin: theme.spacing(0, 0.5),
      },
    },
  })
);

const IngredientList: React.FunctionComponent<IngredientListProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {props.ingredients.map((x, i) => {
        const labelId = `checkbox-list-label-${x.ingredient.id}`;
        const primaryText = (
          <Typography display="inline" variant="h6">
            {`${x.ingredient.name} | ${x.ingredient.quantity}`}
          </Typography>
        );
        return (
          <ListItem key={x.ingredient.id} role={undefined} divider>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={x.isChecked}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
                onChange={() =>
                  props.setIngredientList((prevState) => {
                    prevState[i].isChecked = !prevState[i].isChecked;
                    return prevState;
                  })
                }
              />
            </ListItemIcon>
            <ListItemText
              id={labelId}
              primary={primaryText}
              secondary={x.ingredient.notes}
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default IngredientList;
