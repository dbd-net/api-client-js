export default class Token {

  constructor() {
    this.tokenName = 'gamebetr_token';
    this.baseDomainName = 'gamebetr_base_domain';
    this.apiUriName = 'gamebetr_api_uri';
    this.webUriName = 'gamebetr_web_uri';
    this.domainIdName = 'gamebetr_domain_id';
  }

  // this will inherit cookies from parent source if this page is embeded in iframe
  inheritCookies() {
    window.addEventListener('message', e => {
      if (this.getSafeOrigins().indexOf(e.origin) == -1) {
        return;
      }
      if (typeof e.data.data === 'undefined') {
        return;
      }
      let data = e.data.data;
      if (data.type != 'event') {
        return;
      }
      if (data.attributes.event != 'auth_init') {
        return;
      }
      // set cookies
      this.setCookie(this.apiUriName, data.attributes.cookies[this.apiUriName]);
      this.setCookie(this.webUriName, data.attributes.cookies[this.webUriName]);
      this.setCookie(this.domainIdName, data.attributes.cookies[this.domainIdName]);
      console.log('cookies inherited');
    }, false);
  }

  // store the token as a cookie
  setToken(token, expire) {
    // use auth api expiration as cookie expiration
    let expires = new Date(expire).toUTCString();

    // use the current domain as wildcard domain for cookie
    // let domain = '.' + this.getBaseDomain();

    // document.cookie = this.tokenName + '=' + token + ';expires=' + expires + ';domain=' + domain + ';path=/';
    document.cookie = this.tokenName + '=' + token + ';expires=' + expires + ';path=/';
    // console.log('Cookie token set as: ' + token);
    // console.log(expires);
    // console.log(domain);
  }

  setCookie(name, value) {
    document.cookie = name + '=' + value + ';path=/';
  }

  /**
   * Old token has cookie name gamebetr_token and remains if needed to be set/get manually via BO
   *
   * New token has cookie name auth and will be used if gamebetr_token does not exist
   *
   * @returns token value
   */
  getToken() {
    // if gamebetr_token cookie exists use that
    if (this.getCookie(this.tokenName)) {
      return this.getCookie(this.tokenName);
    } else {
    // else use auth cookie
      try {
        const auth = JSON.parse(this.getCookie('auth'));
        return auth.token.clearToken;
      } catch (e) {
        return '';
      }
    }
  }

  getBaseDomain() {
    if (this.getCookie(this.baseDomainName)) {
      return this.getCookie(this.baseDomainName);
    } else {
      // default to current host
      let host = window.location.host;
      return host.split('.')[host.split('.').length-2]+'.'+host.split('.')[host.split('.').length-1];
    }
  }

  getApiUri() {
    if (this.getCookie(this.apiUriName)) {
      return this.getCookie(this.apiUriName);
    } else {
      return 'https://playerapi.' + this.getBaseDomain();
    }
  }

  getWebUri() {
    if (this.getCookie(this.webUriName)) {
      return this.getCookie(this.webUriName);
    } else {
      return 'https://www.' + this.getBaseDomain();
    }
  }

  getDomainId() {
    if (this.getCookie(this.domainIdName)) {
      return this.getCookie(this.domainIdName);
    } else {
      return false;
    }
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  getSafeCookies() {
    let cookies = {};
    cookies[this.apiUriName] = this.getCookie(this.apiUriName);
    cookies[this.webUriName] = this.getCookie(this.webUriName);
    cookies[this.domainIdName] = this.getCookie(this.domainIdName);
    return cookies;
  }

  /**
   * These are safe origins to use with window.postMessage()
   */
  getSafeOrigins() {
    let origins = [];
    origins.push('https://www.playbetr.com');
    origins.push('https://www.betcoin.ag');
    origins.push('https://playerapi.playbetr.com');
    origins.push('https://playerapi.betcoin.ag');
    origins.push('https://staging.playbetr.com');
    origins.push('https://staging.betcoin.ag');
    origins.push('https://staging-playerapi.playbetr.com');
    origins.push('https://staging-playerapi.betcoin.ag');
    origins.push('http://staging.playbetr.com');
    origins.push('http://staging.betcoin.ag');
    origins.push('http://staging-playerapi.playbetr.com');
    origins.push('http://staging-playerapi.betcoin.ag');
    origins.push('http://playbetr.lndo.site');
    origins.push('http://betcoin.lndo.site');
    return origins;
  }

}
