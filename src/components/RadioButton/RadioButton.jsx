import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss'
import { FormControl, RadioGroup, Radio } from '@material-ui/core';
import uuid from 'uuid';
import { Input } from 'reactstrap'

const propTypes = {

};

const defaultProps = {

};

const RadioButton = props => {

  const {
    input,
    label,
    type,
    meta: { touched, error } ,
    itemName,
    name
  } = props;



  return(
    <div className="radio">
        <Radio
          {...input}
          type="radio"/>
        <label>{props.children}</label>
    </div>
  )
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;