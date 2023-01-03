import Client from '../client';

export default class Prize {

  constructor(config = {}) {
    this.config = config;
  }
  
  redeem(prize_item_uuid, prize_exposed_value = '') {
    let client = new Client(this.config);
    let data = {
      'prize_item_uuid': prize_item_uuid,
      'prize_exposed_value': prize_exposed_value
    };
    return client.request('POST', 'vip/prize/redeem', data);
  }

}
