import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export type Props = {
  width: number;
  height: number;
  toggleWindowSize: () => void;
  handleMouseDown: () => void;
  removeWindow: () => void;
  isFulling: boolean;
  receiver: {
    userId: string;
  };
};

class ChatWindowTitle extends Component<Props> {
  render() {
    const {
      receiver,
      toggleWindowSize,
      handleMouseDown,
      removeWindow,
      isFulling
    } = this.props;

    return (
      <AppBar
        position="static"
        onDoubleClick={toggleWindowSize}
        onMouseDown={handleMouseDown}
      >
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1
            }}
          >
            {receiver.userId}
          </Typography>
          <IconButton onClick={toggleWindowSize}>
            <Icon>{isFulling ? 'fullscreen_exit' : 'fullscreen'}</Icon>
          </IconButton>
          <IconButton onClick={removeWindow}>
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ChatWindowTitle;
