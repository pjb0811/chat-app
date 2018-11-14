import React, { Component, Fragment } from 'react';
import mainTemplate from '../components/templates/main';
import Messages from '../components/organisms/Messages';
import InputArea from '../components/organisms/InputArea';
import Typography from '@material-ui/core/Typography';
import { animateScroll as scroll } from 'react-scroll';

class Chat extends Component {
  state = {
    messages: []
  };

  mounted = false;

  componentDidMount() {
    const { chat, router } = this.props;
    chat.connect();
    const { socket, user } = chat;

    this.mounted = true;

    socket.emit('join', {
      user,
      room: router.query.room
    });

    socket.on('join', data => {
      if (this.mounted) {
        this.receiveMessage(data);
      }
    });

    socket.on('leave', data => {
      if (this.mounted) {
        this.receiveMessage(data);
      }
    });

    socket.on('resetMessages', () => {
      if (this.mounted) {
        this.resetMessages();
      }
    });

    socket.on('chat', data => {
      if (this.mounted) {
        this.receiveMessage(data);
      }
    });

    socket.on('updateUser', ({ user }) => {
      if (this.mounted) {
        chat.setUser(user);
      }
    });
  }

  componentWillUnmount() {
    const { router, chat } = this.props;
    const { socket, user } = chat;

    this.mounted = false;

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
    scroll.scrollToBottom();
  };

  sendMessage = ({ type, message = '', images = [] }) => {
    const { router, chat } = this.props;
    const { socket, user } = chat;
    socket.emit('chat', {
      user,
      room: router.query.room,
      type,
      message,
      images
    });
  };

  resetMessages = () => {
    this.setState({
      messages: []
    });
  };

  render() {
    const { router, chat } = this.props;
    const myself = chat.user;
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
