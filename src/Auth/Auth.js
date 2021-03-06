import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export const auth0_config = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: AUTH_CONFIG.apiIdentifier,
  responseType: 'token id_token',
  scope: 'openid profile email given_name family_name',
  auto_login: false,
  loginAfterSignup: false
});

export default class Auth {

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    auth0_config.authorize();
  }

  logout() {
    localStorage.removeItem('user');
    auth0_config.logout({
      returnTo: AUTH_CONFIG.logOutCallback,
      client_id: AUTH_CONFIG.clientId
    });
  }

  redirect(redirectUri){
    if (redirectUri){
      history.replace(redirectUri);
    } else {
      history.replace("/dashboard")
    }
  }

  isAuthenticated() {
    let user = localStorage.getItem("user");
    if (user){
      user = JSON.parse(user);
      let expiresAt = user.user.session.expires;
      if (user && expiresAt){
        return new Date().getTime() < expiresAt;
      }
    }
    return false;
  }
}
