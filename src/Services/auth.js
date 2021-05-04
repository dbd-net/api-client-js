import Client from '../client';
import Token from '../token';

export default class Auth {

  constructor(config) {
    this.config = config;
  }

  // client side validation
  validateRegister(name, email, password) {
    console.log('Client side validating: ' + name + email + 'pwd');
  }

  register(name, email, password) {
    let client = new Client(this.config);
    let data = {
      'name': name,
      'email': email,
      'password': password
    };
    return client.request('POST', 'user/register', data);

  }

  login(email, password, domainId) {
    console.log('start login');
    let client = new Client(this.config);
    let data = {
      'email': email,
      'password': password,
      'domain_id': domainId
    };

    // set cookie
    // let token = new Token();
    // token.setToken('my token ABC', 'expire date');
    // let myToken = token.getToken();

    return client.request('POST', 'user/login', data);
  }

  logout() {
    console.log('logout');
  }

  enable2fa() {
    //
  }

  disable2fa() {
    //
  }

  updateAvatar() {
    //
  }

  updateProfile() {
    //
  }

}
