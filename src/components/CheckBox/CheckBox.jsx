import  React from 'react';
import './CheckBox.scss'
import Checkbox from '@material-ui/core/Checkbox';
import { FormGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';


const CheckBox = ({ name, label, selectvalues, input, meta, ...custom}) => {
  console.log(selectvalues);
  let $options = selectvalues.map((values, i) => (
    <div key={i}>
    <FormControlLabel
      control={
      <Checkbox
        name={`${name}[${i}]`}
        defaultChecked={input.value.indexOf(values.option ? values.option : values) !== -1}
        onChange={(e, checked) => {
          let newValue = [...input.value];
          if (checked){
            newValue.push(values.option ? values.option : values);
          } else {
            newValue.splice(newValue.indexOf(values.option ? values.option : values), 1);
          }
          return input.onChange(newValue.sort());
        }}
        {...custom}
      /> 
      }
      label = {values.value ? values.value : values}
      />
    </div>
  ));
  return (
    <FormControl error={meta.touched && meta.error != undefined} >
    <FormGroup>
    <FormLabel component="legend">{label}</FormLabel>
      {$options}
      {meta.touched && meta.error && 
        <div>
          {meta.error}
        </div>
      }
    </FormGroup>
    </FormControl>
  );
};

export default CheckBox;