import Client from '../client';
import Token from '../token';

export default class Affiliate {

  constructor(config = {}) {
    this.config = config;
  }

  // create affiliate relationship if cookie exists
  createAffiliateFromCookie(user_id) {
    let affiliate_id = this.getCookieAffiliateId();
    if (!isNaN(affiliate_id)) {
      // do request here
      // console.log('do server request here: ' + user_id);
      // let client = new Client(this.config);
      // let data = {
      //   'user1': user_id,
      //   'user2': affiliate_id
      // };
      // return client.request('POST', 'the/url/here', data);
    }
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
