import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

class ProgressLoader extends Component {
  render() {
    const { isLoading, className } = this.props;

    if (isLoading) {
      return (
        <div className={className}>
          <CircularProgress />
        </div>
      );
    }

    return null;
  }
}

export default ProgressLoader;
