import Client from '../client';

export default class Bank {

  constructor(config = {}) {
    this.config = config;
  }
  
  listBankAccounts() {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account?sort=-primary,bank.weight');
  }

  getBankAccount(type) {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account/' + type);
  }

  getPrimaryBankAccount() {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account?sort=-primary&page[size]=1');
  }

  setPrimaryBankAccount(display_unit) {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account/' + display_unit + '/primary');
  }

  createAccountTransfer(from, to, amount) {
    let client = new Client(this.config);
    let data = {
      'from': from,
      'to': to,
      'amount': amount
    };
    return client.request('POST', 'bank/transfer', data);
  }

  createP2pTransfer(to_player_id, currency, amount, note = '') {
    let client = new Client(this.config);
    let data = {
      'to_player_id': to_player_id,
      'currency': currency,
      'amount': amount,
      'note': note
    };
    return client.request('POST', 'p2p/transfer', data);
  }

  buyCurrency(toPay, toBuy, amount) {
    let client = new Client(this.config);
    let data = {
      'toPay': toPay,
      'toBuy': toBuy,
      'payAmount': amount
    };
    return client.request('POST', 'bank/currency/buy', data);
  }

}
