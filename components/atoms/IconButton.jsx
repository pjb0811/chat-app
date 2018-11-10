import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import withAuth from '../wrappers/withAuth';

class CustomIconButton extends Component {
  render() {
    const { users } = this.props;

    return (
      <IconButton
        aria-owns={'material-appbar'}
        aria-haspopup="true"
        onClick={this.props.onClick}
        color="inherit"
      >
        <Badge badgeContent={users.length} color="secondary">
          <AccountCircle />
        </Badge>
      </IconButton>
    );
  }
}

export default withAuth(CustomIconButton);