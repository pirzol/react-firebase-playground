import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_API_ID,
};

// const env = "staging";
// const config = {
//   apiKey: "AIzaSyBmIciocPub2OUL8a2JKYdCjlkKSsryXHI",
//   databaseURL: "https://bookworm-webapp-dev.firebaseio.com",
//   projectId: "bookworm-webapp-dev",
//   appId: "1:959399073643:web:9d3757396976f44e2c9e2e",
// };

// const env = "production";
// const config = {
//   apiKey: "AIzaSyDDOyC3qXe8zWR6pQW4p9DXJDo4nSXy18g",
//   databaseURL: "https://bookworm-webapp.firebaseio.com",
//   projectId: "bookworm-webapp",
//   appId: "1:352954072681:web:1e6d6d5f181556e30aecf8",
// };

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.emailAuthProvider = app.auth.EmailAuthProvider();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.auth = app.auth();
    this.db = app.database();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();

    /* Helper */

    this.serverValue = app.database.ServerValue;
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  // *** User API

  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Message API

  message = (uid) => this.db.ref(`messages/${uid}`);
  messages = () => this.db.ref("messages");

  // *** TextsIndex API

  text = (uid) => this.db.ref(`texts/${uid}`);
  texts = () => this.db.ref("texts");

  // *** Merge Auth and DB User API

  onAuthUserListener = (next, fallback) => {
    this.auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot) => {
            const dbUser = snapshot.val();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });
  };
}

export default Firebase;
