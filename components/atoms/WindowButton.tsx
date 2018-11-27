import React, { Component } from 'react';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

type Props = {
  myself: {
    socketId: string;
  };
  user: {
    socketId: string;
  };
  onClick: () => void;
};

class WindowButton extends Component<Props> {
  render() {
    const { myself, user, onClick } = this.props;

    if (myself.socketId === user.socketId) {
      return null;
    }

    return (
      <Button
        variant="fab"
        mini
        color="primary"
        aria-label="one-to-one"
        style={{
          marginLeft: 10
        }}
        onClick={onClick}
      >
        <Icon>chat_bubble</Icon>
      </Button>
    );
  }
}

export default WindowButton;
