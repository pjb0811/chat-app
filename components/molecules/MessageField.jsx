import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class MessageField extends Component {
  state = {
    message: ''
  };

  handleChange = e => {
    this.setState({
      message: e.target.value
    });
  };

  sendMessage = () => {
    const { message } = this.state;

    if (!message.trim()) {
      return;
    }

    this.props.sendMessage({ type: 'text', message });
    this.setState({
      message: ''
    });
  };

  render() {
    const { classes } = this.props;
    const { message } = this.state;

    return (
      <Fragment>
        <div className={classes.inputContainer}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            multiline={true}
            className={classes.input}
            value={message}
            onChange={this.handleChange}
          />
        </div>
        <div className={classes.buttonContainter}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.sendMessage}
          >
            SEND
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default MessageField;
