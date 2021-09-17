export default class Token {

  constructor() {
    this.tokenName = 'gamebetr_token';
    // set from external source
    this.baseDomainName = 'gamebetr_base_domain';
    this.apiUriName = 'gamebetr_api_uri';
    this.webUriName = 'gamebetr_web_uri';
    this.domainIdName = 'gamebetr_domain_id';
  }

  // store the token as a cookie
  setToken(token, expire) {
    // use auth api expiration as cookie expiration
    let expires = new Date(expire).toUTCString();

    // use the current domain as wildcard domain for cookie
    let domain = '.' + this.getBaseDomain();
    
    document.cookie = this.tokenName + '=' + token + ';expires=' + expires + ';domain=' + domain + ';path=/';
    // console.log('Cookie token set as: ' + token);
    // console.log(expires);
    // console.log(domain);
  }

  getToken() {
    return this.getCookie(this.tokenName);
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

  // logout
  deleteToken() {
    //
  }
}
