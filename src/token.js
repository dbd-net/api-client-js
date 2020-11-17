export default class Token {

  constructor() {
    this.tokenName = 'gamebetrToken';
  }

  // store the token as a cookie
  setToken(token, expire) {
    // TODO: probably set expiration with login return value
    console.log(expire);
    document.cookie = this.tokenName + '=' + token;
    console.log('Cookie token set as: ' + token);
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
}
