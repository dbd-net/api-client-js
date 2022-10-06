import Client from '../client';

export default class SurpriseBox {

  constructor(config = {}) {
    this.config = config;
  }
  
  check() {
    let client = new Client(this.config);
    return client.request('POST', 'vip/surprise-box/check');
  }

  award() {
    let client = new Client(this.config);
    return client.request('POST', 'vip/surprise-box/award');
  }

}
