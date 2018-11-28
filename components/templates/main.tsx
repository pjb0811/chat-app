import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../organisms/AppBar';
import { observer, inject } from 'mobx-react';
import * as Routes from '../../lib/routes';
import { Theme, createStyles } from '@material-ui/core';
import withBackground from '../wrappers/withBackground';
import { User } from '../../mobx/Chat';
import ChatWindow from '../organisms/ChatWindow';
import Paper from '@material-ui/core/Paper';
import InputArea from '../organisms/InputArea';
import Messages from '../organisms/Messages';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit * 2,
      overflow: 'hidden'
    },
    space: {
      ...theme.mixins.toolbar,
      marginBottom: 10
    },
    paper: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2
    },
    window: {
      margin: '5px 0',
      padding: theme.spacing.unit,
      boxSizing: 'border-box',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  });

type Props = {
  chat: {
    user: User;
    users: Array<User>;
    invites: Array<{ sender: { userId: string }; room: string; time: number }>;
    socket: {
      on: (type: string, callback: (res: any) => void) => void;
      emit: (type: string, req?: {}) => void;
    };
    setUser: (user: {}) => void;
    setUsers: (users: Array<{}>) => void;
    setInvites: (params: {}) => void;
    removeInvites: (params: {}) => void;
    toggleWindow: (params: {}) => void;
    setWindow: (params: {}) => void;
    updateWindow: (params: {}) => void;
    removeWindow: (params: {}) => void;
    setWindowMessage: (params: {}) => void;
  };
  classes: {
    root: string;
    space: string;
    window: string;
  };
  router: {
    route: string;
    query: {
      room: string;
    };
  };
};

/**
 * 메인 템플릿 HOC
 * @param Page 메인 컴포넌트
 */
const withMain = (Page: any) => {
  /**
   * 메인 템플릿 컴포넌트
   * @class MainWrapper
   * @extends {React.Component<Props>}
   */
  @inject('chat')
  @observer
  class MainWrapper extends React.Component<Props> {
    static async getInitialProps(ctx: {}) {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : null)
      };
    }

    /**
     * 컴포넌트 마운트
     */
    componentDidMount() {
      const { chat } = this.props;
      const { user, socket } = chat;

      /**
       * @desc 사용자 정보가 없을 경우 로그인 페이지로 이동
       */
      if (!user.userId || !user.socketId) {
        Routes.Router.pushRoute('/');
      }

      if (socket) {
        /**
         * @desc 서버로부터 전달받은 로그아웃 응답 처리
         * @desc 현재 사용자 정보 초기화 후 로그인 페이지로 이동
         */
        socket.on('logout', () => {
          chat.setUser({ userId: '', socketId: '' });
          (document.location as Location).replace('/');
        });

        /**
         * @desc 서버로부터 전달받은 전체 사용자 목록 업데이트 응답 처리
         */
        socket.on('updateUsers', ({ users }) => {
          chat.setUsers(users);
        });

        /**
         * @desc 서버로부터 전달받은 현재 사용자의 초대받은 목록 업데이트 응답 처리
         */
        socket.on('inviteRoom', data => {
          chat.setInvites(data);
        });

        socket.on('setWindow', ({ user }) => {
          chat.setWindow(user);
        });

        socket.on('updateWindow', ({ user }) => {
          chat.updateWindow(user);
        });

        socket.on('removeWindow', ({ user }) => {
          chat.removeWindow(user);
        });

        socket.on('chatWindow', ({ sender, type, message, images, time }) => {
          chat.setWindowMessage({
            user: sender,
            receiver: sender,
            type,
            message,
            images,
            time
          });
        });
      }
    }

    /**
     * 로그아웃 처리를 위한 클라이언트 측 요청
     */
    logout = () => {
      const { socket, user } = this.props.chat;
      socket.emit('logout', { user });
    };

    /**
     * 다른 사용자 초대하기
     */
    inviteRoom = (params: { sender: {}; receiver: {}; room: string }) => {
      const { socket } = this.props.chat;
      const { sender, receiver, room } = params;

      /**
       * @desc 다른 사용자 초대를 위한 클라이언트 측 요청
       * @desc 현재 사용자정보, 초대받을 사용자 정보, 채팅방 이름 전달
       */
      socket.emit('inviteRoom', {
        sender,
        receiver,
        room
      });
    };

    /**
     * 초대 정보 삭제
     */
    removeInvite = (invite: {}) => {
      const { chat } = this.props;
      chat.removeInvites(invite);
    };

    /**
     * 채팅방 이등
     */
    moveRoom = (params: { type: 'join' | 'leave'; room: string }) => {
      const { user, socket } = this.props.chat;
      const { type, room } = params;

      /**
       * @desc 채팅방 이동을 위한 클라이언트 측 요청
       * @desc 현재 사용자 정보 및 채팅방 이름 전달
       */
      socket.emit(type, {
        user,
        room
      });
    };

    sendMessage = (params: {
    type: string;
    message: string;
    images: Array<{}>;
    receiver?: {};
    }) => {
      const { type, message = '', images = [], receiver } = params;
      const { chat } = this.props;
      const { socket, user } = chat;

      chat.setWindowMessage({ user, receiver, type, message, images });

      socket.emit('chatWindow', {
        sender: user,
        receiver,
        type,
        message,
        images
      });
    };

    /**
     * 렌더링
     * @desc 상단 앱 바 컴포넌트 및 페이지 컴포넌트 반환
     * @desc next/Head 를 활용한 title 설정
     * @returns {Component}
     */
    render() {
      const { classes, router, chat } = this.props;
      const { user, users, invites, toggleWindow } = chat;

      return (
        <Fragment>
          <Head>
            <title>Chat App</title>
          </Head>
          <AppBar
            user={user}
            users={users}
            invites={invites}
            classes={classes}
            room={router.query.room}
            logout={this.logout}
            inviteRoom={this.inviteRoom}
            removeInvite={this.removeInvite}
            moveRoom={this.moveRoom}
            toggleWindow={toggleWindow}
          />
          <div className={classes.root}>
            <Page {...this.props} classes={classes} />
          </div>
          {user.windows.map((window, i) => (
            <ChatWindow
              key={i}
              zIndex={1200}
              width={300}
              height={300}
              position={'center'}
              direction={'top'}
              resize={true}
              open={window.open}
              receiver={window.receiver}
              onClose={() => {
                toggleWindow({ receiver: window.receiver, open: false });
              }}
            >
              <Paper className={classes.window} elevation={1}>
                <Messages messages={window.messages} myself={user} />
                <InputArea
                  receiver={window.receiver}
                  style={{
                    position: 'relative',
                    padding: '0 16px',
                    maxHeight: 100
                  }}
                  sendMessage={this.sendMessage}
                />
              </Paper>
            </ChatWindow>
          ))}
        </Fragment>
      );
    }
  }

  return withStyles(styles, { name: 'MainWrapper' })(
    withBackground(MainWrapper)
  );
};

export default withMain;
