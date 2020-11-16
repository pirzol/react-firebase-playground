import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const Navigation = () => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_UP}>sign up</Link>
            </li>
            <li>
                <Link to={ROUTES.SIGN_IN}>sign in</Link>
            </li>
            <li>
                <Link to={ROUTES.LANDING}>landing</Link>
            </li>
            <li>
                <Link to={ROUTES.HOME}>home</Link>
            </li>
            <li>
                <Link to={ROUTES.ACCOUNT}>account</Link>
            </li>
            <li>
                <Link to={ROUTES.ADMIN}>admin</Link>
            </li>
        </ul>
    </div>
);

export default Navigation;