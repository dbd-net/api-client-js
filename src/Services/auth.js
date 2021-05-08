import Client from '../client';
import Token from '../token';

export default class Auth {

  constructor(config = {}) {
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

  login(email, password) {
    let client = new Client(this.config);
    let data = {
      'email': email,
      'password': password,
    };
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
