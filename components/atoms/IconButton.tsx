import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import withAuth, { Props } from '../wrappers/withAuth';

/**
 * 커스텀 아이콘 버튼
 * @desc HOC를 활용하기 위한 버튼 컴포넌트
 * @class CustomIconButton
 * @extends {Component<Props>}
 */
class CustomIconButton extends React.Component<Props> {
  /**
   * 렌더링
   * @desc props로 전달받은 color 값 및 children, onClick 이벤트를 설정한 아이콘 버튼 컴포넌트 렌더링
   * @returns {Component}
   */
  render() {
    const { children, color, onClick } = this.props;

    return (
      <IconButton color={color} onClick={onClick}>
        {children}
      </IconButton>
    );
  }
}

export default withAuth(CustomIconButton);
