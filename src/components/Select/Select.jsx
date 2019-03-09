import  React, { Component } from 'react';
import { Input } from 'reactstrap';
import './Select.scss'

const Select = props => {
  const {
    input,
    label,
    meta: { touched, error },
    selectValues 
  } = props;

  return(
    <div className="Select">
      <label> {label} </label>
      <div>
        <Input {...input} type="select">
        {selectValues.map((values, index)=>{
          return(
          <option key={index} value={values.option}>{values.value}</option>
          )
        })}

        </Input>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
}

export default Select;