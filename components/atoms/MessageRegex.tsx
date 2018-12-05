import * as React from 'react';

type Props = {
  msg: string;
  types: Array<string>;
};

type State = {
  regexs: {
    [key: string]: {
      regex: RegExp;
      html: string;
    };
  };
};

/**
 * 메시지 내 정규식 처리 컴포넌트
 * @class MessageRegex
 * @extends {Component<Props>}
 */
class MessageRegex extends React.Component<Props, State> {
  state: State = {
    regexs: {
      url: {
        regex: /((\w+:\/\/)[-a-zA-Z0-9:@;?&=\/%\+\.\*!'\(\),\$_\{\}\^~\[\]`#|]+)/g,
        html: '<a href="$&" target="_blank">$&</a>'
      },
      email: {
        regex: /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/gim,
        html: '<a href="mailto:$&">$&</a>'
      }
    }
  };
  /**
   * 렌더링
   * @desc 정규식 확인 후 매칭되는 문자열을 종류에 맞게 html 요소로 변경
   * @returns {HTMLElement}
   */
  render() {
    const { msg, types } = this.props;
    const { regexs } = this.state;
    let replaceMsg = msg;

    types.forEach(type => {
      replaceMsg = replaceMsg.replace(regexs[type].regex, regexs[type].html);
    });

    return <span dangerouslySetInnerHTML={{ __html: replaceMsg }} />;
  }
}

export default MessageRegex;
