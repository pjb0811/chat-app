import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Field, Form } from 'formik';
import { fieldToTextField } from 'formik-material-ui';
import ProgressLoader from '../atoms/ProgressLoader';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    position: 'relative'
  },
  textField: {
    flexBasis: '100%',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  loader: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  }
});

const WrappedTextField = props => (
  <TextField
    {...fieldToTextField(props)}
    onChange={event => {
      const { value } = event.target;
      props.form.setFieldValue(props.field.name, value ? value : '');
    }}
  />
);

class ConnectForm extends Component {
  render() {
    const { classes, isSubmitting, submitForm } = this.props;
    return (
      <Form className={classes.container}>
        <Typography variant="h5">Login</Typography>
        <Field
          name="userId"
          type="text"
          component={WrappedTextField}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder="ID"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          onClick={submitForm}
        >
          Connect
        </Button>
        <ProgressLoader isLoading={isSubmitting} className={classes.loader} />
      </Form>
    );
  }
}

export default withStyles(styles, { name: 'ConnectForm' })(ConnectForm);
