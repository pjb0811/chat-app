/**
 * 채팅 관련 웹소켓 서버
 * @param {*} server 서버 인스턴스
 * @desc 서버 인스턴스에 소켓 연결 후 전체 사용자 목록 관련 배열 초기화
 */
const chatServer = server => {
  const io = require('socket.io').listen(server);
  let users = [];

  /**
   * 소켓 연결 시 동작 설정
   * @param {*} socket 소켓 인스턴스
   */
  io.on('connection', socket => {
    /**
     * @desc 클라이언트로부터 전달받은 로그인 응답 처리
     * @desc 현재 사용자의 아이디가 있을 경우 전체 사용자 목록에 현재 사용자 정보 업데이트
     */
    socket.on('login', ({ user }) => {
      if (user.userId) {
        users.push({
          ...user,
          socketId: socket.id
        });
      }

      /**
       * @desc 로그인을 위한 서버 측 요청
       * @desc 현재 사용자에게 사용자가 입력한 아이디 및 소켓 아이디 전달
       */
      socket.emit('login', {
        user: {
          ...user,
          socketId: socket.id
        }
      });

      /**
       * @desc 전체 사용자 업데이트를 위한 서버 측 요청
       * @desc 전체 사용자에게 업데이트된 전체 사용자 목록 전달
       */
      io.emit('updateUsers', {
        users
      });

      socket.emit('setWindow', {
        user: {
          ...user,
          socketId: socket.id
        }
      });

      socket.broadcast.emit('updateWindow', {
        user: {
          ...user,
          socketId: socket.id
        }
      });
    });

    /**
     * @desc 클라이언트로부터 전달받은 로그아웃 응답 처리
     * @desc 전체 사용자 목록에서 현재 사용자 정보 제거
     */
    socket.on('logout', ({ user }) => {
      users = users.filter(user => user.socketId !== socket.id);
      socket.emit('logout');

      /**
       * @desc 전체 사용자 업데이트를 위한 서버 측 요청
       * @desc 전체 사용자에게 업데이트된 전체 사용자 목록 전달
       */
      io.emit('updateUsers', {
        users
      });

      socket.broadcast.emit('removeWindow', {
        user: {
          ...user,
          socketId: socket.id
        }
      });
    });

    /**
     * @desc 클라이언트로부터 전달받은 연결 해제 응답 처리
     * @desc 전체 사용자 목록에서 현재 사용자 정보 제거
     * @desc 연결이 끊긴 상태이기 때문에 클라이언트 측에 요청하지 않음
     */
    socket.on('disconnect', () => {
      users = users.filter(user => user.socketId !== socket.id);
    });

    /**
     * @desc 클라이언트로부터 전달받은 채팅방 입장 응답 처리
     * @desc 채팅방 입장 후 전체 사용자 목록에서 클라이언트로부터 전달받은 소켓 아이디에 해당하는 사용자 정보 제거(채팅방에 입장할 경우 현재 사용자의 소켓정보가 변경됨)
     * @desc 새롭게 수정된 현재 사용자 정보를 전체 사용자 목록에 추가
     */
    socket.on('join', ({ room, user }) => {
      socket.join(room);
      users = users.filter(
        currentUser => currentUser.socketId !== user.socketId
      );

      if (user.userId) {
        users.push({
          ...user,
          socketId: socket.id,
          room
        });
      }

      /**
       * @desc 현재 사용자 정보 업데이트를 위한 서버 측 요청
       * @desc 현재 사용자 정보 전달
       */
      socket.emit('updateUser', {
        user: {
          ...user,
          socketId: socket.id
        }
      });

      /**
       * @desc 전체 사용자 업데이트를 위한 서버 측 요청
       * @desc 전체 사용자에게 업데이트된 전체 사용자 목록 전달
       */
      io.emit('updateUsers', {
        users
      });

      /**
       * @desc 채팅방 입장 시 메시지 전달을 위한 서버 측 요청
       * @desc 채탕방 사용자에게 입장 안내 메시지 전달
       */
      io.to(room).emit('join', {
        messages: {
          user: {
            ...user,
            socketId: socket.id
          },
          type: 'info',
          message: `${user.userId}님이 입장했습니다.`,
          images: []
        }
      });

      socket.broadcast.emit('updateWindow', {
        user: {
          ...user,
          socketId: socket.id
        }
      });
    });

    /**
     * @desc 클라이언트로부터 전달받은 채팅방 메시지 전송 응답 처리
     * @desc 채팅방 사용자에서 현재 사용자가 입력한 메시지 전달
     */
    socket.on('chat', ({ room, user, type, message, images }) => {
      io.to(room).emit('chat', {
        messages: {
          user,
          type,
          message,
          images
        }
      });
    });

    /**
     * @desc 클라이언트로부터 전달받은 채팅방 퇴장 응답 처리
     * @desc 전체 사용자 목록에서 현재 사용자의 채팅방 정보 초기화
     */
    socket.on('leave', ({ room, user }) => {
      users = users.map(user => {
        if (user.socketId === socket.id) {
          user.room = '';
        }
        return user;
      });

      /**
       * @desc 전체 사용자 업데이트를 위한 서버 측 요청
       * @desc 전체 사용자에게 업데이트된 전체 사용자 목록 전달
       */
      io.emit('updateUsers', {
        users
      });

      /**
       * @desc 채팅방 퇴장 시 메시지 전달을 위한 서버 측 요청
       * @desc 채탕방 사용자에게 퇴장 안내 메시지 전달
       */
      io.to(room).emit('leave', {
        messages: {
          user,
          type: 'info',
          message: `${user.userId}님이 퇴장했습니다.`,
          images: []
        }
      });

      /**
       * @desc 채팅방 퇴장 시 현재 사용자의 채팅방 메시지 초기화를 위한 서버 측 요청 후 채팅방 퇴장
       */
      socket.emit('resetMessages');
      socket.leave(room);
    });

    /**
     * @desc 클라이언트로부터 전달받은 다른 사용자 채팅방 초대 응답 처리
     */
    socket.on('inviteRoom', ({ sender, receiver, room }) => {
      const time = new Date().getTime();

      /**
       * @desc 다른 사용자 초대를 위한 서버 측 요청
       * @desc 초대할 사용자에게 초대한 사용자 정보, 채팅방 이름, 초대한 시간 정보 전달
       */
      io.to(receiver.socketId).emit('inviteRoom', {
        sender,
        room,
        time
      });
    });

    socket.on('chatWindow', ({ sender, receiver, type, message, images }) => {
      const time = new Date().getTime();

      io.to(receiver.socketId).emit('chatWindow', {
        sender,
        type,
        message,
        images,
        time
      });
    });
  });
};

module.exports = chatServer;
