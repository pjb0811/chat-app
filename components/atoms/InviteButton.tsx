import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';

type Props = {
  myself: {
    socketId: string;
  };
  user: {
    socketId: string;
    room: string;
  };
  room: string;
  inviteRoom: (params: { sender: {}; receiver: {}; room: string }) => void;
};

class InviteButton extends Component<Props> {
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
