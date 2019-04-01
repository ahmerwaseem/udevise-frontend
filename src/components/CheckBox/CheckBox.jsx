import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CheckBox.scss'

const propTypes = {

};

const defaultProps = {

};

const CheckBox = (props) => {

  const {
    input,
    label,
    meta: { touched, error },
    selectValues 
  } = props;

  return(
    <div className="CheckBox">
      <div>
        <label>{label}</label>
        {selectValues.map((values, index)=>{
          return(
            <label><input {...input} type="checkbox" value={values.option ? values.option : values} />{values.value ? values.value : values}</label>
          )
        })}
          {touched && error && <span>{error}</span>}
      </div>
    </div>
  )

}

CheckBox.propTypes = propTypes;
CheckBox.defaultProps = defaultProps;

export default CheckBox;