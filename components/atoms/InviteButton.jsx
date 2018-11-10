import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiAccountPlus } from '@mdi/js';

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
          inviteRoom({ socketId: user.socketId, room });
        }}
      >
        <Icon path={mdiAccountPlus} size={1} color="white" />
      </Button>
    );
  }
}

export default InviteButton;
