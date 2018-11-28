import React, { Component } from 'react';

type Props = {
  width?: number;
  height?: number;
};

class Space extends Component<Props> {
  render() {
    const { width = '100%', height = '100%' } = this.props;
    return <div style={{ width, height }} />;
  }
}

export default Space;
