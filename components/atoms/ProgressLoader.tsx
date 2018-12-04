import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

type Props = {
  isLoading: boolean;
  className: string;
};

/**
 * 로딩 프로그레스 컴포넌트
 * @class ProgressLoader
 * @extends {Component<Props>}
 */
class ProgressLoader extends React.Component<Props> {
  /**
   * 렌더링
   * @desc 로딩 진행 여부 props가 확인될 경우 로딩 프로그레스 컴포넌트 반환. 아닌 경우 null 반환
   * @returns {Component | null}
   */
  render() {
    const { isLoading, className } = this.props;

    if (isLoading) {
      return (
        <div className={className}>
          <CircularProgress />
        </div>
      );
    }

    return null;
  }
}

export default ProgressLoader;
