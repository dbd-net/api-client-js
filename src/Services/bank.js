import Client from '../client';

export default class Bank {

  constructor(config = {}) {
    this.config = config;
  }
  
  listBankAccounts() {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account?sort=-primary,bank.weight');
  }

  getPrimaryBankAccount() {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account?sort=-primary&page[size]=1');
  }

  setPrimaryBankAccount(display_unit) {
    let client = new Client(this.config);
    return client.request('GET', 'bank/account/' + display_unit + '/primary');
  }

  createTransfer(from, to, amount) {
    let client = new Client(this.config);
    let data = {
      'from': from,
      'to': to,
      'amount': amount
    };
    return client.request('POST', 'bank/transfer', data);
  }

  createP2P(to, amount, notes, type) {
    let client = new Client(this.config);
    let data = {
      'to': to,
      'amount': amount,
      'notes': notes,
      'type': type
    };
    return client.request('POST', 'p2p/transfer', data);
  }

}
