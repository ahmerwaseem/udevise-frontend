import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss'
import { FormControl, RadioGroup, Radio, FormControlLabel, FormLabel, FormGroup } from '@material-ui/core';
import uuid from 'uuid';
import { Input } from 'reactstrap'
import { Field } from 'redux-form'
import { required } from '../../utils/validators'

const propTypes = {

};

const defaultProps = {

};

const customRadio = (props) =>{
  const {
    input,
    label,
    type,
    meta: { touched, error } ,
    itemName,
    converttoarray,
    name,
    customDispatch
  } = props;

  console.log(props);

  return(
    <div className="radio">
          <FormControlLabel
            value="top"
            control={<Radio        
              {...input}
              checked={input.checked}
              type="radio"
              onChange={()=>{input.onChange(input.value); customDispatch(input.value.split())}}
              />}
            label={props.children}
            labelPlacement="end"
          />
        </div>
  )
}


const RadioButton = props => {
  const {
    input,
    label,
    type,
    meta,
    itemName,
    name,
    converttoarray,
    selectvalues,
    ...custom
  } = props;

  console.log(props);

  // if (typeof input.value == "string" && converttoarray && input.){
  //   input.onChange(input.value.split())
  // }

  let $options = selectvalues.map((values, i) => {
        return(
          <Field validate={required} component={customRadio} converttoarray={converttoarray} type="radio"{...custom} name={name} value={values.option ? values.option : values}>{values.value ? values.value : values}</Field>
        )
  });
  return (
    <FormControl >
    <FormGroup>
    <FormLabel component="legend">{label}</FormLabel>
      {$options}
    </FormGroup>
    </FormControl>
  );
};

RadioButton.propTypes = propTypes;
RadioButton.defaultProps = defaultProps;

export default RadioButton;