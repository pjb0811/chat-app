import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridSpace from '../atoms/GridSpace';
import Chip from '@material-ui/core/Chip';
import Image from '../atoms/Image';

const styles = theme => ({
  paper: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    wordBreak: 'break-all'
  },
  avatar: {
    margin: 10
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class Message extends Component {
  state = {
    info: {
      xs: 12
    },
    text: {
      xs: 6
    },
    image: {
      xs: 6
    }
  };

  render() {
    const { classes, type, message, user, myself, images } = this.props;

    return (
      <Fragment>
        <GridSpace
          hasSpace={type !== 'info' && user.socketId === myself.socketId}
          xs={6}
        />
        <Grid item xs={this.state[type].xs}>
          <Paper className={classes.paper}>
            {type !== 'info' && (
              <Chip label={user.userId} className={classes.chip} />
            )}
            {message.split('\n').map((line, i) => (
              <Typography key={i}>{line}</Typography>
            ))}
            {images.map((image, i) => (
              <Image key={i} {...image} />
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

export default withStyles(styles, { name: 'Message' })(Message);
