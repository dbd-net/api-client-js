import Client from '../client';

export default class Bank {

  constructor(config = {}) {
    this.config = config;
  }
  
  listBankAccounts() {
    console.log('list bank accounts');
  }

  listBalances() {
    //
  }

  // how to do filters? maybe do this via php client?
  // yeah, probably hit this manually via drupal php
  listTransactions() {
    //
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
