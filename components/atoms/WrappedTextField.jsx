import React from 'react';
import TextField from '@material-ui/core/TextField';
import { fieldToTextField } from 'formik-material-ui';

const WrappedTextField = props => (
  <TextField
    {...fieldToTextField(props)}
    onChange={event => {
      const { value } = event.target;
      props.form.setFieldValue(props.field.name, value ? value : '');
    }}
  />
);

export default WrappedTextField;
