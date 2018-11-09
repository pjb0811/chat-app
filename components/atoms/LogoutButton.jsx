import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { toJS } from 'mobx';

class LogoutButton extends Component {
  logout = () => {
    const { socket, user } = toJS(this.props.chat.state);
    socket.emit('logout', user);
  };

  render() {
    const { user } = toJS(this.props.chat.state);

    if (user.userId) {
      return (
        <Button color="inherit" onClick={this.logout}>
          Logout
        </Button>
      );
    }

    return null;
  }
}

export default LogoutButton;
