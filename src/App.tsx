import {
  AppBar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RecipeViewer from "./Components/RecipeViewer";
import Recipe from "./Core/Recipe";
import HouseIcon from "@material-ui/icons/House";
import {
  Link as RouterLink,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App: React.FunctionComponent<any> = () => {
  const initialRecipeState: Recipe[] = [];
  const [recipes, setRecipes] = useState(initialRecipeState);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/Recipe/All`)
      .then((x) => x.json())
      .then((x) => setRecipes(x));
  }, []);
  console.log(process.env.REACT_APP_API_URL);
  const recipeUi = recipes.map((x, i) => (
    <Grid item xs={12} key={i}>
      <Card>
        <CardContent>
          <Typography variant="h3">
            <RouterLink to={`/recipe/${x.id}`}>{x.name}</RouterLink>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <Router>
      <AppBar position="static">
        <Button variant="contained" startIcon={<HouseIcon />}>
          <RouterLink to="/">Home</RouterLink>
        </Button>
      </AppBar>

      <Switch>
        <Route
          path="/recipe/:recipeId"
          render={({ match }) => (
            <RecipeViewer
              recipe={recipes.find((x) => x.id === match.params.recipeId)!}
            />
          )}
        />
        <Route path="/">{recipeUi}</Route>
      </Switch>
    </Router>
  );
};

export default App;
