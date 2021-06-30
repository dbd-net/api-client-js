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
  
  // get user data like profile, vip, aff, w/e else
  loadData() {
    // affiliate
      // referrer
      // count
    // vip
      // current level
      // next level
      // status points
  }

}