import Client from '../client';

export default class Leaderboard {

  constructor(config = {}) {
    this.config = config;
  }
  
  list(type, period, currency = '') {
    let path = '';
    let category = '';
    switch (type) {
      case 'most_bets_casino':
        path = 'most-bets';
        category = 'casino';
        break;
      case 'top_bet_casino':
        path = 'top-bet';
        category = 'casino';
        break;
      case 'most_bets_sports':
        path = 'most-bets';
        category = 'sports';
        break;
      case 'top_bet_sports':
        path = 'top-bet';
        category = 'sports';
        break;
    }
    let currency_filter = '';
    // if (currency != '') {
      currency_filter = '&filter[display-currency.display-unit]=' + currency;
    // }
    let endpoint ='leaderboard/reports/' + path + '?page[size]=50&filter[service-category]=' + category + '&filter[period]=' + period + currency_filter;
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

}
