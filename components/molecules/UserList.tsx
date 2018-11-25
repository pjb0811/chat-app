import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import InviteButton from '../atoms/InviteButton';

type Props = {
  users: Array<{ userId: string; socketId: string; room: string }>;
  user: { userId: string; socketId: string; room: string };
  room: string;
  inviteRoom: (params: { sender: {}; receiver: {}; room: string }) => void;
};

/**
 * 전체 사용자 목록 컴포넌트
 * @class UserList
 * @extends {Component<Props>}
 */
class UserList extends Component<Props> {
  /**
   * 렌더링
   * @desc 전체 사용자 목록을 순회하며 사용자 아이디 및 초대 버튼 표시
   * @desc 전체 사용자 목록 중 자신의 아이디가 있을 경우 안내 메시지 표시
   * @returns {Component}
   */
  render() {
    const { users, room, inviteRoom } = this.props;
    const myself = this.props.user;

    return (
      <Paper>
        <List style={{ maxWidth: '100%', maxHeight: 300, overflow: 'auto' }}>
          {users.map((user, i) => (
            <ListItem key={i}>
              <ListItemText
                primary={user.userId}
                primaryTypographyProps={{
                  variant: 'button',
                  color: 'textPrimary',
                  noWrap: true
                }}
                secondary={myself.socketId === user.socketId ? '사용자' : ''}
              />
              <InviteButton
                myself={myself}
                user={user}
                room={room}
                inviteRoom={inviteRoom}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
}

export default UserList;
