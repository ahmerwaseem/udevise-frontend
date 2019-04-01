import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss'
import { FormControl, RadioGroup } from '@material-ui/core';

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
    selectValues
  } = props;



  return(
    <div className="radio">
      <div>
        <label>{label}</label>
        
        {selectValues.map((values, index)=>{
          return(
            <label><input {...input}  type="radio" value={values.option ? values.option : values} />{values.value ? values.value : values}</label>
          )
        })}
          {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
}

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;