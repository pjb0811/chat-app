import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    top: 'auto',
    bottom: 0
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20
  },
  input: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  }
});

class InputArea extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="secondary" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            multiline={true}
            className={classes.input}
          />
          <Button variant="contained" className={classes.button}>
            확인
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { name: 'InputArea' })(InputArea);
