import { RecipeStep } from "./RecipeStep";
import { Ingredient } from "./Ingredient";
import { Graph, json as GraphlibJson } from "graphlib";

/**
 * Represents a recipe, including the ingredients and steps
 */
export default class Recipe {
  private _ingredients: Ingredient[];
  private _steps: Graph;
  constructor() {
    this._ingredients = [];
    this._steps = new Graph();
  }

  /**
   * Adds a step to the recipe
   * @param step The step to be added
   * @param predecessorIds The ID of the step that should come before the added step
   * @param successorIds The ID of the step that should come after the added step
   */
  public addRecipeStep(
    step: RecipeStep,
    predecessorIds: string[] = [],
    successorIds: string[] = []
  ) {
    this.checkStepsExist(predecessorIds);
    this.checkStepsExist(successorIds);

    this._steps.setNode(step.id, step);
    for (const id of predecessorIds) {
      this.linkSteps(id, step.id);
    }
    for (const id of successorIds) {
      this.linkSteps(step.id, id);
    }
  }

  /**
   * Verifies that all the nods in a given list exist in the recipe
   * @param nodeIds A list of step IDs to verify
   */
  private checkStepsExist(nodeIds: string[]) {
    const fakeNodes: string[] = [];
    for (const id of nodeIds) {
      if (!this._steps.hasNode(id)) fakeNodes.push(id);
    }
    if (fakeNodes.length > 0)
      throw new Error(`Steps not found: ${fakeNodes.toString()}`);
  }

  /**
   * Adds a step on an edge.  Removes the edge between the given steps and
   * replaces it with edges joining the new step.
   * @param step The step to be added
   * @param predecessorId The predecessor step on the edge to add the step to
   * @param successorId The successor step on the edge to add the step to
   */
  public addRecipeStepOnEdge(
    step: RecipeStep,
    predecessorId: string,
    successorId: string
  ) {
    this.unlinkSteps(predecessorId, successorId);
    this.addRecipeStep(step, [predecessorId], [successorId]);
  }

  /**
   * Removes a step from the recipe
   * @param stepId The step to be removed
   */
  public removeRecipeStep(stepId: string) {
    this.checkStepsExist([stepId]);

    for (const predecessorId of this._steps.predecessors(stepId) || []) {
      for (const successorId of this._steps.successors(stepId) || []) {
        this._steps.setEdge(predecessorId, successorId);
      }
    }
    this._steps.removeNode(stepId);
  }

  /**
   * Link two steps together.
   * @param predecessorId The ID of the first step in the new link
   * @param successorId The ID of the second step in the new link
   */
  public linkSteps(predecessorId: string, successorId: string) {
    this.checkStepsExist([predecessorId, successorId]);
    this._steps.setEdge(predecessorId, successorId);
  }

  /**
   * Removes the link between two recipe steps
   * @param predecessorId The ID of the predecessor step
   * @param successorId The ID of the successor step
   */
  public unlinkSteps(predecessorId: string, successorId: string) {
    this.checkStepsExist([predecessorId, successorId]);
    if (!this._steps.hasEdge(predecessorId, successorId))
      throw new Error(
        `Tried to unlink steps, could not find edge: predecessor ${predecessorId}, successor: ${successorId}`
      );
    this._steps.removeEdge(predecessorId, successorId);
  }

  /**
   * Adds an ingredient to the list
   * @param ingredient Ingredient to be added
   */
  public addIngredient(ingredient: Ingredient) {
    if (this._ingredients.some((x) => x.name === ingredient.name))
      throw new Error(
        `Tried to add ingredient, found that name "${ingredient.name}" already existed`
      );
    this._ingredients.push(ingredient);
  }

  /**
   * Removed an ingredient from the list
   * @param ingredientName Ingredient to be removed
   */
  public removeIngredient(ingredientName: string) {
    if (!this._ingredients.some((x) => x.name === ingredientName))
      throw new Error(
        `Tried to remove ingredient with name ${ingredientName}, but it does not exist`
      );
    const index = this._ingredients.findIndex((x) => x.name === ingredientName);
    this._ingredients.splice(index, 1);
  }

  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  public get steps(): Graph {
    return this._steps;
  }

  public toJson(): string {
    const retVal: SerializableRecipe = {
      ingredients: this._ingredients,
      steps: GraphlibJson.write(this._steps),
    };
    return JSON.stringify(retVal);
  }

  public static Deserialize(json: string): Recipe {
    const thing = new Recipe();
    const value: SerializableRecipe = JSON.parse(json);
    thing._ingredients = value.ingredients;
    thing._steps = GraphlibJson.read(value.steps);
    return thing;
  }
}

interface SerializableRecipe {
  ingredients: Ingredient[];
  steps: Object;
}
