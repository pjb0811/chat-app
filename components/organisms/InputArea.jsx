import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MessageField from '../molecules/MessageField';
import { NativeFiles } from 'react-dnd-component';
import Fade from '@material-ui/core/Fade';
import ImageField from '../molecules/ImageField';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    top: 'auto',
    left: 0,
    bottom: 0,
    padding: theme.spacing.unit * 2,
    background: theme.palette.secondary.main,
    display: 'flex'
  },
  inputContainer: {
    flexGrow: 1,
    alignItems: 'center'
  },
  input: {
    background: theme.palette.common.white
  },
  buttonContainter: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing.unit
  },
  space: {
    height: 120
  },
  paper: {
    padding: theme.spacing.unit,
    minHeight: 100,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  active: {
    background: theme.palette.primary.light,
    color: theme.palette.primary.contrastText
  }
});

class InputArea extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.space} />
        <NativeFiles>
          {props => {
            const { canDrop, files } = props;

            if (canDrop || files.length) {
              return (
                <div color="secondary" className={classes.root}>
                  <ImageField {...this.props} {...props} />
                </div>
              );
            }

            return (
              <Fade in={!canDrop}>
                <div color="secondary" className={classes.root}>
                  <MessageField {...this.props} />
                </div>
              </Fade>
            );
          }}
        </NativeFiles>
      </Fragment>
    );
  }
}

export default withStyles(styles, { name: 'InputArea' })(InputArea);
