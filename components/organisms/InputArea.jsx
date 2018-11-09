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
    flexDirection: 'row'
  },
  input: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit
  }
});

class InputArea extends Component {
  state = {
    message: ''
  };

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  };

  render() {
    const { classes } = this.props;
    const { message } = this.state;

    return (
      <AppBar position="fixed" color="secondary" className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            multiline={true}
            className={classes.input}
            value={message}
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.sendMessage}
          >
            SEND
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { name: 'InputArea' })(InputArea);
