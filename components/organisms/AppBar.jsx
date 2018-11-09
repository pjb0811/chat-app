import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../lib/routes';
import Button from '../atoms/Button';
import IconButton from '../atoms/IconButton';

class CustomAppBar extends Component {
  render() {
    const { user, users, classes } = this.props;

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
            <IconButton user={user} users={users} />
            <Button user={user} onClick={this.props.logout} />
          </Toolbar>
        </AppBar>
        <div className={classes.space} />
      </Fragment>
    );
  }
}

export default CustomAppBar;
