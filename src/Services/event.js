import Token from '../token';

export default class Event {

  constructor() {
    let token = new Token();
    this.validDomain = false;
    if (token.getDomainId() == 1000001)  {
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

  registerEnd(uuid) {
    if (!this.validDomain) {
      console.log('domain not valid');
      return;
    }
    if (typeof fbq === "function") {
      fbq("track", "Lead", {
        currency: 'USD',
        value: 0,
        external_id: uuid
      });
      console.log('fbq fired');
    }
    if (typeof srtmCommands.push === "function") {
      srtmCommands.push({
        event: "track.user.registration",
        payload: {
            action: "complete",
            userId: uuid
        }
      });
      console.log('srtmcommands fired');
    }
    console.log('register end event complete');
  }

  login(uuid) {
    if (!this.validDomain) {
      console.log('domain not valid');
      return;
    }
    if (typeof fbq === "function") {
      fbq("trackCustom", "Login", { external_id: uuid });
      console.log('fbq fired');
    }
    if (typeof srtmCommands.push === "function") {
      srtmCommands.push({
        event: "track.user.login",
        payload: {
            action: "complete",
            userId: uuid
        }
      });
      console.log('srtmcommands fired');
    }
    console.log('login event complete');
  }

}
