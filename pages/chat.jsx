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
      const newMessages = this.state.messages;
      console.log(newMessages, data.messages);
      // this.setState({
      //   messages: data.messages
      // });
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

  render() {
    const { router } = this.props;
    const { messages } = this.state;

    return (
      <Fragment>
        <Typography variant="h3" gutterBottom>
          {router.query.room}
        </Typography>
        <Messages messages={messages} />
        <InputArea />
      </Fragment>
    );
  }
}

export default mainTemplate(Chat);
