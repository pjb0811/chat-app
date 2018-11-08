import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../lib/routes';
import { toJS } from 'mobx';
import LogoutButton from '../atoms/LogoutButton';

class CustomAppBar extends Component {
  render() {
    const { classes } = this.props;
    const { userId } = toJS(this.props.chat.state);

    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Link route={`${userId ? '/list' : '/'}`}>
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
            <LogoutButton chat={this.props.chat} />
          </Toolbar>
        </AppBar>
        <div className={classes.space} />
      </Fragment>
    );
  }
}

export default CustomAppBar;
