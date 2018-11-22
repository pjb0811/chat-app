import React, { Component, Fragment } from 'react';
import mainTemplate from '../components/templates/main';
import Messages from '../components/organisms/Messages';
import InputArea from '../components/organisms/InputArea';
import Typography from '@material-ui/core/Typography';
import { animateScroll as scroll } from 'react-scroll';

type Props = {
  chat: {
    connect: () => void;
    socket: {
      emit: (type: string, req?: {}) => void;
      on: (type: string, callback: (res: any) => void) => void;
    };
    user: { socketId: string };
    setUser: (user: {}) => void;
  };
  router: {
    query: {
      room: string;
    };
  };
};

type State = {
  messages: Array<{}>;
};

class Chat extends Component<Props, State> {
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

  receiveMessage = (params: { messages: Array<{}> }) => {
    const { messages } = params;
    const newMessages: State['messages'] = this.state.messages.concat();
    newMessages.push(messages);
    this.setState({
      messages: newMessages
    });
    scroll.scrollToBottom();
  };

  sendMessage = (params: {
  type: string;
  message: string;
  images: Array<{}>;
  }) => {
    const { type, message = '', images = [] } = params;
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
