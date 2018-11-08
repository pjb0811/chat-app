import React, { Component } from 'react';
import mainTemplate from '../components/templates/main';
import Connect from '../components/organisms/Connect';

class Index extends Component {
  render() {
    return <Connect />;
  }
}

export default mainTemplate(Index);
