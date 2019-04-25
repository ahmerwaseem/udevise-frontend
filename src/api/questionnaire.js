import Axios from "axios";
import { config } from "../utils/userUtils";

export const getReport = (id, token, ext, cb) => {
  Axios.get(`/api/v1/response/${id}/report`, config(token)).then(result =>{
    cb(result.data,id,ext)
    return result.data;
  }).catch(e=> console.log(e))
}