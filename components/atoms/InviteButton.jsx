import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';

class InviteButton extends Component {
  render() {
    const { myself, user, room, inviteRoom } = this.props;

    if (!room || myself.socketId === user.socketId || user.room === room) {
      return null;
    }

    return (
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        mini
        onClick={() => {
          inviteRoom({ sender: myself, receiver: user, room });
        }}
      >
        <MailIcon />
      </Button>
    );
  }
}

export default InviteButton;
