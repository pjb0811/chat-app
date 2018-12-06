import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GridSpace, { Props as GridSpaceProps } from '../atoms/GridSpace';
import Chip from '@material-ui/core/Chip';
import Image from '../atoms/Image';
import ResizeDetector from 'react-resize-detector';
import { Motion, spring } from 'react-motion';
import { Theme, createStyles } from '@material-ui/core';
import MessageRegex from '../atoms/MessageRegex';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit * 2,
      wordBreak: 'break-all'
    },
    myself: {
      background: theme.palette.primary.main
    },
    avatar: {
      margin: 10
    },
    chip: {
      margin: theme.spacing.unit
    }
  });

export type Props = {
  classes: {
    paper: string;
    chip: string;
    myself: string;
  };
  type: string;
  message: string;
  user: {
    userId: string;
    socketId: string;
  };
  myself: {
    userId: string;
    socketId: string;
  };
  images: [];
};

type State = {
  [key: string]: {
    xs: GridSpaceProps['xs'];
  };
};

/**
 * 메시지 출력 컴포넌트
 * @class Message
 * @extends {Component<Props, State>}
 */
class Message extends React.Component<Props, State> {
  state: State = {
    info: {
      xs: 12
    },
    text: {
      xs: 6
    },
    image: {
      xs: 6
    }
  };

  /**
   * 렌더링
   * @desc 현재 사용자와 다른 사용자가 입력한 메시지에 따라 메시지 표시 위치를 정하기 위한 빈 영역 컴포넌트 반환 위치 설정
   * @desc 메시지 width 영역를 감지하기 위한 react-resize-detector 라이브러리 활용
   * @desc react-motion을 활용하여 메시지 입력 시 애니메이션 구현
   * @desc 사용자 텍스트 메시지 및 이미지 메시지 출력
   * @returns {Component}
   */
  render() {
    const { classes, type, message, user, myself, images } = this.props;
    const isInfo = type === 'info';
    const isMyMsg = user.socketId === myself.socketId;

    return (
      <React.Fragment>
        <GridSpace hasSpace={!isInfo && isMyMsg} xs={6} />
        <Grid item xs={this.state[type].xs}>
          <ResizeDetector handleWidth refreshMode="debounce" refreshRate={100}>
            {(width = 0) => (
              <Motion
                style={{
                  transformX: spring(isMyMsg ? width : -width),
                  opacity: spring(width ? 1 : 0)
                }}
              >
                {({ transformX, opacity }) => (
                  <Paper
                    className={`${classes.paper} ${
                      !isInfo && isMyMsg ? classes.myself : ''
                    }`}
                    style={{
                      transform: `translatex(${(isMyMsg ? width : -width) -
                        transformX}px)`,
                      opacity
                    }}
                  >
                    {!isInfo && (
                      <Chip label={user.userId} className={classes.chip} />
                    )}
                    {message.split('\n').map((line, i) => (
                      <Typography key={i}>
                        <MessageRegex msg={line} types={['url', 'email']} />
                      </Typography>
                    ))}
                    {images.map((image, i) => (
                      <Image key={i} {...image} />
                    ))}
                  </Paper>
                )}
              </Motion>
            )}
          </ResizeDetector>
        </Grid>
        <GridSpace hasSpace={!isInfo && !isMyMsg} xs={6} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { name: 'Message' })(Message);
