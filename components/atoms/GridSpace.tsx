import * as React from 'react';
import Grid from '@material-ui/core/Grid';

export type Props = {
  hasSpace: boolean;
  xs:
    | boolean
    | 'auto'
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | undefined;
};

/**
 * 빈 공간을 설정하기 위한 컴포넌트
 * @class GridSpace
 * @extends {Component<Props>}
 */
class GridSpace extends React.Component<Props> {
  /**
   * 렌더링
   * @desc 빈공간을 만들기 위한 props 정보가 확인된 경우 컴포넌트 반환. 아닌경우 null 반환
   * @returns {Component | null}
   */
  render() {
    const { hasSpace, xs } = this.props;

    if (hasSpace) {
      return <Grid item xs={xs} />;
    }

    return null;
  }
}

export default GridSpace;
