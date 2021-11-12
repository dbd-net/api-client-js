import Token from './token';

/**
 * Example usage:
 * let client = new Client({'baseUri': 'https://www.site.com'});
 * client.request('GET', 'endpoint').then(data => console.log(data))
 */
export default class Client {

  constructor(config = {}) {
    const token = new Token();

    this.baseUri = token.getApiUri();

    if (typeof config.baseUri !== 'undefined') {
      this.setBaseUri(config.baseUri);
    }
    if (typeof config.token !== 'undefined') {
      this.setToken(config.token);
    } else {
      // console.log('client instantiated with token: ' + token.getToken());
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

    // return response Promise
    var requestUrl = this.baseUri + '/api/v1/' + uri

    // console.log(requestUrl);
    // console.log(requestOptions);

    return fetch(requestUrl, requestOptions)
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch Error: ', error);
      });

  }

}
