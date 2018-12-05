import Chat, { State } from './Chat';

let store: Store | null = null;

export type Props = {
  chat: {
    state: State;
  } | null;
};

class Store {
  chat: {};

  constructor(props: Props) {
    this.chat = new Chat(props.chat);
  }
}
/**
 * 스토어 생성 함수
 * @export
 * @param {Props} props 전역 데이터 객체
 * @returns {Store} 스토어 객체
 * @desc 전역 데이터 정보가 있을 경우 매개변수 전달
 * @desc 없을 경우 채팅 전역 데이터 null 로 전달
 */
export function initStore(props: Props) {
  if (Object.keys(props).length) {
    return new Store(props);
  }

  if (store === null) {
    store = new Store({ chat: null });
  }

  return store;
}
