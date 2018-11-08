import React, { Component, Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../lib/routes';

class CustomAppBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Link route={'/'}>
              <Typography variant="h6" color="inherit" className={classes.link}>
                Chat App
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <div className={classes.space} />
      </Fragment>
    );
  }
}

export default CustomAppBar;
