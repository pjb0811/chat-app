import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridSpace from '../atoms/GridSpace';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    wordBreak: 'break-all'
  },
  avatar: {
    margin: 10
  }
});

class Message extends Component {
  state = {
    info: {
      xs: 12
    },
    text: {
      xs: 6
    }
  };

  render() {
    const { classes, type, message, user, myself } = this.props;

    return (
      <Fragment>
        <GridSpace
          hasSpace={type !== 'info' && user.socketId === myself.socketId}
          xs={6}
        />
        <Grid item xs={this.state[type].xs}>
          <Paper className={classes.paper}>
            {message.split('\n').map((line, i) => (
              <Typography key={i}>{line}</Typography>
            ))}
          </Paper>
        </Grid>
        <GridSpace
          hasSpace={type !== 'info' && user.socketId !== myself.socketId}
          xs={6}
        />
      </Fragment>
    );
  }
}

export default withStyles(styles)(Message);
