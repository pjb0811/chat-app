import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class GridSpace extends Component {
  render() {
    const { hasSpace, xs } = this.props;

    if (hasSpace) {
      return <Grid item xs={xs} />;
    }

    return null;
  }
}

export default GridSpace;
