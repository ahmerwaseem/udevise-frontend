import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Authenticate.scss'
import Auth from '../../Auth/Auth';
import Callback from '../../Callback/Callback';

const requireAuth = (ComposedComponent) => {
  const auth = new Auth();
  return class Authenticate extends Component{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    if (!auth.isAuthenticated()){
     auth.login();
    }
  }

    render(){
      return (
        <div>
          {auth.isAuthenticated() ? <ComposedComponent {...this.props} /> : <Callback/> }
        </div>
      )
    }
  }
}
export default requireAuth;