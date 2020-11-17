/**
Example usage:
let client = new Client({'domainId': 1000001});
client.request('GET', '/api/v1/endpoint').then(data => console.log(data))
*/
export default class Client {

  constructor(config) {
    this.baseUri = 'https://devpub-api.dbd.net'

    if (typeof config.baseUri !== 'undefined') {
      this.setBaseUri(config.baseUri);
    }
    if (typeof config.domainId !== 'undefined') {
      this.setDomainId(config.domainId);
    }
    if (typeof config.token !== 'undefined') {
      this.setToken(config.token);
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

  request(method, uri, bodyData) {
    // headers
    var myHeaders = new Headers();
    myHeaders.append("DomainId", this.domainId);
    if (typeof this.token !== 'undefined') {
      console.log('token is set');
      myHeaders.append("Authorization", "Bearer " + this.token);
    }

    // form data
    var myBody = new FormData();
    var dataMethods = ['POST', 'PUT', 'PATCH'];
    if (dataMethods.indexOf(method) !== -1) {
      for (const key in bodyData) {
        myBody.append(`${key}`, `${bodyData[key]}`);
      }
    };

    // build request
    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: myBody,
    };

    // return response Promise
    return fetch(this.baseUri + uri, requestOptions)
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch Error: ', error);
      });

  }

}
