import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../pages/Auth/UserContext';

// pages
import App from '../App';
import { Adquisiciones } from '../pages/Adquisiciones/Adquisiciones';


function PrivateRoute({ children, ...rest }) {
    const {userContext} = useContext(UserContext);

    return (
      <Route {...rest}
        render={({ location }) =>
           userContext ? (
            children
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }}
                />
            )}
      />
    );
};

const AppChildRoutes = () => {
    return (
        <Route component={({ match }) =>
            <div>
                <PrivateRoute path="/" exact>
                    <App/>
                </PrivateRoute>
                <PrivateRoute path="/adquisiciones" >
                    <Adquisiciones/>
                </PrivateRoute>
                <Route path='/page1' component={App} />
                <Route path='/page2' component={App} />
                <Route path='/page3' component={App} />
            </div>
       }/>
    )
}

export default AppChildRoutes;

