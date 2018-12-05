import * as React from 'react';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import { User } from '../../mobx/Chat';

export type Props = {
  myself: {
    userId: string;
    socketId: string;
    room: string;
  };
  user: User;
  room: string;
  onClick: () => void;
};

/**
 * 초대하기 버튼
 * @class InviteButton
 * @extends {Component<Props>}
 */
class InviteButton extends React.Component<Props> {
  /**
   * 렌더링
   * @desc
   * 현재 사용자가 채팅방이 아니거나 초대할 사용자가 현재 사용자인 경우,
   * 또는 초대할 사용자와 현재 사용자가 같은 채팅방에 있는 경우 null 반환
   * 그 외 경우 초대하기 버튼 컴포넌트 반환
   * @returns {Component | null}
   */
  render() {
    const { myself, user, room, onClick } = this.props;

    if (!room || myself.socketId === user.socketId || user.room === room) {
      return null;
    }

    return (
      <Button
        variant="fab"
        color="primary"
        aria-label="Add"
        mini
        onClick={onClick}
      >
        <MailIcon />
      </Button>
    );
  }
}

export default InviteButton;
