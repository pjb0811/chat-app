import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withAuth from '../wrappers/withAuth';

class CustomButton extends Component {
  render() {
    return (
      <Button color="inherit" onClick={this.props.onClick}>
        Logout
      </Button>
    );
  }
}

export default withAuth(CustomButton);
