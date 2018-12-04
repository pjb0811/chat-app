import * as React from 'react';

type Props = {
  name: string;
  base64: string;
};

/**
 * 이미지 컴포넌트
 * @class Image
 * @extends {Component<Props>}
 */
class Image extends React.Component<Props> {
  /**
   * 렌더링
   * @desc base64 정보를 가진 이미지 요소 반환
   * @returns {HTMLElement}
   */
  render() {
    const { base64, name } = this.props;

    return (
      <img
        src={`data:image/jpeg;base64,${base64}`}
        alt={name}
        style={{
          maxWidth: '100%'
        }}
      />
    );
  }
}

export default Image;
