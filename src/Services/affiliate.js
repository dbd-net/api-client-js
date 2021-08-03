import Client from '../client';
import Token from '../token';

export default class Affiliate {

  constructor(config = {}) {
    this.config = config;
  }

  // check if affiliate cookie exists
  getCookieAffiliateId() {
    let token = new Token();
    return token.getCookie('gamebetr_affiliate_id');
  }

  listMedia() {
    // do this with php instead of js?
  }

  listReferredUsers() {
    //
  }

  listTiers() {
    //
  }

  listRates() {
    //
  }

}
