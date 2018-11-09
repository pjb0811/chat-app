import React, { Component } from 'react';
import Message from '../molecules/Message';
import Grid from '@material-ui/core/Grid';

class Messages extends Component {
  render() {
    const { messages } = this.props;
    console.log(messages);

    return (
      <Grid container spacing={24}>
        {messages.map((message, i) => (
          <Message key={i} {...message} />
        ))}
      </Grid>
    );
  }
}

export default Messages;
