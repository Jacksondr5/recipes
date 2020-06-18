import React, { Dispatch, SetStateAction } from "react";
import { Ingredient, ValidateIngredient } from "../Core/Ingredient";
import { TextField, Button, makeStyles } from "@material-ui/core";

/** The props for the IngredientForm */
export interface IngredientFormProps {
  /** The label for the save button */
  buttonLabel: string;
  /** The ingredient currently being edited */
  ingredient: Ingredient;
  /** Called when data on the current ingredient changes */
  onNewIngredientChange: Dispatch<SetStateAction<Ingredient>>;
  /** Called when the save button is clicked */
  onSaveIngredientClick: any;
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
        id="name-field"
        label="Name"
        required={true}
        onChange={newIngredientChange("name")}
        value={props.ingredient.name}
        error={ingredientValidation.name !== undefined}
        helperText={ingredientValidation.name}
      ></TextField>
      <TextField
        id="notes-field"
        label="Notes"
        onChange={newIngredientChange("notes")}
        value={props.ingredient.notes}
      ></TextField>
      <TextField
        id="quantity-field"
        label="Quantity"
        onChange={newIngredientChange("quantity")}
        value={props.ingredient.quantity}
      ></TextField>
      <Button
        variant="contained"
        onClick={(e) => props.onSaveIngredientClick(props.ingredient)}
      >
        {props.buttonLabel}
      </Button>
    </form>
  );
};

export default IngredientForm;
