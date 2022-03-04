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

  createConversion(domain_id, player_id, affiliate_id = 0, template_id = '', custom_id = '', promo_code = '') {
    let client = new Client(this.config);
    let data = {
      'domain_id': domain_id,
      'player_id': player_id,
      'affiliate_id': affiliate_id,
      'template_id': template_id,
      'custom_id': custom_id,
      'promo_code': promo_code
    };
    return client.request('POST', 'affiliate/conversions', data);
  }

  listClicks(date_start, date_end) {
    let client = new Client(this.config);
    return client.request('GET', 'affiliate/clicks?filter[created_at]=bt|' + date_start + ';' + date_end + '&page[size]=9999');
  }

  listSignups(date_start, date_end) {
    let client = new Client(this.config);
    return client.request('GET', 'affiliate/user/list?filter[created_at]=bt|' + date_start + ';' + date_end + '&page[size]=9999');
  }

  listEarnings(bank_uuid, bank_account_uuid, vocabulary, tags, date_start, date_end) {
    let client = new Client(this.config);
    return client.request('GET', 'bank/' + bank_uuid + '/reports/win-loss-by-tags?filter[bank-account-uuid]=' + bank_account_uuid + '&filter[vocabulary]=' + vocabulary + '&' + tags + ' &filter[date-start]=' + date_start + '&filter[date-end]=' + date_end);
  }

}
