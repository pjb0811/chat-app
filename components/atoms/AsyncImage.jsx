import { Component } from 'react';
import getImageInfo from '../../lib/getImageInfo';

class AsyncImage extends Component {
  state = {
    image: {}
  };

  setImage = async () => {
    const image = await getImageInfo(this.props.image);

    this.setState({
      image
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.image.name === this.state.image.name) {
      if (!nextState.image.name && !this.state.image.name) {
        return true;
      }

      if (nextProps.image.name !== this.props.image.name) {
        return true;
      }
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    this.setImage();
  }

  render() {
    const { image } = this.state;
    const { children } = this.props;

    if (!image.base64) {
      return null;
    }

    return children(image);
  }
}

export default AsyncImage;
