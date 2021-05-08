import Token from './token';

/**
Example usage:
let client = new Client({'domainId': 1000001});
client.request('GET', '/api/v1/endpoint').then(data => console.log(data))
*/
export default class Client {

  constructor(config = {}) {
    const token = new Token();
    this.baseUri = 'https://devpub-api.dbd.net/api/v1/'

    if (typeof config.baseUri !== 'undefined') {
      this.setBaseUri(config.baseUri);
    }
    // if (typeof config.domainId !== 'undefined') {
    //   this.setDomainId(config.domainId);
    // }
    if (typeof config.token !== 'undefined') {
      this.setToken(config.token);
    } else {
      console.log('client instantiated with token: ' + token.getToken());
      this.setToken(token.getToken());
    }
  }

  setBaseUri(baseUri) {
    this.baseUri = baseUri;
  }

  setDomainId(domainId) {
    this.domainId = domainId;
  }

  setToken(token) {
    this.token = token;
  }

  request(method, uri, bodyData = null) {
    var myHeaders = {
      'Authorization': 'Bearer ' + this.token
    };

    var requestOptions = {
      method: method,
      headers: myHeaders,
    };

    // form data
    if (bodyData != null) {
      var myBody = new FormData();
      var dataMethods = ['POST', 'PUT', 'PATCH'];
      if (dataMethods.indexOf(method) !== -1) {
        for (const key in bodyData) {
          myBody.append(`${key}`, `${bodyData[key]}`);
        }
      };
      // append body to request
      requestOptions.body = myBody;

    }

    // requestOptions.mode = "no-cors";

    console.log(this.baseUri + uri);
    console.log(requestOptions);

    // return response Promise
    return fetch(this.baseUri + uri, requestOptions)
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch Error: ', error);
      });

  }

}
