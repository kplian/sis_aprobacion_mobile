import React, {useState, useMemo, useContext, useEffect } from 'react';
import { BrowserRouter, Route, Link, Switch, NavLink, Redirect } from "react-router-dom";

import Footer from '../components/Shared/Footer';
import Header from '../components/Shared/Header';

import NotFoundPage from '../components/NotFoundPage';
import { UserContext } from '../pages/Auth/UserContext';
import Login from '../pages/Auth/Login';
import App from '../App';
import Dashboard from '../pages/Dashboard/Dashboard';
import AppChildRoutes from './AppChildRoutes';



function Routes() {
    return (
        <Switch>
            <Route  path="/login" component={Login}/>
            <Dashboard>
                <AppChildRoutes/>                
            </Dashboard>
            <Route component={ NotFoundPage } />            
        </Switch>
    );
};

const AppRouter = () => {
    const [userContext, setUserContext] = useState(null);
    const value = useMemo(()=> ({userContext, setUserContext}), [userContext, setUserContext])

    const [countItems, setCountItems] = useState(0);
    const [items, setItems] = useState(0);

    const setValues = (products) => {        
        setCountItems(products.length);
        setItems(products);
        alert('Productos agregados');
    };

    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem('auth'));
        if( auth ) {
            console.log(auth);
            
            setUserContext(auth);
        }
    }, []); 
    
    return (
        <BrowserRouter>
            <UserContext.Provider value={value}>
                { userContext !== null ? (
                    <div className="h-screen">
                        {/*<header className="fixed-top bg-dark text-light p-3">
                            <Header/>
                        </header>*/}

                        <Routes/>

                    </div>
                ) : (
                    <Routes/>
                )}                   
            </UserContext.Provider>
        </BrowserRouter>
    );
};

export default AppRouter;