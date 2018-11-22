import React, { Component } from 'react';

type Props = {
  user: {
    userId: string;
  };
};

const withAuth = (WrappedComponent: React.ComponentType) => {
  return class Auth extends Component<Props> {
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
