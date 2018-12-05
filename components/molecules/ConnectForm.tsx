import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Field, Form } from 'formik';
import { fieldToTextField } from 'formik-material-ui';
import ProgressLoader from '../atoms/ProgressLoader';
import TextField from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import { Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
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

type TextFieldProps = {
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: any) => void;
    value: any;
    name: string;
  };
  form: FormikProps<any>;
  style: {};
  defaultValue: string | number | undefined;
  className: string;
  classes: {};
  variant: 'filled' | 'standard' | 'outlined' | undefined;
  innerRef: () => void;
  InputProps: {};
  inputProps: {};
  inputRef: () => void;
  rows: number;
  rowsMax: number;
};

/**
 * formik props를 전달해주기 위한 input 요소 HOC
 * @param props formik props
 */
const WrappedTextField = (props: TextFieldProps) => (
  <TextField
    {...fieldToTextField(props)}
    onChange={event => {
      const { value } = event.target;
      props.form.setFieldValue(props.field.name, value ? value : '');
    }}
  />
);

type Props = {
  classes: {
    container: string;
    loader: string;
  };
  isSubmitting: boolean;
  submitForm: () => void;
};

/**
 * 로그인 폼 컴포넌트
 * @class ConnectForm
 * @extends {Component<Props>}
 */
class ConnectForm extends React.Component<Props> {
  /**
   * 렌더링
   * @desc formik 라이브러리를 활용한 컴포넌트 반환
   * @returns {Component}
   */
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
