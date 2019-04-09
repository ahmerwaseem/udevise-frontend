import history from '../history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';

export const auth0_config = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: AUTH_CONFIG.apiIdentifier,
  responseType: 'token id_token',
  scope: 'openid profile email given_name family_name'
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

  logout(redirect,redirectUri) {
    localStorage.removeItem('idToken');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    if (redirect){
      redirect(redirectUri);
    }
  }

  redirect(redirectUri){
    if (redirectUri){
      history.replace(redirectUri);
    } else {
      history.replace("/dashboard")
    }
  }

  isAuthenticated() {
    let expiresAt = localStorage.getItem("expiresAt");
    let isAuth = new Date().getTime() < expiresAt;
    return isAuth;
  }
}
