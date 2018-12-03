import { Component, ReactNode } from 'react';
import getImageInfo from '../../lib/getImageInfo';

export type Props = {
  image: File;
  children: (image: State['image']) => ReactNode;
};

type State = {
  image: {
    name: string;
    base64: string;
  };
};

/**
 * 비동기 이미지 파일 요청 컴포넌트
 * @class AsyncImage
 * @extends {Component<Props, State>}
 */
class AsyncImage extends Component<Props, State> {
  state: State = {
    image: {
      name: '',
      base64: ''
    }
  };

  /**
   * 이미지 정보 가져오기
   * @desc props로 전달받은 이미지 파일을 비동기 요청을 통해 파일명, base64 정보를 받은 후 state 설정
   */
  setImage = async () => {
    const image = (await getImageInfo(this.props.image)) as {
      name: string;
      base64: string;
    };

    this.setState({
      image
    });
  };

  /**
   * 컴포넌트 업데이트 여부 확인
   * @param {Props} nextProps 변경된 props
   * @param {State} nextState 변경될 state
   * @returns {boolean} 컴포넌트 업데이트 여부
   * @desc
   * 변경될 state 내 이미지 파일명과 현재 stats의 이미지 파일명이 다른 경우 컴포넌트 업데이트
   * @desc
   * 변경될 state 내 이미지 파일명과 현재 stats의 이미지 파일명이 같은 경우
   * 변경될 state 내 이미지 파일명과 현재 state 이미지 파일명이 둘다 없거나
   * 변경된 props 내 이미지 파일명과 현재 props의 이미지 파일명이 같지 않은 경우 컴포넌트 업데이트
   * 그 외 조건에서는 컴포넌트를 업데이트 하지 않음
   */
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

  /**
   * 컴포넌트 업데이트 이후 호출
   * @desc setImage 함수 호출
   */
  componentDidUpdate() {
    this.setImage();
  }

  /**
   * 렌더링
   * @desc state 내 이미지 base64 정보가 없을 경우 null 반환
   * @desc 이미지 정보가 확인된 경우 children 함수 호출
   * @returns {children | null}
   */
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
