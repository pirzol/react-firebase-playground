import React from "react";

import { FirebaseContext } from "../Firebase";

const LandingPage = () => {
  return (
    <FirebaseContext.Consumer>
      {(firebase) => {
        return <LandingPageBase firebase={firebase} />;
      }}
    </FirebaseContext.Consumer>
  );
};
class LandingPageBase extends React.Component {
  // for testing purposes
  handleOnClick = (e) => {
    console.log("firebase");
      this.props.firebase
          .doCreateUserWithEmailAndPassword("ori.shmolovsly@gmail.com", "orish123")
          .catch(error => console.log(error));
  };

  render() {
    return <button onClick={(e) => this.handleOnClick(e)}>test</button>;
  }
}

export default LandingPage;
