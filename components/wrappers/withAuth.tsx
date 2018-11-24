import React, { Component, ReactNode, MouseEvent } from 'react';

export type Props = {
  user: {
    userId: string;
  };
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
};

const withAuth = <P extends Props>(
  WrappedComponent: React.ComponentType<P>
) => {
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
