let store = null;

class Store {}

export function initStore(props) {
  if (Object.keys(props).length) {
    return new Store(props);
  }
  if (store === null) {
    store = new Store({});
  }
  return store;
}
