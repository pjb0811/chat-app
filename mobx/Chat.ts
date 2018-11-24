import { observable, action, computed } from 'mobx';
import { toJS } from 'mobx';
import io from 'socket.io-client';

type Props = {
  state: State;
} | null;

export type State = {
  socket: SocketIOClient.Socket | null;
  user: {
    userId: string;
    socketId: string;
  };
  invites: Array<{
    time: number;
    sender: { socketId: string };
  }>;
  users: Array<{}>;
};

class Chat {
  @observable
  state: State = {
    socket: null,
    user: {
      userId: '',
      socketId: ''
    },
    invites: [],
    users: []
  };

  constructor(props: Props) {
    this.state = props ? props.state : this.state;
  }

  @action
  connect = (namespace = '/') => {
    this.state.socket = io(namespace);
  };

  @action
  disconnect = () => {
    this.state.socket && this.state.socket.disconnect();
  };

  @action
  setUser = (user: { userId: string; socketId: string }) => {
    this.state.user = user;
  };

  @action
  setUsers = (users: Array<{}>) => {
    this.state.users = users;
  };

  @action
  setInvites = (invite: { time: number; sender: { socketId: string } }) => {
    this.state.invites.push(invite);
    this.state.invites = this.state.invites.filter(
      (currInvite, i, self) =>
        i === self.findIndex(selfInvite => selfInvite.time === currInvite.time)
    );
  };

  @action
  removeInvites = (invite: { time: number; sender: { socketId: string } }) => {
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
