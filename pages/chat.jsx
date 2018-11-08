import React, { Component, Fragment } from 'react';
import mainTemplate from '../components/templates/main';
import Messages from '../components/organisms/Messages';
import InputArea from '../components/organisms/InputArea';

class Chat extends Component {
  render() {
    return (
      <Fragment>
        <Messages />
        <InputArea />
      </Fragment>
    );
  }
}

export default mainTemplate(Chat);
