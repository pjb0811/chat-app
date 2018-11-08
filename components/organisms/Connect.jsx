import React, { Component } from 'react';
import { Router } from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';
import { toJS } from 'mobx';

const validate = values => {
  const errors = {};
  if (!values.userId) {
    errors.userId = 'ID를 입력해주세요';
  }
  return errors;
};

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
    console.log(toJS(this.props.chat.state));

    socket.on('login', data => {
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
        validate={validate}
        onSubmit={this.onConnect}
        render={({ submitForm, isSubmitting }) => (
          <ConnectForm submitForm={submitForm} isSubmitting={isSubmitting} />
        )}
      />
    );
  }
}

export default Connect;
