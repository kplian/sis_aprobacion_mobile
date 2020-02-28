import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';

const AuthButton = () => {
    let history = useHistory();
    const {userContext, setUserContext} = useContext(UserContext);
  
    return (
        <div>
            <button
            onClick={() => {
                setUserContext(null);
                localStorage.removeItem('auth');
                history.push("/login");
            }}
            >
                Sign out
            </button>
        </div>
    );        
};

export default AuthButton;