// src/components/MainPage/MainPage.js

import Fridge from "../Fridge/Fridge";
import RecipeGeneratorForm from "../RecipeGeneratorForm/RecipeGeneratorForm";
import './MainPage.css'
import tanfridgecropped from './Images/tanfridgecropped.png'
import GeneratedRecipes from "../GeneratedRecipes/GeneratedRecipes";
import {AiFillGithub} from 'react-icons/ai';
import IngredientsIndex from "../IngredientsIndex/IngredientsIndex";

function MainPage() {
    return (
        <div className='outer-container'>
        <div className="mainpage-container">
            <div className="fridge-img-container">
                <img src={tanfridgecropped} alt="Fridge" />
                <div className="overlay-div1">
                    <RecipeGeneratorForm />
                </div>
                <div className="overlay-div2">
                        <Fridge />
                </div>
                </div>
            <div className='ingredients-container'>
                <IngredientsIndex/>
            </div>
            <div className='gen-recipes-container'>
                <GeneratedRecipes/>
            </div>
        </div>
        <footer>
            <span className="footer-text">
                Copyright &copy; 2023 myFridge
            </span>
            <a href="https://github.com/LetsGitFunky/myFridge" className="icon-link">
                <AiFillGithub className="github-icon" />
            </a>
        </footer>
        </div>
    );
}

export default MainPage;