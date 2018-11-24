import Chat, { State } from './Chat';

let store: Store | null = null;

type Props = {
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

export function initStore(props: Props) {
  if (Boolean(props)) {
    return new Store(props);
  }
  if (store === null) {
    store = new Store({ chat: null });
  }
  return store;
}
