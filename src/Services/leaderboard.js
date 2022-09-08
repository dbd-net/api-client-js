import Client from '../client';

export default class Leaderboard {

  constructor(config = {}) {
    this.config = config;
  }

  list() {
    // also make sure enabled=1
    let endpoint = 'leaderboard/app/leaders?sort=weight';
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }
  
  results(uuid, limit = 20) {
    let endpoint = 'leaderboard/' + uuid + '/intervals/current?limit=' + limit;
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

  hof(uuid, limit = 20) {
    let endpoint = 'leaderboard/' + uuid + '/reports/hof?limit=' + limit;
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

}
