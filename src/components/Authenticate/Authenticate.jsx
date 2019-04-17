import  React, { Component } from 'react';
import './Authenticate.scss'
import Auth from '../../Auth/Auth';
import Spinner from '../Spinner/Spinner';

const requireAuth = (ComposedComponent, customProps) => {
  const auth = new Auth();
  return class Authenticate extends Component{

  componentWillMount() {
    if (!auth.isAuthenticated()){
      localStorage.setItem("preAuthPage",this.props.match.url)
      auth.login();
    }
  }
  
    render(){
      return (
          auth.isAuthenticated() ? <ComposedComponent {...this.props} {...customProps} /> : <Spinner/>
      )
    }
  }
}
export default requireAuth;