import React, { Component, ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import withAuth from '../wrappers/withAuth';

type Props = {
  children: ReactNode;
  onClick: () => void;
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
};

class CustomButton extends Component<Props> {
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
