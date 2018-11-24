import React, { Component } from 'react';
import * as Routes from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';
import * as Yup from 'yup';

type Props = {
  chat: {
    connect: () => void;
    socket: {
      io: {
        readyState: string;
      };
      on: (type: string, callback: (res: any) => void) => void;
      emit: (type: string, req: {}) => void;
    };
    setUser: (user: {}) => void;
    setUsers: (users: Array<{}>) => void;
  };
};

class Connect extends Component<Props> {
  state = {
    form: {
      userId: ''
    }
  };

  componentDidMount() {
    const { chat } = this.props;
    chat.connect();
    const { socket } = chat;

    socket.on('login', ({ user }) => {
      chat.setUser(user);
      Routes.Router.pushRoute('/list');
    });

    socket.on('updateUsers', ({ users }) => {
      chat.setUsers(users);
    });
  }

  onConnect = (
    values: { userId: string },
    params: {
      setErrors: (errors: { [key: string]: string }) => void;
      setSubmitting: (submitting: boolean) => void;
    }
  ) => {
    const { socket } = this.props.chat;
    const { setErrors, setSubmitting } = params;

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
