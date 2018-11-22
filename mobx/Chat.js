import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';
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
  connect = (namespace = '/') => {
    this.state.socket = io(namespace);
  };

  @action
  disconnect = () => {
    this.state.socket.disconnect();
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

  @action
  removeInvites = invite => {
    const index = this.state.invites.findIndex(
      currInvite =>
        currInvite.time === invite.time &&
        currInvite.sender.socketId === invite.sender.socketId
    );

    this.state.invites.splice(index, 1);
  };

  @computed
  get socket() {
    return this.state.socket;
  }

  @computed
  get user() {
    return toJS(this.state.user);
  }

  @computed
  get users() {
    return toJS(this.state.users);
  }

  @computed
  get invites() {
    return toJS(this.state.invites);
  }
}

export default Chat;
