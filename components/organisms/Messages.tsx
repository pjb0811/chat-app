import * as React from 'react';
import Message from '../molecules/Message';
import Grid from '@material-ui/core/Grid';
import { Element } from 'react-scroll';

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
  myself: { userId: string; socketId: string };
  id?: string;
};

/**
 * 메시지 목록 컴포넌트
 * @class Messages
 * @extends {Component<Props>}
 */
class Messages extends React.Component<Props> {
  /**
   * 렌더링
   * @desc 메시지 목록을 순회하며 메시지 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const { messages, myself, id } = this.props;

    return (
      <Grid
        container
        style={{
          overflow: 'hidden auto'
        }}
        id={id}
      >
        {messages.map((message, i) => (
          <Message key={i} {...message} myself={myself} />
        ))}
        <Element name={'window'} />
      </Grid>
    );
  }
}

export default Messages;
