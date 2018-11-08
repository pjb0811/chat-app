import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Router } from '../../lib/routes';
import { Formik } from 'formik';
import ConnectForm from '../molecules/ConnectForm';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

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
    const { classes } = this.props;

    return (
      <Paper className={classes.paper} elevation={1}>
        <Formik
          initialValues={this.state.form}
          validate={validate}
          onSubmit={this.onConnect}
          render={({ submitForm, isSubmitting }) => (
            <ConnectForm submitForm={submitForm} isSubmitting={isSubmitting} />
          )}
        />
      </Paper>
    );
  }
}

export default withStyles(styles, { name: 'Connect' })(Connect);
