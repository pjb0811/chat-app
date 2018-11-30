import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MessageField from '../molecules/MessageField';
import { NativeFiles } from 'react-dnd-component';
import Fade from '@material-ui/core/Fade';
import ImageField from '../molecules/ImageField';
import { Theme, createStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'fixed',
      top: 'auto',
      left: 0,
      bottom: 0,
      padding: theme.spacing.unit * 2,
      background: theme.palette.secondary.main,
      display: 'flex'
    },
    inputContainer: {
      flexGrow: 1,
      alignItems: 'center'
    },
    input: {
      background: theme.palette.common.white
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center'
    },
    button: {
      margin: theme.spacing.unit
    },
    space: {
      height: 120
    },
    paper: {
      padding: theme.spacing.unit,
      minHeight: 100,
      maxHeight: 500,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      overflowY: 'scroll'
    },
    active: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  });

type Props = {
  classes: {
    space: string;
    root: string;
    inputContainer: string;
    input: string;
    buttonContainer: string;
    button: string;
  };
  sendMessage: (
    params: {
    type: string;
    message: string;
    images: Array<{}>;
    }
  ) => void;
};

/**
 * 입력 영역 컴포넌트
 * @class InputArea
 * @extends {Component<Props>}
 */
class InputArea extends Component<Props> {
  /**
   * 렌더링
   * @desc 직접 만든 react-dnd-component 를 활용한 파일 Drag & Drop 여부 감지
   * @desc 파일 드래그 여부에 따른 이미지 입력 영역 또는 메시지 입력 영역 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.space} />
        <NativeFiles>
          {props => {
            const { canDrop, files } = props;

            if (canDrop || files.length) {
              return (
                <div color="secondary" className={classes.root}>
                  <ImageField {...this.props} {...props} />
                </div>
              );
            }

            return (
              <Fade in={!canDrop}>
                <div color="secondary" className={classes.root}>
                  <MessageField {...this.props} />
                </div>
              </Fade>
            );
          }}
        </NativeFiles>
      </Fragment>
    );
  }
}

export default withStyles(styles, { name: 'InputArea' })(InputArea);
