import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Router } from '../../lib/routes';
import { toJS } from 'mobx';

class LogoutButton extends Component {
  componentDidMount() {
    const { chat } = this.props;
    chat.connect();
    const { socket } = toJS(this.props.chat.state);
    socket.on('logout', data => {
      chat.setUser({ userId: '' });
      chat.setUsers(data.users);
      Router.pushRoute('/');
    });
  }

  logout = () => {
    const { socket } = toJS(this.props.chat.state);
    socket.emit('logout');
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
