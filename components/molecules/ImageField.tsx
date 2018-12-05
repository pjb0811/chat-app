import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AsyncImage from '../atoms/AsyncImage';
import getImageInfo from '../../lib/getImageInfo';
import Image from '../atoms/Image';

export type Props = {
  files: Array<File>;
  sendMessage: (
    params: { type: string; images: Array<{}>; receiver?: {} }
  ) => void;
  removeFiles: () => void;
  canDrop: boolean;
  isOver: boolean;
  classes: {
    paper: string;
    active: string;
    button: string;
  };
  receiver?: {};
};

/**
 * 이미지 입력 영역 컴포넌트
 * @class ImageField
 * @extends {Component<Props>}
 */
class ImageField extends React.Component<Props> {
  /**
   * 이미지 전송
   * @desc props로 전달받은 이미지 파일 목록을 비동기 요청을 통해 순차적으로 파일정보 확인
   * @desc base64 정보를 갖는 이미지 파일 목록를 채팅방에 전송하기 위한 서버 요청
   * @desc 서버 요청 후 현재 입력 필드의 이미지 목록 삭제
   */
  sendImages = async () => {
    const { files, sendMessage, removeFiles, receiver } = this.props;
    const images = await Promise.all(
      files.map(async file => await getImageInfo(file))
    );

    sendMessage({ type: 'image', images, receiver });
    removeFiles();
  };

  /**
   * 렌더링
   * @desc 파일 목록이 없을 경우 안내 메시지 컴포넌트 반환
   * @desc 파일 목록이 있는 경우 파일 타입을 확인하여 이미지 파일이 아닌 경우 경고 메시지 컴포넌트 반환
   * @desc 이미지가 아닌 파일이 있는 경우 전송 버튼 비활성화
   * @desc 이미지 파일이 확인된 경우 비동기 이미지 출력 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const { canDrop, isOver, files, classes, removeFiles } = this.props;
    const isActive = canDrop && isOver;
    let hasNotImage = false;

    if (!files.length) {
      return (
        <Paper
          elevation={1}
          className={`${classes.paper} ${isActive ? classes.active : ''}`}
        >
          <Typography
            variant="h5"
            className={`${isActive ? classes.active : ''}`}
          >
            이미지를 올려주세요.
          </Typography>
        </Paper>
      );
    }

    return (
      <Paper
        elevation={1}
        className={`${classes.paper} ${isActive ? classes.active : ''}`}
      >
        {files.map((file, i) => {
          if (!file.type.includes('image')) {
            hasNotImage = true;
            return (
              <Typography
                key={i}
                variant="h5"
                className={`${isActive ? classes.active : ''}`}
              >
                이미지 파일만 올려주세요.
              </Typography>
            );
          }

          return (
            <div key={i} className={`${isActive ? classes.active : ''}`}>
              <AsyncImage image={file}>
                {(image: { name: string; base64: string }) => (
                  <Image {...image} />
                )}
              </AsyncImage>
            </div>
          );
        })}
        <div>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.sendImages}
            disabled={hasNotImage}
          >
            SEND
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={removeFiles}
          >
            DELETE
          </Button>
        </div>
      </Paper>
    );
  }
}

export default ImageField;
