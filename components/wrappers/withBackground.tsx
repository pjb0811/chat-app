import React, { Component } from 'react';

type Props = {
  router: {
    route: string;
  };
};

/**
 * 배경색 변경 HOC
 * @param WrappedComponent 확인할 컴포넌트
 */
const withBackground = <P extends Props>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class Background extends Component<Props> {
    /**
     * 렌더링
     * @desc 라우팅명이 '/chat'일 경우에만 배경색 변경
     * @returns {Component}
     */
    render() {
      const { route } = this.props.router;
      const style = { background: '#9bbbd4', minHeight: '100%' };

      if (route === '/chat') {
        return (
          <div style={style}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withBackground;
