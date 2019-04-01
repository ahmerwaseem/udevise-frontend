import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss'
import { FormControl, RadioGroup } from '@material-ui/core';
import uuid from 'uuid';

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
    selectValues,
    itemName,
    name
  } = props;



  return(
    <div className="radio">
        <div>
        <input
          {...input}
          type="radio"/>
        <label>{props.children}</label>
      </div>
    </div>
  )
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;