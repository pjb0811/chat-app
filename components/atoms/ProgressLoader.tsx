import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

type Props = {
  isLoading: boolean;
  className: string;
};

class ProgressLoader extends Component<Props> {
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
