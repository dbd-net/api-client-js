import Client from '../client';

export default class Leaderboard {

  constructor(config = {}) {
    this.config = config;
  }
  
  list(type, period, currency) {
    let path = '';
    let tag = '';
    switch (type) {
      case 'most_bets_casino':
        path = 'most-bets';
        tag = 'casino';
        break;
      case 'top_bet_casino':
        path = 'top-bet';
        tag = 'casino';
        break;
      case 'most_bets_sports':
        path = 'most-bets';
        tag = 'sports';
        break;
      case 'top_bet_sports':
        path = 'top-bet';
        tag = 'sports';
        break;
    }
    let endpoint ='leaderboard/reports/' + path + '?page[size]=50&filter[tags][]=' + tag + '&filter[period]=' + period + '&filter[display-currency.display-unit]=' + currency;
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

}
