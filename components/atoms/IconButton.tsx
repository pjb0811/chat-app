import React, { Component, ReactNode } from 'react';
import IconButton from '@material-ui/core/IconButton';
import withAuth from '../wrappers/withAuth';

type Props = {
  children: ReactNode;
  onClick: () => void;
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
};

class CustomIconButton extends Component<Props> {
  render() {
    const { children, color, onClick } = this.props;

    return (
      <IconButton color={color} onClick={onClick}>
        {children}
      </IconButton>
    );
  }
}

export default withAuth(CustomIconButton);
