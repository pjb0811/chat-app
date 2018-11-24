import React, { Component, ReactNode, MouseEvent } from 'react';

export type Props = {
  user: {
    userId: string;
  };
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLElement>) => void;
  color: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
};

/**
 * 로그인 여부 확인 HOC
 * @param WrappedComponent 컴포넌트
 * @desc 사용자 아이디가 있을 경우에만 컴포넌트 반환
 */
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
