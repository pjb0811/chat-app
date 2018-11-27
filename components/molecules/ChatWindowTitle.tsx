import React, { Component } from 'react';

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
      width,
      height,
      toggleWindowSize,
      handleMouseDown,
      removeWindow,
      isFulling
    } = this.props;

    return (
      <div
        style={{
          width,
          height,
          boxSizing: 'border-box'
        }}
        onDoubleClick={toggleWindowSize}
        onMouseDown={handleMouseDown}
      >
        <div>Test</div>
        <div>
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
      </div>
    );
  }
}

export default ChatWindowTitle;
