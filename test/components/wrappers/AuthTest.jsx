import * as React from 'react';
import withAuth from 'components/wrappers/withAuth';

@withAuth
class Test extends React.Component {
  render() {
    return <div>test</div>;
  }
}

export default Test;
