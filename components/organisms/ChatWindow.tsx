import React, { Component } from 'react';
import { Window } from 'react-motion-components';
import ChatWindowTitle, {
  Props as TitleProps
} from '../molecules/ChatWindowTitle';

type Props = {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  position: string;
  direction: string;
  resize: boolean;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  user: {
    userId: string;
  };
};

class ChatWindow extends Component<Props> {
  render() {
    const { children, user } = this.props;

    return (
      <Window
        {...this.props}
        titlebar={{
          use: true,
          height: 64,
          component: (props: TitleProps) => (
            <ChatWindowTitle user={user} {...props} />
          )
        }}
      >
        {children}
      </Window>
    );
  }
}

export default ChatWindow;
