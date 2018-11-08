import React, { Component } from 'react';
import { Router } from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';
import io from 'socket.io-client';

const validate = values => {
  const errors = {};
  if (!values.userid) {
    errors.userid = 'ID를 입력해주세요';
  }
  return errors;
};

class Connect extends Component {
  state = {
    form: {
      userid: ''
    }
  };

  componentDidMount() {
    this.socket = io();
    this.socket.on('login', data => {
      console.log(data);
      Router.pushRoute('/list');
    });
  }

  handleChange = e => {
    this.setState({
      form: {
        userid: e.target.value
      }
    });
  };

  onConnect = (values, { setSubmitting }) => {
    this.socket.emit('login', {
      userid: values.userid
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
