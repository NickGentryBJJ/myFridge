// src/components/NavBar/NavBar.js

import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import { NavLink } from 'react-router-dom/';
import cheficon from './Images/cheficon.png'


function NavBar () {
    const loggedIn = useSelector(state => !!state.session.user);
    const dispatch = useDispatch();
    


    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav">
                    <NavLink className="nav-button" exact to={'/about'}>About</NavLink>
                    <NavLink className="nav-button" exact to={'/'}>myFridge</NavLink>
                    <NavLink className="nav-button" exact to={'/saved'}>Saved Recipes</NavLink>

                    <button className="nav-button" id="logout-button" onClick={logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <NavLink className="nav-button" exact to={'/about'}>About</NavLink>
                    <NavLink className="nav-button" exact to={'/signup'}>Signup</NavLink>
                    <NavLink className="nav-button" exact to={'/login'}>Login</NavLink>
                </div>
            );
        }
    }

    return (
        <div className="navbar">
            <div className="left-section">
            <a href="/" id="myfridge-text">myFridge</a>
                <img className="chef-icon" src={cheficon} alt="Chef Icon" />
                <span id="tagline-nav">Your quick and easy recipe generator!</span>
            </div>
            <div className="right-section">
                {getLinks()}
            </div>
        </div>
    );
}

export default NavBar;