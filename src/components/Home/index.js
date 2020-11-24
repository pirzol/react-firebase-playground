import React, { Component } from "react";
import { compose } from "recompose";

import {
  withAuthorization,
  withEmailVerification,
  AuthUserContext,
} from "../Session";
import { withFirebase } from "../Firebase";

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>the home page is only accessible by signed in users</p>

    <Messages />
  </div>
);

class MessagesBase extends Component {
  state = {
    loading: false,
    messages: [],
    text: "",
    limit: 5,
  };

  onRemoveMessage = (uid) => {
    this.props.firebase.message(uid).remove();
  };

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: "" });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onNextPage = () => {
    this.setState(
      (state) => ({ limit: this.state.limit + 5 }),
      this.onListenForMessages
    );
  };

  onListenForMessages() {
    console.log("listen", this.state.limit);
    this.setState({ loading: true });

    this.props.firebase
      .messages()
      .orderByChild("createdAt")
      .limitToLast(this.state.limit)
      .on("value", (snapshot) => {
        const messageObject = snapshot.val();

        if (messageObject) {
          const messageList = Object.keys(messageObject).map((key) => ({
            ...messageObject[key],
            uid: key,
          }));
          this.setState({ messages: messageList, loading: false });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  render() {
    console.log("render");
    const { messages, loading, text } = this.state;

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <div>
            {loading && <div>Loading...</div>}
            {!loading && messages && (
              <button onClick={this.onNextPage}>More</button>
            )}
            {messages ? (
              <MessagesList
                authUser={authUser}
                messages={messages}
                onRemoveMessage={this.onRemoveMessage}
                onEditMessage={this.onEditMessage}
              />
            ) : (
              <div>there are no messages</div>
            )}
            <form onSubmit={(event) => this.onCreateMessage(event, authUser)}>
              <input type="text" value={text} onChange={this.onChangeText} />
              <button type="submit">Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessagesList = ({
  messages,
  onRemoveMessage,
  onEditMessage,
  authUser,
}) => (
  <ul>
    {messages.map((message) => (
      <MessageItem
        key={message.uid}
        authUser={authUser}
        message={message}
        onRemoveMessage={onRemoveMessage}
        onEditMessage={onEditMessage}
      />
    ))}
  </ul>
);

class MessageItem extends Component {
  state = {
    editMode: false,
    editText: this.props.message.text,
  };

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };

  render() {
    const { message, onRemoveMessage, authUser } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <p>
            <strong>{message.userId}</strong>
            {message.text}
            {message.editedAt && <span>(Edited)</span>}
          </p>
        )}
        {message.userId === authUser.uid && (
          <span>
            {editMode ? (
              <p>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </p>
            ) : (
              <p>
                <button onClick={this.onToggleEditMode}>Edit</button>
              </p>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

const Messages = withFirebase(MessagesBase);

const condition = (authUser) => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification
)(HomePage);
