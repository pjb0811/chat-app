import React, { Component } from 'react';
import Message from '../molecules/Message';
import Grid from '@material-ui/core/Grid';

type Props = {
  messages: Array<{
    type: string;
    message: string;
    user: {
      userId: string;
      socketId: string;
    };
    images: [];
  }>;
  myself: { socketId: string };
};

class Messages extends Component<Props> {
  render() {
    const { messages, myself } = this.props;

    return (
      <Grid container>
        {messages.map((message, i) => (
          <Message key={i} {...message} myself={myself} />
        ))}
      </Grid>
    );
  }
}

export default Messages;
