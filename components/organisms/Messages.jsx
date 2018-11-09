import React, { Component } from 'react';
import Message from '../molecules/Message';
import Grid from '@material-ui/core/Grid';

class Messages extends Component {
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
