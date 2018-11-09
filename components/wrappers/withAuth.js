import React, { Component } from 'react';

const withAuth = WrappedComponent => {
  return class Auth extends Component {
    render() {
      const { user } = this.props;

      if (user.userId) {
        return <WrappedComponent {...this.props} />;
      }

      return null;
    }
  };
};

export default withAuth;
