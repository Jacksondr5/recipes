import React from "react";
import logo from "./logo.svg";
import { Button } from "@material-ui/core";
import RecipeBuilder from "./Components/RecipeBuilder";
import Recipe from "./Core/Recipe";

class App extends React.Component {
  recipe: Recipe;
  constructor(parameters) {
    super(parameters);
    this.recipe = new Recipe();
  }

  render() {
    return <div></div>;
  }
}

export default App;
