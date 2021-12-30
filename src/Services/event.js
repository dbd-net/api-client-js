import Token from '../token';

export default class Event {

  constructor() {
    this.token = new Token();
    this.validDomain = false;
    if (this.token.getDomainId() == 1000001)  {
      this.validDomain = true;
    }
  }

  registerStart() {
    if (!this.validDomain) {
      console.log('domain not valid');
      return;
    }
    if (typeof fbq === "function") {
      fbq("track","InitiateCheckout", {step: "registration_start"});
      console.log('fbq fired');
    }
    if (typeof srtmCommands.push === "function") {
      srtmCommands.push({event: "track.user.registration", payload: {action: "start"}});
      console.log('srtmcommands fired');
    }
    console.log('register start event complete');
  }

  registerEnd(data) {
    if (!this.validDomain) {
      console.log('domain not valid');
      return;
    }
    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        currency: 'USD',
        value: 0,
        external_id: data.data.id
      });
      console.log('fbq fired');
    }
    if (typeof srtmCommands.push === "function") {
      srtmCommands.push({
        event: "track.user.registration",
        payload: {
            action: "complete",
            userId: data.data.id
        }
      });
      console.log('srtmcommands fired');
    }
    console.log('register end event complete');
  }

  login(data) {
    // fire postmessage event for parents listening
    let payload = {
      'data': {
        'id': Date.now().toString(),
        'type': 'event',
        'attributes': {
          'event': 'login'
        }
      }
    };
    payload.data.relationships = {'authorizationToken': data};
    this.token.getSafeOrigins().forEach(e => {
      if (e == this.token.getWebUri()) {
        window.parent.postMessage(payload, e);
      }
    });

    if (!this.validDomain) {
      console.log('domain not valid');
      return;
    }
    if (typeof fbq === "function") {
      fbq("trackCustom", "Login", { external_id: data.data.id });
      console.log('fbq fired');
    }
    if (typeof srtmCommands.push === "function") {
      srtmCommands.push({
        event: "track.user.login",
        payload: {
            action: "complete",
            userId: data.data.id
        }
      });
      console.log('srtmcommands fired');
    }

    console.log('login event complete');
  }

}
