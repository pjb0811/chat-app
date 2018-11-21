import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AsyncImage from '../atoms/AsyncImage';
import getImageInfo from '../../lib/getImageInfo';
import Image from '../atoms/Image';

type Props = {
  files: Array<File>;
  sendMessage: (params: { type: string; images: Array<{}> }) => void;
  removeFiles: () => void;
  canDrop: boolean;
  isOver: boolean;
  classes: {
    paper: string;
    active: string;
    button: string;
  };
};

class ImageField extends Component<Props> {
  sendImages = async () => {
    const { files, sendMessage, removeFiles } = this.props;
    const images = await Promise.all(
      files.map(async file => await getImageInfo(file))
    );

    sendMessage({ type: 'image', images });
    removeFiles();
  };

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
