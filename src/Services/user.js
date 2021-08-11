import Client from '../client';

export default class User {

  constructor(config) {
    this.config = config;
  }

  load() {
    let client = new Client(this.config);
    return client.request('GET', 'user');
  }

  enable2fa() {
    let client = new Client(this.config);
    return client.request('GET', 'user/enable2fa');
  }

  disable2fa() {
    let client = new Client(this.config);
    return client.request('GET', 'user/disable2fa');
  }

  getVariable(variable) {
    let client = new Client(this.config);
    return client.request('GET', 'user/variables/' + variable);
  }

}