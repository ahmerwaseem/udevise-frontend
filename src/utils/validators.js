export const required = (value) => {
  if (value){
    if (typeof value == "string" && value.trim().length != 0){
      return undefined;
    }
    if (typeof value == "object"){
      if (value.length > 0){
        return undefined;
      }
    }
  }

  return 'This is a required field';
}
