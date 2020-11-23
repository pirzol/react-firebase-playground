import React, { Component } from "react";
import { compose } from "recompose";
import { Switch, Route, Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import { withAuthorization, withEmailVerification } from "../Session";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const AdminPage = () => (
  <div>
    <h2>Admin</h2>
    <p>The admin page is available for every signed in admin user.</p>

    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

class UserItemBase extends Component {
  state = {
    loading: false,
    user: null,
    ...this.props.location.state,
  };

  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", (snapshot) => {
        console.log(snapshot.val());
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading...</div>}
        {user && (
          <div>
            <p>
              <strong>ID:</strong>
              {user.uid}
            </p>
            <p>
              <strong>E-Mail:</strong>
              {user.email}
            </p>
            <p>
              <strong>Username:</strong>
              {user.username}
            </p>
            <p>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send password reset
              </button>
            </p>
          </div>
        )}
      </div>
    );
  }
}

class UserListBase extends Component {
  state = {
    loading: false,
    users: [],
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading...</div>}
        <ul>
          {users.map((user) => (
            <li key={user.uid}>
              {user.email}
              <p>
                <strong>id:</strong>
                {user.uid}
              </p>
              <p>
                <strong>e-mail:</strong>
                {user.email}
              </p>
              <p>
                <strong>username:</strong>
                {user.username}
              </p>
              <p>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN}/${user.uid}`,
                    state: { user },
                  }}
                >
                  Details
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AdminPage);
