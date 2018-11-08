import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Router } from '../../lib/routes';
import { toJS } from 'mobx';

class LogoutButton extends Component {
  componentDidMount() {
    const { chat } = this.props;
    chat.setSocket();
    const { socket } = toJS(this.props.chat.state);
    socket.on('logout', data => {
      const { socketId } = toJS(this.props.chat.state);

      console.log(socketId);
      console.log(data);
      // chat.setUser('');
      // chat.setUsers(data.clients);
      // Router.pushRoute('/');
    });
  }

  logout = () => {
    const { socket } = toJS(this.props.chat.state);
    socket.emit('logout');
  };

  render() {
    const { userId } = toJS(this.props.chat.state);

    if (userId) {
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
