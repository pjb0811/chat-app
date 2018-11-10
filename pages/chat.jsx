import React, { Component, Fragment } from 'react';
import mainTemplate from '../components/templates/main';
import Messages from '../components/organisms/Messages';
import InputArea from '../components/organisms/InputArea';
import { toJS } from 'mobx';
import Typography from '@material-ui/core/Typography';

class Chat extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    const { chat, router } = this.props;
    chat.connect();
    const { socket, user } = toJS(this.props.chat.state);

    socket.emit('join', {
      user,
      room: router.query.room
    });

    socket.on('join', data => {
      this.receiveMessage(data);
    });

    socket.on('leave', data => {
      this.receiveMessage(data);
    });

    socket.on('chat', data => {
      this.receiveMessage(data);
    });

    socket.on('updateUser', ({ user }) => {
      console.log('updateUser', user);
      chat.setUser(user);
    });
  }

  componentWillUnmount() {
    const { router } = this.props;
    const { socket, user } = toJS(this.props.chat.state);
    socket.emit('leave', {
      user,
      room: router.query.room
    });
  }

  receiveMessage = ({ messages }) => {
    const newMessages = this.state.messages.concat();
    newMessages.push(messages);
    this.setState({
      messages: newMessages
    });
  };

  sendMessage = message => {
    const { router } = this.props;
    const { socket, user } = toJS(this.props.chat.state);
    socket.emit('chat', {
      user,
      room: router.query.room,
      type: 'text',
      message
    });
  };

  render() {
    const { router } = this.props;
    const myself = toJS(this.props.chat.state.user);
    const { messages } = this.state;

    return (
      <Fragment>
        <Typography variant="h3" gutterBottom>
          {router.query.room}
        </Typography>
        <Messages messages={messages} myself={myself} />
        <InputArea sendMessage={this.sendMessage} />
      </Fragment>
    );
  }
}

export default mainTemplate(Chat);
