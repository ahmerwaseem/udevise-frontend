import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CheckBox.scss'

const propTypes = {

};

const defaultProps = {

};

class CheckBox extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className = "CheckBox"> 
        CheckBox 
      </div>
    )
  }

}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;