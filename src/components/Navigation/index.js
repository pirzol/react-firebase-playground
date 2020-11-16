import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";
import SignOutButton from "../SignOut";
import { AuthUserContext } from "../Session";

const Navigation = ({ authUser }) => (
  <div>
    <AuthUserContext.Consumer>
      {(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <ul>
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
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
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
  </ul>
);

export default Navigation;
