import React, { Component, Fragment } from 'react';
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

type Props = {
  user: { userId: string; socketId: string; room: string };
  users: Array<{ userId: string; socketId: string; room: string }>;
  room: string;
  classes: {
    space: string;
  };
  invites: Array<{ sender: { userId: string }; room: string; time: number }>;
  inviteRoom: () => void;
  removeInvite: () => void;
  moveRoom: () => void;
  logout: () => void;
};

type State = {
  [key: string]: HTMLElement | null;
};

class CustomAppBar extends Component<Props, State> {
  state = {
    userListEl: null,
    inviteListEl: null
  };

  handleClick = (params: {
  e: React.ChangeEvent<HTMLElement>;
  type: string;
  }) => {
    const { e, type } = params;
    this.setState({
      [type]: e.currentTarget
    });
  };

  handleClose = (params: { type: string }) => {
    const { type } = params;
    this.setState({
      [type]: null
    });
  };

  moveList = () => {
    const { user } = this.props;

    if (!user.userId || !user.socketId) {
      (document.location as Location).replace('/');
    }

    Routes.Router.pushRoute('/list');
  };

  render() {
    const {
      user,
      users,
      room,
      classes,
      invites,
      inviteRoom,
      removeInvite,
      moveRoom
    } = this.props;
    const { userListEl, inviteListEl } = this.state;

    return (
      <Fragment>
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
              onClick={(e: React.ChangeEvent<HTMLElement>) => {
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
              onClick={(e: React.ChangeEvent<HTMLElement>) => {
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
              />
            </Popover>
            <Button user={user} color="inherit" onClick={this.props.logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.space} />
      </Fragment>
    );
  }
}

export default CustomAppBar;
