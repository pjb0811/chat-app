import React, { Component } from 'react';
import Message from '../molecules/Message';
import Grid from '@material-ui/core/Grid';

type Props = {
  messages: Array<{
    type: string;
    message: string;
    user: {
      userId: string;
      socketId: string;
    };
    images: [];
  }>;
  myself: { socketId: string };
};

/**
 * 메시지 목록 컴포넌트
 * @class Messages
 * @extends {Component<Props>}
 */
class Messages extends Component<Props> {
  /**
   * 렌더링
   * @desc 메시지 목록을 순회하며 메시지 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const { messages, myself } = this.props;

    return (
      <Grid
        container
        style={{
          overflow: 'hidden auto'
        }}
      >
        {messages.map((message, i) => (
          <Message key={i} {...message} myself={myself} />
        ))}
      </Grid>
    );
  }
}

export default Messages;
