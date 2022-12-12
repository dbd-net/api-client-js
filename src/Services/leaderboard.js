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
  
  results(uuid, playerId = '', limit = 50) {
    let endpoint = 'leaderboard/' + uuid + '/intervals/current?page[size]=' + limit + '&filter[player_id]=' + playerId;
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

  hof(uuid, playerId = '', limit = 50) {
    let endpoint = 'leaderboard/' + uuid + '/reports/hof?page[size]=' + limit + '&filter[player_id]=' + playerId;
    let client = new Client(this.config);
    return client.request('GET', endpoint);
  }

}
