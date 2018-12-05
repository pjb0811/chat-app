import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as Routes from '../../lib/routes';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import Popover from '@material-ui/core/Popover';
import UserList from '../molecules/UserList';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import InviteList from '../molecules/InviteList';
import { User } from '../../mobx/Chat';

export type Props = {
  user: User;
  users: Array<User>;
  room: string;
  classes: {
    space: string;
  };
  invites: Array<{ sender: { userId: string }; room: string; time: number }>;
  inviteRoom: (params: { sender: {}; receiver: {}; room: string }) => void;
  removeInvite: (params: {}) => void;
  moveRoom: (params: { type: 'join' | 'leave'; room: string }) => void;
  logout: () => void;
  toggleWindow: (params: {}) => void;
};

type State = {
  [key: string]: HTMLElement | null;
};

/**
 * 상단 앱 바 컴포넌트
 * @class CustomAppBar
 * @extends {Component<Props, State>}
 */
class CustomAppBar extends React.Component<Props, State> {
  state = {
    userListEl: null,
    inviteListEl: null
  };

  /**
   * 초대 목록 버튼 및 전체 사용자 목록 버튼 클릭 이벤트 처리
   */
  handleClick = (params: {
  e: React.MouseEvent<HTMLElement>;
  type: string;
  }) => {
    const { e, type } = params;
    this.setState({
      [type]: e.currentTarget
    });
  };

  /**
   * 초대 목록이나 전체 사용자 목록를 닫기 위한 클릭 이벤트 처리
   */
  handleClose = (params: { type: string }) => {
    const { type } = params;
    this.setState({
      [type]: null
    });
  };

  /**
   * 타이틀 클릭 시 페이지 이동
   * @desc 사용자 정보가 없을 경우 로그인 페이지로 이동
   * @desc 아닌 경우 채팅방 목록 페이지로 이동
   */
  moveList = () => {
    const { user } = this.props;

    if (!user.userId || !user.socketId) {
      (document.location as Location).replace('/');
    }

    Routes.Router.pushRoute('/list');
  };

  /**
   * 렌더링
   * @desc 타이틀 명 및 초대 목록 확인 버튼, 전체 사용자 확인 버튼 및 로그아웃 버튼 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const {
      user,
      users,
      room,
      classes,
      invites,
      inviteRoom,
      removeInvite,
      moveRoom,
      toggleWindow
    } = this.props;
    const { userListEl, inviteListEl } = this.state;

    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              style={{
                cursor: 'pointer'
              }}
              onClick={this.moveList}
            >
              Chat App
            </Typography>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              user={user}
              color="inherit"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                this.handleClick({ e, type: 'inviteListEl' });
              }}
            >
              <Badge badgeContent={invites.length} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <Popover
              id="simple-popper"
              open={Boolean(inviteListEl && invites.length)}
              anchorEl={inviteListEl}
              onClose={() => {
                this.handleClose({ type: 'inviteListEl' });
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <InviteList
                invites={invites}
                removeInvite={removeInvite}
                room={room}
                moveRoom={moveRoom}
              />
            </Popover>
            <IconButton
              user={user}
              color="inherit"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                this.handleClick({ e, type: 'userListEl' });
              }}
            >
              <Badge badgeContent={users.length} color="secondary">
                <AccountCircle />
              </Badge>
            </IconButton>
            <Popover
              id="simple-popper"
              open={Boolean(userListEl)}
              anchorEl={userListEl}
              onClose={() => {
                this.handleClose({ type: 'userListEl' });
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
              }}
            >
              <UserList
                user={user}
                users={users}
                room={room}
                inviteRoom={inviteRoom}
                toggleWindow={toggleWindow}
              />
            </Popover>
            <Button user={user} color="inherit" onClick={this.props.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.space} />
      </React.Fragment>
    );
  }
}

export default CustomAppBar;
