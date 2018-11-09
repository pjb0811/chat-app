import React, { Component } from 'react';
import { Router } from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';
import { toJS } from 'mobx';
import * as Yup from 'yup';

class Connect extends Component {
  state = {
    form: {
      userId: ''
    }
  };

  componentDidMount() {
    const { chat } = this.props;
    chat.connect();
    const { socket } = toJS(this.props.chat.state);

    socket.on('login', data => {
      console.log(data.users);
      chat.setUser(data.user);
      chat.setUsers(data.users);
      Router.pushRoute('/list');
    });
  }

  handleChange = e => {
    this.setState({
      form: {
        userId: e.target.value
      }
    });
  };

  onConnect = (values, { setSubmitting }) => {
    const { socket } = toJS(this.props.chat.state);

    socket.emit('login', {
      userId: values.userId
    });
  };

  render() {
    return (
      <Formik
        initialValues={this.state.form}
        validationSchema={Yup.object().shape({
          userId: Yup.string()
            .min(3, '3글자 이상 입력해주세요')
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
