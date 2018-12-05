import * as React from 'react';
import * as Routes from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';
import * as Yup from 'yup';
import { User } from '../../mobx/Chat';

export type Props = {
  chat: {
    connect: () => void;
    socket: {
      io: {
        readyState: string;
      };
      on: (type: string, callback: (res: any) => void) => void;
      emit: (type: string, req: {}) => void;
    };
    user: User;
    setUser: (user: User) => void;
    setUsers: (users: Array<User>) => void;
  };
};

/**
 * 로그인 컴포넌트
 * @class Connect
 * @extends {Component<Props>}
 */
class Connect extends React.Component<Props> {
  state = {
    form: {
      userId: ''
    }
  };

  /**
   * 컴포넌트 마운트 이후
   * @desc props로 전달받은 채팅 관련 전역 상태를 확인하여 소켓 연결
   */
  componentDidMount() {
    const { chat } = this.props;
    chat.connect();
    const { socket } = chat;

    /**
     * @desc 서버로부터 전달받은 로그인 응답 처리
     * @desc 현재 사용자 정보 업데이트 후 채팅방 목록 페이지로 이동
     */
    socket.on('login', ({ user }) => {
      chat.setUser(user);
      Routes.Router.pushRoute('/list');
    });

    /**
     * @desc 서버로부터 전달받은 전체 사용자 업데이트 응답 처리
     * @desc 전체 사용자 정보 업데이트 후
     */
    socket.on('updateUsers', ({ users }) => {
      chat.setUsers(users);
    });
  }

  /**
   * 연결 버튼 클릭 시 실행
   * @desc 소켓 연결이 안되어 있을 경우 에리 메시지 출력 및 유효성 검사 실패 설정
   */
  onConnect = (
    values: { userId: string },
    params: {
    setErrors: (errors: { [key: string]: string }) => void;
    setSubmitting: (submitting: boolean) => void;
    }
  ) => {
    const { socket, user } = this.props.chat;
    const { setErrors, setSubmitting } = params;

    if (!socket || socket.io.readyState === 'closed') {
      setErrors({ userId: '새로고침 후 다시 접속해주세요.' });
      setSubmitting(false);
      return;
    }

    /**
     * @desc 로그인을 위한 클라이언트 측 요청
     * @desc 사용자가 입력한 아이디 전달
     */
    socket.emit('login', {
      user: {
        ...user,
        userId: values.userId
      }
    });
  };

  /**
   * 렌더링
   * @desc formik 라이브러리를 활용한 폼 컴포넌트 반환
   * @desc yup 라이브러리를 활용한 유효성 검사 목록 설정
   * @returns {Component}
   */
  render() {
    return (
      <Formik
        initialValues={this.state.form}
        validationSchema={Yup.object().shape({
          userId: Yup.string()
            .min(3, '3글자 이상 입력해주세요')
            .max(10, '10글자 이하로 입력해주세요')
            .required('ID를 입력해주세요')
        })}
        onSubmit={this.onConnect}
        render={({ submitForm, isSubmitting }) => (
          <ConnectForm submitForm={submitForm} isSubmitting={isSubmitting} />
        )}
      />
    );
  }
}

export default Connect;
