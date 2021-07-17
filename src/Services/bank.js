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
    console.log('create transfer');
    let client = new Client(this.config);
    let data = {
      'from': from,
      'to': to,
      'amount': amount
    };
    return client.request('POST', 'bank/transfer', data);
  }

}
