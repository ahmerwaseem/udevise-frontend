export const required = (value) => {
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

  return 'This is a required field';
}

export const positiveNumber = (value) => {
  if (typeof value == "number" && value >= 0){
    return undefined
  }
  return 'Must be a number greater than zero';
}
 
export const validString = (x) => {
  if (x==undefined || x==null ){
    return true;
  }
  if (typeof x == "string"){
    return x.trim().length == 0  
  }
}