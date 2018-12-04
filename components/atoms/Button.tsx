import * as React from 'react';
import Button from '@material-ui/core/Button';
import withAuth, { Props } from '../wrappers/withAuth';

/**
 * 커스텀 버튼
 * @desc HOC를 활용하기 위한 버튼 컴포넌트
 * @class CustomButton
 * @extends {Component<Props>}
 */
class CustomButton extends React.Component<Props> {
  /**
   * 렌더링
   * @desc props로 전달받은 color 값 및 children, onClick 이벤트를 설정한 버튼 컴포넌트 렌더링
   * @returns {Component}
   */
  render() {
    const { children, onClick, color } = this.props;
    return (
      <Button color={color} onClick={onClick}>
        {children}
      </Button>
    );
  }
}

export default withAuth(CustomButton);
