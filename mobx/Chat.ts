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

  /**
   * 채팅 인스턴스 생성
   * @desc 메개변수 값이 있을 경우 state 인스턴스 수정
   * @param {Props} props
   */
  constructor(props: Props) {
    this.state = props ? props.state : this.state;
  }

  /**
   * 소켓 연결
   */
  @action
  connect = (namespace = '/') => {
    this.state.socket = io(namespace);
  };

  /**
   * 소켓 연결 해제
   */
  @action
  disconnect = () => {
    this.state.socket && this.state.socket.disconnect();
  };

  /**
   * 사용자 정보 수정
   */
  @action
  setUser = (user: { userId: string; socketId: string }) => {
    this.state.user = user;
  };

  /**
   * 전체 사용자 목록 수정
   */
  @action
  setUsers = (users: Array<{}>) => {
    this.state.users = users;
  };

  /**
   * 초대 정보 추가
   * @todo 초대 요청 시 emit 이벤트가 중복 호출되어 같은 초대 정보가 두번 전달됨. 추후 확인 필요
   * @desc 중복으로 들어온 초대 정보를 초대시간 관련 인스턴스를 비교하여 필터링 처리
   */
  @action
  setInvites = (invite: { time: number; sender: { socketId: string } }) => {
    this.state.invites.push(invite);
    this.state.invites = this.state.invites.filter(
      (currInvite, i, self) =>
        i === self.findIndex(selfInvite => selfInvite.time === currInvite.time)
    );
  };

  /**
   * 초대 정보 삭제
   * @desc 초대 목록에서 초대요청자의 소켓아이디와 초대 시간을 비교하여 삭제할 배열 인덱스 확인
   */
  @action
  removeInvites = (invite: { time: number; sender: { socketId: string } }) => {
    const index = this.state.invites.findIndex(
      currInvite =>
        currInvite.time === invite.time &&
        currInvite.sender.socketId === invite.sender.socketId
    );

    this.state.invites.splice(index, 1);
  };

  /**
   * 소켓정보 가져오기
   * @readonly
   */
  @computed
  get socket() {
    return this.state.socket;
  }

  /**
   * 사용자 정보 가져오기
   * @readonly
   */
  @computed
  get user() {
    return toJS(this.state.user);
  }

  /**
   * 사용자 목록 가져오기
   * @readonly
   */
  @computed
  get users() {
    return toJS(this.state.users);
  }

  /**
   * 초대 목록 가져오기
   * @readonly
   */
  @computed
  get invites() {
    return toJS(this.state.invites);
  }
}

export default Chat;
