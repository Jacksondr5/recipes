import Recipe from "./Recipe";
import { RecipeStep } from "./RecipeStep";
import { v4 as uuidv4 } from "uuid";
import { Ingredient } from "./Ingredient";

describe("Recipe", () => {
  test("Constructor should set default values", () => {
    //Act
    const actual = new Recipe();

    //Assert
    expect(actual.ingredients).toHaveLength(0);
    expect(actual.steps.nodeCount()).toBe(0);
  });
  describe("AddRecipeStep", () => {
    test("Should add RecipeStep to recipe", () => {
      //Assemble
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };
      const recipe = new Recipe();

      //Act
      recipe.addRecipeStep(step);

      //Assert
      expect(recipe.steps.hasNode(step.id)).toBe(true);
    });
    test("Should throw Error if linked step does not exist", () => {
      //Assemble
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };
      const recipe = new Recipe();

      //Act
      expect(() => recipe.addRecipeStep(step, ["fake id"])).toThrowError();
      expect(() => recipe.addRecipeStep(step, [], ["fake id"])).toThrowError();
    });

    test("Should add predecessor step", () => {
      //Assemble
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      const recipe = new Recipe();
      const target: RecipeStep = { details: "", id: uuidv4(), title: "target" };
      recipe.addRecipeStep(predecessor);

      //Act
      recipe.addRecipeStep(target, [predecessor.id]);

      //Assert
      expect(recipe.steps.predecessors(target.id)).toContain(predecessor.id);
    });

    test("Should add successor step", () => {
      //Assemble
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      const recipe = new Recipe();
      const target: RecipeStep = { details: "", id: uuidv4(), title: "target" };
      recipe.addRecipeStep(successor);

      //Act
      recipe.addRecipeStep(target, [], [successor.id]);

      //Assert
      expect(recipe.steps.successors(target.id)).toContain(successor.id);
    });
  });
  describe("AddRecipeStepOnEdge", () => {
    test("Should add step", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor, [predecessor.id]);
      const target: RecipeStep = { details: "", id: uuidv4(), title: "target" };

      //Act
      recipe.addRecipeStepOnEdge(target, predecessor.id, successor.id);

      //Assert
      expect(recipe.steps.hasNode(target.id)).toBe(true);
    });
    test("Should remove existing edge", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor, [predecessor.id]);
      const target: RecipeStep = { details: "", id: uuidv4(), title: "target" };

      //Act
      recipe.addRecipeStepOnEdge(target, predecessor.id, successor.id);

      //Assert
      expect(recipe.steps.hasEdge(predecessor.id, successor.id)).toBe(false);
    });
    test("Should create edges to previously joined steps", () => {
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor, [predecessor.id]);
      const target: RecipeStep = { details: "", id: uuidv4(), title: "target" };

      //Act
      recipe.addRecipeStepOnEdge(target, predecessor.id, successor.id);

      //Assert
      expect(recipe.steps.predecessors(target.id)).toContain(predecessor.id);
      expect(recipe.steps.successors(target.id)).toContain(successor.id);
    });
    test("Should throw error if edge does not exist", () => {
      //Assemble
      const recipe = new Recipe();
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };

      //Act
      expect(() =>
        recipe.addRecipeStepOnEdge(step, "fake predecessor", "fake successor")
      ).toThrowError();
    });
  });
  describe("LinkSteps", () => {
    test("Should create edge between existing steps", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor, [predecessor.id]);

      //Act
      recipe.linkSteps(predecessor.id, successor.id);

      //Assert
      expect(recipe.steps.hasEdge({ v: predecessor.id, w: successor.id })).toBe(
        true
      );
    });
    test("Should throw error if step does not exist", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor, [predecessor.id]);

      //Act
      recipe.linkSteps(predecessor.id, successor.id);

      //Assert
      expect(() => recipe.linkSteps("fake step", successor.id)).toThrowError();
      expect(() =>
        recipe.linkSteps(predecessor.id, "fake step")
      ).toThrowError();
    });
  });
  describe("UnlinkSteps", () => {
    test("Should remove edge between existing steps", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor, [predecessor.id]);

      //Act
      recipe.unlinkSteps(predecessor.id, successor.id);

      //Assert
      expect(recipe.steps.hasEdge(predecessor.id, successor.id)).toBe(false);
    });
    test("Should throw error if step does not exist", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);

      //Act
      expect(() =>
        recipe.unlinkSteps(predecessor.id, "fake step")
      ).toThrowError();
    });
    test("Should throw error if edge does not exist", () => {
      //Assemble
      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      recipe.addRecipeStep(predecessor);
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(successor);

      //Act
      expect(() =>
        recipe.unlinkSteps(predecessor.id, successor.id)
      ).toThrowError();
    });
  });
  describe("RemoveRecipeStep", () => {
    test("Should remove RecipeStep", () => {
      //Assemble
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };
      const recipe = new Recipe();
      recipe.addRecipeStep(step);

      //Act
      recipe.removeRecipeStep(step.id);

      //Assert
      expect(recipe.steps.hasNode(step.id)).toBe(false);
    });
    test("Should link preceeding and subsequent steps", () => {
      //Assemble

      const recipe = new Recipe();
      const predecessor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "predecessor",
      };
      const target: RecipeStep = { details: "", id: uuidv4(), title: "target" };
      const successor: RecipeStep = {
        details: "",
        id: uuidv4(),
        title: "successor",
      };
      recipe.addRecipeStep(predecessor);
      recipe.addRecipeStep(target, [predecessor.id]);
      recipe.addRecipeStep(successor, [target.id]);

      //Act
      recipe.removeRecipeStep(target.id);

      expect(recipe.steps.successors(predecessor.id)).toContain(successor.id);
    });
    test("Should throw Error if RecipeStep does not exist", () => {
      //Assemble
      const recipe = new Recipe();

      //Act
      expect(() => recipe.removeRecipeStep("not a step")).toThrowError();
    });
  });
  describe("AddIngredient", () => {
    test("Should add Ingredient", () => {
      //Assemble
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        name: "ingredient",
        notes: "",
        quantity: "",
      };

      //Act
      recipe.addIngredient(ingredient);

      //Assert
      expect(recipe.ingredients).toContain(ingredient);
    });
    test("Should throw error if ingredient already exists", () => {
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        name: "ingredient",
        notes: "",
        quantity: "",
      };
      recipe.addIngredient(ingredient);

      //Act
      expect(() => recipe.addIngredient(ingredient)).toThrowError();
    });
  });
  describe("RemoveIngredient", () => {
    test("Should remove Ingredient", () => {
      //Assemble
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        name: "ingredient",
        notes: "",
        quantity: "",
      };
      recipe.addIngredient(ingredient);

      //Act
      recipe.removeIngredient(ingredient.name);

      //Assert
      expect(recipe.ingredients).not.toContain(ingredient);
    });
    test("Should throw Error if Ingredient does not exist", () => {
      //Assemble
      const recipe = new Recipe();

      //Act
      expect(() => recipe.removeIngredient("fake ingredient")).toThrowError();
    });
  });
  describe("Serialize", () => {
    test("Should return JSON serialization", () => {
      //Assemble
      const recipe = new Recipe();
      const ingredient: Ingredient = {
        name: "ingredient",
        notes: "",
        quantity: "",
      };
      recipe.addIngredient(ingredient);
      const step: RecipeStep = { details: "", id: uuidv4(), title: "title" };
      recipe.addRecipeStep(step);

      //Act
      const actual = recipe.toJson();

      //Assert
      expect(typeof actual).toBe("string");
    });
  });

  // describe("Deserialize", () => {
  //   test("Should return Recipe", () => {
  //     //Assemble
  //     const expected = new Recipe();
  //     const ingredient = new Ingredient("ingredient");
  //     expected.addIngredient(ingredient);
  //     const step = new RecipeStep("step");
  //     expected.addRecipeStep(step);
  //     const json = expected.toJson();

  //     //Act
  //     const actual = Recipe.Deserialize(json);

  //     //Assert
  //     expect(actual).toBe(expected);
  //   });
  // });
});
