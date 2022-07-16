import { objectify } from "../utils/objectify";


export interface Agency {
  id?:string,
  name:string,
  email:string,
  facebook:string,
  location:string,
  user_id?:string
}

const DefaultAgency : Agency ={
    id:'',
    name:'',
    email:'',
    facebook:'',
    location:'',
    user_id:'',
}

export const getDefaultAgency =(): Agency=>{
    return objectify(DefaultAgency);
}
