import * as React from 'react';
import main from 'components/templates/main';

class EmptyPage extends React.Component {
  render() {
    return <div {...this.props} />;
  }
}

export default main(EmptyPage);
