import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class Message extends Component {
  state = {
    join: {
      xs: 12
    }
  };

  render() {
    const { classes, type, message } = this.props;

    return (
      <Grid item xs={12}>
        <Paper className={classes.paper}>{message}</Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Message);
