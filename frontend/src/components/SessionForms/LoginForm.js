// src/components/SessionForms/LoginForm.js

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './LoginForm.css';
import bluefridge from './Images/bluefridge.jpg'

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(clearSessionErrors());
        };
    }, [dispatch]);

    const update = (field) => {
        const setState = field === 'email' ? setEmail : setPassword;
        return e => setState(e.currentTarget.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    }

    const handleLoginDemo = (e) => {
        e.preventDefault();

        const demoEmail = 'demo@user.io';
        const demoPassword = 'password';

        setEmail(demoEmail);
        setPassword(demoPassword);
        dispatch(login({ email: demoEmail, password: demoPassword }));

    }

    return (
        <div className='form-container'>
            <form className="session-form" onSubmit={handleSubmit}>
                <div className='chef-img-container'>
                        <img src="https://png.pngtree.com/png-clipart/20230218/original/pngtree-cartoon-chef-with-a-confident-pose-png-image_8958326.png"/>
                </div>
                <h2 id="login-title-text">Log in to myFridge</h2>
                <p>Let's get cookin'!</p>
                <div className="errors">{errors?.email}</div>
                <label id="login-email">
                    <span>Email</span>
                    <br/>
                    <input type="text"
                        value={email}
                        onChange={update('email')}
                        placeholder="Email"
                    />
                </label>
                <div className="errors">{errors?.password}</div>
                <label>
                    <span>Password</span>
                    <br/>
                    <input type="password"
                        value={password}
                        onChange={update('password')}
                        placeholder="Password"
                    />
                </label>
                <br/>
                <div className='login-button-container'>
                    <button onClick={handleLoginDemo} id="login-demo-button" type="submit">Demo User</button>
                    <input
                        type="submit"
                        value="Log In"
                    />
                </div>
            </form>
            <div className='signup-fridge-img-container'>
                <img src={bluefridge} />
            </div>
        </div>
    );
}

export default LoginForm;
