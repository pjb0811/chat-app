import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export type Props = {
  sendMessage: (
    params: {
    type: string;
    message: string;
    images: Array<{}>;
    receiver?: {};
    }
  ) => void;
  classes: {
    inputContainer: string;
    input: string;
    buttonContainer: string;
    button: string;
  };
  receiver?: {};
};

/**
 * 메시지 입력 영역 컴포넌트
 * @class MessageField
 * @extends {Component<Props>}
 */
class MessageField extends React.Component<Props> {
  state = {
    message: ''
  };

  /**
   * 메시지 변경
   * @desc 입력된 메시지에 따른 state 변경
   */
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: e.target.value
    });
  };

  /**
   * 메시지 전송
   * @desc 입력된 메시지가 없을 경우 함수 실행 종료
   * @desc 메시지가 있을 경우 해당 메시지를 채팅방에 전송하기 위한 서버 요청
   * @desc  서버 요청 후 현재 입력 필드의 메시지 내용 삭제
   */
  sendMessage = () => {
    const { message } = this.state;
    const { receiver } = this.props;

    if (!message.trim()) {
      return;
    }

    this.props.sendMessage({ type: 'text', message, images: [], receiver });
    this.setState({
      message: ''
    });
  };

  /**
   * 엔터키 입력 확인
   * @desc 쉬프트키가 눌리지 않은 상태에서 엔터키 입력 시 메시지 전송
   */
  handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.sendMessage();
    }
  };

  /**
   * 렌더링
   * @desc input 필드 및 전송 버튼 컴포넌트 반환
   * @returns {Component}
   */
  render() {
    const { classes } = this.props;
    const { message } = this.state;

    return (
      <React.Fragment>
        <div className={classes.inputContainer}>
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            multiline={true}
            className={classes.input}
            value={message}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            autoFocus={true}
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.sendMessage}
          >
            SEND
          </Button>
        </div>
      </React.Fragment>
    );
  }
}

export default MessageField;
