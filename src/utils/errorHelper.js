export const getErrorMessage = (e)=>{
  let error = "An error has occurred. Please try again later";
  if (e.response && e.response.data && e.response.data.message){
  error = e.response.data.message;
  }
  console.log(e);
  return error;
}