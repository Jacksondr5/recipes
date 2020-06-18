import React from "react";
import { RecipeStep, ValidateRecipeStep } from "../Core/RecipeStep";
import {
  makeStyles,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core";

/** The props for the RecipeStepForm */
export interface RecipeStepFormProps {
  /** Function called when the RecipeStep's data changes */
  onRecipeStepChanged: (
    step: RecipeStep,
    predecessorIds: string[],
    successorIds: string[]
  ) => void;
  /** Called when the RecipeStep is saved */
  onRecipeStepSaved: (step: RecipeStep) => void;
  /** The other RecipeSteps involved in the Recipe */
  otherSteps: RecipeStep[];
  /** ID's of steps that come before the current step */
  predecessorIds: string[];
  /** Flag for whether or not to render multiline (testing issue) */
  shouldRenderMultiline: boolean;
  /** The RecipeStep being edited by the form */
  step: RecipeStep;
  /** ID's of steps that come after the current step */
  successorIds: string[];
}

interface RelatedStep {
  step: RecipeStep;
  isSelected: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
  })
);
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const getSelectItemStyle = (theme: Theme, itemIsSelected: boolean) => ({
  fontWeight: itemIsSelected
    ? theme.typography.fontWeightRegular
    : theme.typography.fontWeightMedium,
});

const RecipeStepForm: React.SFC<RecipeStepFormProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const onRecipeStepInfoChanged = (propName: string) => (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { value: unknown }
    >
  ) =>
    props.onRecipeStepChanged(
      {
        ...props.step,
        [propName]: e.target.value,
      },
      props.predecessorIds,
      props.successorIds
    );
  const stepValidation = ValidateRecipeStep(props.step);
  const erorrList =
    stepValidation.id !== undefined ? (
      <Typography variant="body1">{stepValidation.id}</Typography>
    ) : null;
  return (
    <div>
      {erorrList}
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="title-field"
          label="Title"
          required={true}
          onChange={onRecipeStepInfoChanged("title")}
          value={props.step.title}
          error={stepValidation.title !== undefined}
          helperText={stepValidation.title}
        />
        <TextField
          id="details-feild"
          label="Details"
          multiline={props.shouldRenderMultiline}
          inputProps={{ inputComponent: "textarea" }}
          rowsMax={4}
          onChange={onRecipeStepInfoChanged("details")}
          value={props.step.details}
        />
        {RelatedStepSelect(
          props.otherSteps.map<RelatedStep>((x) => ({
            step: x,
            isSelected: props.predecessorIds.includes(x.id),
          })),
          "Predecessors",
          classes,
          theme,
          (x) => props.onRecipeStepChanged(props.step, x, props.successorIds)
        )}
        {RelatedStepSelect(
          props.otherSteps.map<RelatedStep>((x) => ({
            step: x,
            isSelected: props.successorIds.includes(x.id),
          })),
          "Successors",
          classes,
          theme,
          (x) => props.onRecipeStepChanged(props.step, props.predecessorIds, x)
        )}
      </form>
    </div>
  );
};

const RelatedStepSelect = (
  relatedSteps: RelatedStep[],
  label: string,
  classes: Record<"chips" | "chip", string>,
  theme: Theme,
  onChange: (newSelectedStepIds: string[]) => void
) => (
  <FormControl>
    <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
    <Select
      labelId={`${label}-select-label`}
      multiple
      value={relatedSteps.filter((x) => x.isSelected).map((x) => x.step)}
      onChange={(e) => onChange(e.target.value as string[])}
      input={<Input id="select-multiple-chip" />}
      MenuProps={MenuProps}
      renderValue={(selected) => (
        <div className={classes.chips}>
          {(selected as RecipeStep[]).map((step) => (
            <Chip key={step.id} label={step.title} className={classes.chip} />
          ))}
        </div>
      )}
    >
      {relatedSteps.map((relatedStep) => (
        <MenuItem
          key={relatedStep.step.id}
          value={relatedStep.step.title}
          style={getSelectItemStyle(theme, relatedStep.isSelected)}
        >
          {relatedStep.step.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default RecipeStepForm;
