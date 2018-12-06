import * as React from 'react';
import mainTemplate from '../components/templates/main';
import Messages from '../components/organisms/Messages';
import InputArea from '../components/organisms/InputArea';
import Typography from '@material-ui/core/Typography';
import { animateScroll as scroll } from 'react-scroll';
import Space from '../components/atoms/Space';

type Props = {
  chat: {
    connect: () => void;
    socket: {
      emit: (type: string, req?: {}) => void;
      on: (type: string, callback: (res: any) => void) => void;
    };
    user: { userId: string; socketId: string };
    setUser: (user: {}) => void;
  };
  router: {
    query: {
      room: string;
    };
  };
};

type State = {
  messages: Array<{}>;
};

/**
 * 채팅 페이지 컴포넌트
 * @class Chat
 * @extends {Component<Props, State>}
 */
class Chat extends React.Component<Props, State> {
  state = {
    messages: []
  };

  mounted = false;

  /**
   * 컴포넌트 마운트 이후
   * @desc props로 전달받은 채팅 관련 전역 상태를 확인하여 소켓 연결
   * @desc 마운트 확인 변수 true 설정
   */
  componentDidMount() {
    const { chat, router } = this.props;
    chat.connect();
    const { socket, user } = chat;

    this.mounted = true;

    /**
     * @desc 채팅방 입장을 위한 클라이언트 측 요청
     * @desc 사용자 정보 및 채팅방 이름 전달
     */
    socket.emit('join', {
      user,
      room: router.query.room
    });

    /**
     * @desc 서버로부터 전달받은 현재 사용자의 채팅방 입장 응답 처리
     * @desc 마운트 여부 확인 후 receiveMessage 함수 호출
     */
    socket.on('join', data => {
      if (this.mounted) {
        this.receiveMessage(data);
      }
    });

    /**
     * @desc 서버로부터 전달받은 현재 사용자의 채팅방 퇴장 응답 처리
     * @desc 마운트 여부 확인 후 receiveMessage 함수 호출
     */
    socket.on('leave', data => {
      if (this.mounted) {
        this.receiveMessage(data);
      }
    });

    /**
     * @desc 서버로부터 전달받은 현재 사용자의 메시지 정보 삭제 응답 처리
     * @desc 마운트 여부 확인 후 resetMessages 함수 호출
     */
    socket.on('resetMessages', () => {
      if (this.mounted) {
        this.resetMessages();
      }
    });

    /**
     * @desc 서버로부터 전달받은 현재 사용자의 메시지 입력 응답 처리
     * @desc 마운트 여부 확인 후 receiveMessage 함수 호출
     */
    socket.on('chat', data => {
      if (this.mounted) {
        this.receiveMessage(data);
      }
    });

    /**
     * @desc 서버로부터 전달받은 현재 사용자 정보 업데이트 응답 처리
     * @desc 마운트 여부 확인 후 현재 사용자 정보 업데이트
     */
    socket.on('updateUser', ({ user }) => {
      if (this.mounted) {
        chat.setUser(user);
      }
    });
  }

  /**
   * 컴포넌트 언마운트 하기 전
   * @desc 마운트 확인 변수 false 설정
   */
  componentWillUnmount() {
    const { router, chat } = this.props;
    const { socket, user } = chat;

    this.mounted = false;

    /**
     * @desc 채팅방 퇴장을 위한 클라이언트 측 요청
     * @desc 사용자 정보 및 채팅방 이름 전달
     */
    socket.emit('leave', {
      user,
      room: router.query.room
    });
  }

  /**
   * 메시지 수신
   * @desc 인자로 전달받은 메시지 정보를 state 내 메시지 목록 배열에 추가
   * @desc 메시지 배열 업데이트 후 스크롤 하단으로 이동
   */
  receiveMessage = (params: { messages: Array<{}> }) => {
    const { messages } = params;
    const newMessages: State['messages'] = this.state.messages.concat();
    newMessages.push(messages);
    this.setState(
      {
        messages: newMessages
      },
      () => {
        scroll.scrollToBottom();
      }
    );
  };

  /**
   * 메시지 송신
   * @desc 사용자가 입력한 메시지 정보를 서버로 송신
   */
  sendMessage = (params: {
  type: string;
  message: string;
  images: Array<{}>;
  }) => {
    const { type, message = '', images = [] } = params;
    const { router, chat } = this.props;
    const { socket, user } = chat;

    /**
     * @desc 채팅 메시지 전송을 위한 클라이언트 측 요청
     * @desc 사용자 정보 및 채팅방 이름, 메시지 종류, 메시지 내용 전달
     */
    socket.emit('chat', {
      user,
      room: router.query.room,
      type,
      message,
      images
    });
  };

  /**
   * 메시지 목록 삭제
   */
  resetMessages = () => {
    this.setState({
      messages: []
    });
  };

  /**
   * 렌더링
   * @desc 채팅방 타이틀 몇 메시지 목록, 입력 영역 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const { router, chat } = this.props;
    const myself = chat.user;
    const { messages } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h3" gutterBottom>
          {router.query.room}
        </Typography>
        <Messages messages={messages} myself={myself} />
        <Space height={120} />
        <InputArea sendMessage={this.sendMessage} />
      </React.Fragment>
    );
  }
}

export default mainTemplate(Chat);
