# chat-app

> react(Next.js) 를 활용한 채팅 웹 어플리케이션입니다.

## 실행방법

프로젝트에 필요한 패키지 설치 및 실행방법에 대한 내용입니다.

### 전역 패키지 설치

실행 전 실행에 필요한 전역 패키지를 설치가 필요합니다.

```bash
npm install -g yarn cross-env nodemon
```

### 패키지 설치

```bash
yarn
```

### 개발 서버 실행

```bash
yarn start
```

기본 포트는 `9000`번입니다. 포트 변경 시 `package.json`에서 설정 가능합니다.

```json
"start": "cross-env NODE_ENV=development PORT=9000 nodemon server",
```

### 프로젝트 빌드

```bash
yarn build
```

### 배포 서버 실행

```bash
yarn serve
```

기본 포트는 `9001`번입니다. 포트 변경 시 `package.json`에서 설정 가능합니다.

```json
"serve": "yarn build && cross-env NODE_ENV=production PORT=9001 nodemon server",
```

### 테스트 서버 실행

**테스트 실행 시 소켓 연동에 필요한 서버입니다. 테스트 전에 실행해주세요.**

```bash
yarn test:serve
```

기본 포트는 `9002`번입니다. 포트 변경 시 `package.json`에서 설정 가능합니다.

```json
"test:serve": "cross-env NODE_ENV=test PORT=9002 nodemon server/test",
```

### 테스트 실행

```bash
yarn test
```

## 기본 구성 및 설계

프로젝트를 기본적으로 구성하고 있는 주요 패키지 및 구조 설계에 대한 내용입니다.

### 주요 프레임워크 및 라이브러리

프로젝트 구성 시 사용한 주요 패키지 목록입니다.

- [`next.js`](https://nextjs.org/) - react 사용 및 기본 프로젝트 환경 설정을 쉽게 구성하기 위해 사용했습니다.
- [`mobx`](https://mobx.js.org/) - 프로젝트 내 전역 상태 관리를 위해 사용했습니다.
- [`socket.io`](https://socket.io) - 웹 소켓 통신을 위해 사용한 라이브러리입니다.
- [`material-ui`](https://material-ui.com) - UI 구성 시 사용한 프레임워크입니다.
- [`mocha`](https://mochajs.org/) - 단위 테스트 구성 시 사용한 라이브러리입니다.

### 주요 디렉토리 구성

기본 디렉토리 구성은 [Atomic Design](http://bradfrost.com/blog/post/atomic-web-design/)를 참고하여 설계했습니다.

    .
    ├── components              # 주요 컴포넌트 폴더입니다.
    │   ├── atoms                 # 원자 단위로 설계한 컴포넌트 폴더입니다.
    │   ├── molecules             # 분자 단위로 설계한 컴포넌트 폴더입니다.
    │   ├── organisms             # 생물 단위로 설계한 컴포넌트 폴더입니다.
    │   ├── templates             # 페이지 컴포넌트를 감싸는 템플릿 컴포넌트 폴더입니다.
    │   └── wrappers              # HOC, Render Props등의 컴포넌트 폴더입니다.
    ├── lib                     # 특정 기능을 제공하는 함수 및 라이브러리 관련 폴더입니다.
    ├── markdown                # 마크다운 관련 폴더입니다.
    ├── mobx                    # 전역 상태 관리를 제공하는 클래스 폴더입니다.
    ├── pages                   # 라우팅 주소에 갖는 페이지 컴포넌트 폴더입니다.
    ├── static                  # 정적 리소스 관련 폴더입니다.
    ├── test                    # 단위 테스트 관련 폴더입니다.
    │   └── components            # 컴포넌트 테스트 폴더입니다.
    │       ├── atoms               # 원자 단위 컴포넌트 테스트 폴더입니다.
    │       ├── molecules           # 분자 단위 컴포넌트 테스트 폴더입니다.
    │       ├── organisms           # 생물 단위 컴포넌트 테스트 폴더입니다.
    │       ├── pages               # 페이지 컴포넌트 테스트 폴더입니다.
    │       ├── templates           # 템플릿 컴포넌트 테스트 폴더입니다.
    │       └── wrappers            # 랩핑 컴포넌트 테스트 폴더입니다.
    └── .babelrc

## 구현

구현 시 주요 내용 및 구현 방법에 대한 내용입니다.

### HOC 및 공용 컴포넌트, 로그아웃, 사용자 초대

[HOC 및 공용 컴포넌트, 로그아웃, 사용자 초대](./markdown/utils/index.md) 구현 설명에 대한 링크입니다. 링크를 통해 확인해주세요.

### 로그인

[로그인](./markdown/login/index.md) 구현 설명에 대한 링크입니다. 링크를 통해 확인해주세요.

### 채널 입장 및 퇴장, 메시지 전송, 이미지 전송

[채널 입장 및 퇴장, 메시지 전송, 이미지 전송](./markdown/chat/index.md) 구현 설명에 대한 링크입니다. 링크를 통해 확인해주세요.

## 테스트

[단위 테스트](./markdown/test/index.md) 구현 설명에 대한 링크입니다. 링크를 통해 확인해주세요.

## 개선사항

- `Storybook` 또는 `Selenium`을 활용한 UI 및 통합 테스트 환경 구현
- `typescript`를 활용한 리팩토링
- 컴포넌트 퍼포먼스 개선 및 최적화
- 사용자간 1대 1 채팅창 기능 구현 등 부족하다고 생각되는 서비스 추가
- `firebase` 또는 `now`를 활용한 배포 기능 추가
