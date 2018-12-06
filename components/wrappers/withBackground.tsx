import * as React from 'react';

type Props = {
  children?: React.ReactNode;
  router: { route: string };
  bgStyle: {};
};

/**
 * 배경색 변경 HOC
 * @param WrappedComponent 확인할 컴포넌트
 */
const withBackground = (WrappedComponent: React.ComponentType<Props>) => {
  return class Background extends React.Component<Props> {
    /**
     * 렌더링
     * @desc 라우팅명이 '/chat'일 경우에만 배경색 변경
     * @returns {Component}
     */
    render() {
      const { route } = this.props.router;
      const style = { background: '#9bbbd4', minHeight: '100%' };

      if (route === '/chat') {
        return <WrappedComponent {...this.props} bgStyle={style} />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withBackground;
