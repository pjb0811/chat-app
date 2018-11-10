import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withAuth from '../wrappers/withAuth';

class CustomButton extends Component {
  render() {
    const { children, onClick, color } = this.props;
    return (
      <Button color={color} onClick={onClick}>
        {children}
      </Button>
    );
  }
}

export default withAuth(CustomButton);
