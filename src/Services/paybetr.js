import Client from '../client';

export default class Paybetr {

  constructor(config = {}) {
    this.config = config;
  }

  listCurrencies() {
    let client = new Client(this.config);
    return client.request('GET', 'paybetr/currency');
  }

  getAddress(symbol) {
    let client = new Client(this.config);
    let data = {
      'symbol': symbol
    };
    return client.request('POST', 'paybetr/address', data);
  }

  createAddress(symbol) {
    let client = new Client(this.config);
    let data = {
      'symbol': symbol,
      'refresh': 1
    };
    return client.request('POST', 'paybetr/address', data);
  }

  createWithdrawal(symbol, address, amount) {
    let client = new Client(this.config);
    let data = {
      'symbol': symbol,
      'address': address,
      'amount': amount
    };
    return client.request('POST', 'paybetr/withdrawal', data);
  }

  convert(from, to, amount) {
    let client = new Client(this.config);
    return client.request('GET', 'paybetr/currency/' + from + '/convert/' + to + '/' + amount);
  }
  
}
