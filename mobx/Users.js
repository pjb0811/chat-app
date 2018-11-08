import { observable, action } from 'mobx';

class Users {
  @observable
  state = {
    users: []
  };
}

export default Users;
