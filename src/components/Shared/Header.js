import React from 'react';

import { NavLink } from 'react-router-dom';
import Logout from '../../pages/Auth/Logout';

const Header = () => {
    return (
        <div>
            <div className="d-flex justify-content-between align-content-center">
                <h1>Kplian</h1>
                <div>
                    <NavLink to="/" className="nav-item nav-link">Clientes</NavLink>
                </div>
                <Logout/>

            </div>            
        </div>
    )
}

export default Header
