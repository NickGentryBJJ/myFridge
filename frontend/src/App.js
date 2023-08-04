// src/App.js

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage';
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import RecipeShow from './components/RecipeShow/RecipeShow';
import GeneratedRecipes from './components/GeneratedRecipes/GeneratedRecipes';
import SavedRecipesIndex from './components/SavedRecipesIndex/SavedRecipesIndex';
import { getCurrentUser } from './store/session';
import Footer from './components/Footer/Footer';
import About from './components/About/About';




function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/about" component={About} />
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />

        <ProtectedRoute exact path="/" component={MainPage} />
        <ProtectedRoute exact path="/recipes" component={GeneratedRecipes} />
        <ProtectedRoute exact path="/recipes/:recipeId" component={RecipeShow} />
        <ProtectedRoute exact path="/saved" component={SavedRecipesIndex} />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
