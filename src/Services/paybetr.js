import Client from '../client';

export default class Paybetr {

  constructor(config = {}) {
    this.config = config;
  }

  listCurrencies() {
    let client = new Client(this.config);
    return client.request('GET', 'paybetr/currency');
  }

  listAddresses(symbol) {
    // get address, qrcode, conv rate, min dep and notes (like for xrp)
    let client = new Client(this.config);
    return client.request('GET', 'paybetr/address/' + symbol);
  }

  createAddress(symbol) {
    let client = new Client(this.config);
    let data = {
      'symbol': symbol
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
    //
  }

  getCurrencyName(symbol) {
    switch(symbol.toLowerCase()) {
      case 'btc':
        return 'Bitcoin';
      case 'eth':
        return 'Ethereum';
      case 'xrp':
        return 'Ripple';
      default:
        return symbol;
    }
  }
  
}
