// src/components/Routes/Routes.js

import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// keeps a user from visiting the login or signup page if they are already logged in.
export const AuthRoute = ({ component: Component, path, exact }) => {
    const loggedIn = useSelector(state => !!state.session.user);

    return (
        <Route path={path} exact={exact} render={(props) => (
            !loggedIn ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" />
            )
        )} />
    );
};

// ensure users can only access certain routes/info if they are logged in
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const loggedIn = useSelector(state => !!state.session.user);

    return (
        <Route
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};