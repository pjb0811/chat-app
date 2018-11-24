import React, { Component } from 'react';

type Props = {
  router: {
    route: string;
  };
};

const withBackground = <P extends Props>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class Background extends Component<Props> {
    render() {
      const { route } = this.props.router;
      const style = { background: '#9bbbd4', height: '100%' };

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
