import React, { Fragment } from 'react';
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../organisms/AppBar';
import { observer, inject } from 'mobx-react';
import * as Routes from '../../lib/routes';
import { Theme, createStyles } from '@material-ui/core';
import withBackground from '../wrappers/withBackground';
import ChatWindow from '../organisms/ChatWindow';
import { User } from '../../mobx/Chat';

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
  };
  classes: {
    root: string;
    space: string;
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
      }
    }

    /**
     * 로그아웃 처리를 위한 클라이언트 측 요청
     */
    logout = () => {
      const { socket } = this.props.chat;
      socket.emit('logout');
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

    /**
     * 렌더링
     * @desc 상단 앱 바 컴포넌트 및 페이지 컴포넌트 반환
     * @desc next/Head 를 활용한 title 설정
     * @returns {Component}
     */
    render() {
      const { classes, router, chat } = this.props;
      const { user, users, invites, toggleWindow } = chat;
      console.log(users);

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
          {users.map((user, i) => (
            <ChatWindow
              key={i}
              width={300}
              height={300}
              position={'center'}
              direction={'top'}
              resize={true}
              open={user.window.open}
              onClose={() => {
                toggleWindow({ user, open: false });
              }}
            >
              test
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
