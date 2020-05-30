import React, { Dispatch, SetStateAction } from "react";
import { Ingredient, ValidateIngredient } from "../Core/Ingredient";
import { TextField, Button, makeStyles } from "@material-ui/core";

export interface IngredientFormProps {
  buttonLabel: string;
  ingredient: Ingredient;
  onNewIngredientChange: Dispatch<SetStateAction<Ingredient>>;
  onAddIngredientClick: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const IngredientForm: React.SFC<IngredientFormProps> = (props) => {
  const classes = useStyles();
  const newIngredientChange = (propName: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    props.onNewIngredientChange({
      ...props.ingredient,
      [propName]: e.target.value,
    });
  const ingredientValidation = ValidateIngredient(props.ingredient);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label="Name"
        required={true}
        onChange={newIngredientChange("name")}
        value={props.ingredient.name}
        error={ingredientValidation.name !== undefined}
        helperText={
          ingredientValidation.name && ingredientValidation.name?.message
        }
      ></TextField>
      <TextField
        label="Notes"
        onChange={newIngredientChange("notes")}
        value={props.ingredient.notes}
      ></TextField>
      <TextField
        label="Quantity"
        onChange={newIngredientChange("quantity")}
        value={props.ingredient.quantity}
      ></TextField>
      <Button
        variant="contained"
        onClick={(e) => props.onAddIngredientClick(props.ingredient)}
      >
        {props.buttonLabel}
      </Button>
    </form>
  );
};

export default IngredientForm;
