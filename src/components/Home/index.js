import React from "react";

import { withAuthorization } from "../Session";

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>the home page is only accessible by signed in users</p>
  </div>
);

const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
