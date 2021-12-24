import Client from '../client';

export default class Auth {

  constructor(config = {}) {
    this.config = config;
  }

  // client side validation
  validateRegister(name, email, password) {
    // console.log('Client side validating: ' + name + email + 'pwd');
  }

  register(name, email, password, affiliate_id = 0) {
    let client = new Client(this.config);
    let data = {
      'name': name,
      'email': email,
      'password': password
    };
    if (affiliate_id > 0) {
    	data.affiliate_id = affiliate_id;
    }
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

  login2fa(email, password, key) {
    let client = new Client(this.config);
    let data = {
      'email': email,
      'password': password,
      'key': key,
    };
    return client.request('POST', 'user/login_2fa', data);
  }

  forgotPassword(email, new_password) {
    let client = new Client(this.config);
    let data = {
      'email': email,
      'new_password': new_password,
    };
    return client.request('POST', 'user/password', data);
  }

  logout() {
    // console.log('logout');
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
