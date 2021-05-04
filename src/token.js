export default class Token {

  constructor() {
    this.tokenName = 'gamebetr_token';
  }

  // store the token as a cookie
  setToken(token, expire) {
    let expires = new Date(expire).toUTCString();
    let domain = '';
    // let domain = '.' + window.location.host;
    document.cookie = this.tokenName + '=' + token + ';expires=' + expires + ';domain=' + domain;
    console.log('Cookie token set as: ' + token);
    console.log(expires);
    console.log(domain);
  }

  getToken() {
    return this.getCookie(this.tokenName);
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
