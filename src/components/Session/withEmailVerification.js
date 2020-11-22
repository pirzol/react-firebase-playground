import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../Firebase";

const withEmailVerification = (Component) => {
  class WithEmailVerification extends React.Component {
    state = { isSent: false };

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {(authUser) =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    Verify your E-Mail: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail or send another
                    confirmation E-Mail. Refresh this page once you confirmed
                    your E-Mail.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check your E-Mails (Spam folder
                    included) for a confirmation E-Mail or send another
                    confirmation E-Mail.
                  </p>
                )}
                <button
                  onClick={this.onSendEmailVerification()}
                  disabled={this.state.isSent}
                >
                  Send confitmation email
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

const needsEmailVerification = (authUser) =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map((provider) => provider.providerId)
    .includes("password");

export default withEmailVerification;
