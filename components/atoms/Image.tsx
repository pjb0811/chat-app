import React, { Component } from 'react';

type Props = {
  name: string;
  base64: string;
};

class Image extends Component<Props> {
  render() {
    const { base64, name } = this.props;

    return (
      <img
        src={`data:image/jpeg;base64,${base64}`}
        alt={name}
        style={{
          maxWidth: '100%'
        }}
      />
    );
  }
}

export default Image;
