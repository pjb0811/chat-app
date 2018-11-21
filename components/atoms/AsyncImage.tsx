import { Component, ReactNode } from 'react';
import getImageInfo from '../../lib/getImageInfo';

type Props = {
  image: File;
  children: (image: State['image']) => ReactNode;
};

type State = {
  image: {
    name: string;
    base64: string;
  };
};

class AsyncImage extends Component<Props, State> {
  state: State = {
    image: {
      name: '',
      base64: ''
    }
  };

  setImage = async () => {
    const image = await getImageInfo(this.props.image);

    this.setState({
      image
    });
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
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
