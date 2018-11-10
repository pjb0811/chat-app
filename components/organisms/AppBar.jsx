import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../lib/routes';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import Popover from '@material-ui/core/Popover';
import UserList from '../molecules/UserList';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import InviteList from '../molecules/InviteList';

class CustomAppBar extends Component {
  state = {
    userListEl: null,
    inviteListEl: null
  };

  handleClick = ({ e, type }) => {
    this.setState({
      [type]: e.currentTarget
    });
  };

  handleClose = ({ type }) => {
    this.setState({
      [type]: null
    });
  };

  render() {
    const { user, users, room, classes, inviteRoom, invites } = this.props;
    const { userListEl, inviteListEl } = this.state;

    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Link route={`${user.userId ? '/list' : '/'}`}>
              <Typography
                variant="h6"
                color="inherit"
                style={{
                  cursor: 'pointer'
                }}
              >
                Chat App
              </Typography>
            </Link>
            <div style={{ flexGrow: 1 }} />
            <IconButton
              user={user}
              color="inherit"
              onClick={e => {
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
              <InviteList invites={invites} />
            </Popover>
            <IconButton
              user={user}
              color="inherit"
              onClick={e => {
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
