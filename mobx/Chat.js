import { observable, action } from 'mobx';
import io from 'socket.io-client';

class Chat {
  @observable
  state = {
    socket: null,
    userId: '',
    socketId: '',
    users: []
  };

  constructor(props) {
    this.state = props ? props.state : this.state;
  }

  @action
  setSocket = () => {
    this.state.socket = io();
  };

  @action
  setUser = ({ userId = '', socketId = '' }) => {
    this.state.userId = userId;
    this.state.socketId = socketId;
  };

  @action
  setUsers = users => {
    this.state.users = users;
  };
}

export default Chat;
