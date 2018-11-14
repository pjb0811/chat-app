import React, { Component } from 'react';
import { Router } from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';
import * as Yup from 'yup';

class Connect extends Component {
  state = {
    form: {
      userId: ''
    }
  };

  /**
   * 마운트 이 후 소켓 접속 및 로그인 관련 클라이언트 송신 함수 설정
   */
  componentDidMount() {
    const { chat } = this.props;
    chat.connect();
    const { socket } = chat;

    socket.on('login', ({ user }) => {
      chat.setUser(user);
      Router.pushRoute('/list');
    });

    socket.on('updateUsers', ({ users }) => {
      chat.setUsers(users);
    });
  }

  /**
   * 접속 버튼 클릭 시 유효성 체크 및 페이지 이동 처리
   */
  onConnect = (values, { setErrors, setSubmitting }) => {
    const { socket } = this.props.chat;

    if (!socket || socket.io.readyState === 'closed') {
      setErrors({ userId: '새로고침 후 다시 접속해주세요.' });
      setSubmitting(false);
      return;
    }

    socket.emit('login', {
      user: {
        userId: values.userId
      }
    });
  };

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
