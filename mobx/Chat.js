import { observable, action } from 'mobx';
import io from 'socket.io-client';

class Chat {
  @observable
  state = {
    socket: null,
    user: {
      userId: '',
      socketId: ''
    },
    users: []
  };

  constructor(props) {
    this.state = props ? props.state : this.state;
  }

  @action
  connect = () => {
    this.state.socket = io('/');
  };

  @action
  setUser = user => {
    this.state.user = user;
  };

  @action
  setUsers = users => {
    this.state.users = users;
  };
}

export default Chat;
