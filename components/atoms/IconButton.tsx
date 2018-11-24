import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import withAuth, { Props } from '../wrappers/withAuth';

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
