import Client from '../client';

export default class Prize {

  constructor(config = {}) {
    this.config = config;
  }
  
  buy(prize_item_uuid, prize_exposed_value = '') {
    let client = new Client(this.config);
    return client.request('POST', 'vip/prize/buy');
  }

}
