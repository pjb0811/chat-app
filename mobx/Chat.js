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
    invites: [],
    users: []
  };

  constructor(props) {
    this.state = props ? props.state : this.state;
  }

  @action
  connect = () => {
    this.state.socket = io();
  };

  @action
  setUser = user => {
    this.state.user = user;
  };

  @action
  setUsers = users => {
    this.state.users = users;
  };

  @action
  setInvites = invite => {
    this.state.invites.push(invite);
    this.state.invites = this.state.invites.filter(
      (currInvite, i, self) =>
        i === self.findIndex(selfInvite => selfInvite.time === currInvite.time)
    );
  };
}

export default Chat;
