import Client from '../client';

export default class Leaderboard {

  constructor(config = {}) {
    this.config = config;
  }
  
  mostBets() {
    let client = new Client(this.config);
    return client.request('GET', 'leaderboard/reports/most-bets');
  }

  topBet() {
    let client = new Client(this.config);
    return client.request('GET', 'leaderboard/reports/top-bet');
  }

}
