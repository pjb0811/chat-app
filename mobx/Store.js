import Chat from './Chat';

let store = null;

class Store {
  constructor(props) {
    this.chat = new Chat(props.chat ? props.chat : null);
  }
}

export function initStore(props) {
  if (Object.keys(props).length) {
    return new Store(props);
  }
  if (store === null) {
    store = new Store({});
  }
  return store;
}
