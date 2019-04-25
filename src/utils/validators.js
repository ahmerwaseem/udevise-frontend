export const required = (value) => {
  debugger;
  console.log(value);
  console.log(value + " " + typeof value)
  if (value){
    if (typeof value == "string" && value.trim().length != 0){
      return undefined;
    }
    if (typeof value == "object"){
      if (value.length > 0 && value.filter(validString).length == 0){
        return undefined;
      }
    }
  }

  return 'This is a required field - bro';
}

export const positiveNumber = (value) => {
  debugger;

  console.log(value + " " + typeof value)
  if (typeof value == "number" && value >= 0){
    return undefined
  }
  return 'Must be a number greater than zero - yo';
}
 
export const validString = (x) => {
  if (x==undefined || x==null ){
    return true;
  }
  if (typeof x == "string"){
    return x.trim().length == 0  
  }
}