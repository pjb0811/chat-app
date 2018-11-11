import React, { Component } from 'react';

class Image extends Component {
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
