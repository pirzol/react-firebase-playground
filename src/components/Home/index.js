import React from "react";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>the home page is only accessible by signed in users</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification
)(HomePage);