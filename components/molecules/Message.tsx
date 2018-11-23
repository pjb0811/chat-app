import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridSpace from '../atoms/GridSpace';
import Chip from '@material-ui/core/Chip';
import Image from '../atoms/Image';
import ResizeDetector from 'react-resize-detector';
import { Motion, spring } from 'react-motion';
import { Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
      wordBreak: 'break-all'
    },
    myself: {
      background: theme.palette.primary.main
    },
    avatar: {
      margin: 10
    },
    chip: {
      margin: theme.spacing.unit
    }
  });

type Props = {
  classes: {
    paper: string;
    chip: string;
    myself: string;
  };
  type: string;
  message: string;
  user: {
    userId: string;
    socketId: string;
  };
  myself: {
    socketId: string;
  };
  images: [];
};

type State = {
  [key: string]: {
    xs:
      | boolean
      | 1
      | 2
      | 'auto'
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | undefined;
  };
};

class Message extends Component<Props, State> {
  state: State = {
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
    const isInfo = type === 'info';
    const isMyMsg = user.socketId === myself.socketId;

    return (
      <Fragment>
        <GridSpace hasSpace={!isInfo && isMyMsg} xs={6} />
        <Grid item xs={this.state[type].xs}>
          <ResizeDetector handleWidth>
            {(width = 0) => (
              <Motion
                style={{
                  transformX: spring(isMyMsg ? width : -width),
                  opacity: spring(width ? 1 : 0)
                }}
              >
                {({ transformX, opacity }) => (
                  <Paper
                    className={`${classes.paper} ${
                      !isInfo && isMyMsg ? classes.myself : ''
                    }`}
                    style={{
                      transform: `translatex(${(isMyMsg ? width : -width) -
                        transformX}px)`,
                      opacity
                    }}
                  >
                    {!isInfo && (
                      <Chip label={user.userId} className={classes.chip} />
                    )}
                    {message.split('\n').map((line, i) => (
                      <Typography key={i}>{line}</Typography>
                    ))}
                    {images.map((image, i) => (
                      <Image key={i} {...image} />
                    ))}
                  </Paper>
                )}
              </Motion>
            )}
          </ResizeDetector>
        </Grid>
        <GridSpace hasSpace={!isInfo && !isMyMsg} xs={6} />
      </Fragment>
    );
  }
}

export default withStyles(styles, { name: 'Message' })(Message);
