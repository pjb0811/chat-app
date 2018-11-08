import React, { Component } from 'react';
import { Router } from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';

const validate = values => {
  const errors = {};
  if (!values.id) {
    errors.id = 'ID를 입력해주세요';
  }
  return errors;
};

class Connect extends Component {
  state = {
    form: {
      id: ''
    }
  };

  handleChange = e => {
    this.setState({
      form: {
        id: e.target.value
      }
    });
  };

  onConnect = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      Router.pushRoute('/list');
    }, 1000);
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
