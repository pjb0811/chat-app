import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../lib/routes';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class CustomAppBar extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { user, users, classes } = this.props;
    const { anchorEl } = this.state;

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
            <IconButton user={user} users={users} onClick={this.handleClick} />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.handleClose}>Logout</MenuItem>
            </Menu>
            <Button user={user} onClick={this.props.logout} />
          </Toolbar>
        </AppBar>
        <div className={classes.space} />
      </Fragment>
    );
  }
}

export default CustomAppBar;
