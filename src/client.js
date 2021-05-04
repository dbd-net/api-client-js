/**
Example usage:
let client = new Client({'domainId': 1000001});
client.request('GET', '/api/v1/endpoint').then(data => console.log(data))
*/
export default class Client {

  constructor(config) {
    this.baseUri = 'https://devpub-api.dbd.net/api/v1/'

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

  request(method, uri, bodyData = null) {
    // headers
    // var myHeaders = {};
    // // myHeaders.DomainId = this.domainId;
    // // myHeaders.content-type = 'application.json';
    // if (typeof this.token !== 'undefined') {
    //   console.log('token is set as: ' + this.token);
    //   myHeaders.Authorization = "Bearer " + this.token;
    // }

    var myHeaders = {
      'Authorization': 'Bearer ' + this.token
    };

    var requestOptions = {
      method: method,
      headers: myHeaders,
    };
    console.log(requestOptions);

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

    // build request
    // var requestOptions = {
    //   method: method,
    //   headers: myHeaders,
    //   body: myBody,
    // };

    // return response Promise
    return fetch(this.baseUri + uri, requestOptions)
      .then(response => response.json())
      .catch(function(error) {
        console.log('Fetch Error: ', error);
      });

  }

}
