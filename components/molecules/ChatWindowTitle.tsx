import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export type Props = {
  width: number;
  height: number;
  toggleWindowSize: () => void;
  handleMouseDown: () => void;
  removeWindow: () => void;
  isFulling: boolean;
};

class ChatWindowTitle extends Component<Props> {
  render() {
    const {
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
          <div>
            <div>Test</div>
            <span
              color={`${isFulling ? 'green' : 'yellow'}`}
              onClick={toggleWindowSize}
            >
              full
            </span>
            <span color="red" onClick={removeWindow}>
              close
            </span>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ChatWindowTitle;
