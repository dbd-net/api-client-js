import Client from '../client';

export default class Leaderboard {

  constructor(config = {}) {
    this.config = config;
  }
  
  results(uuid) {
    let endpoint = 'leaderboard/' + uuid + '/intervals/current';
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

  hof(uuid) {
    let endpoint = 'leaderboard/' + uuid + '/reports/hof';
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

}
