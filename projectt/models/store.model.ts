import { objectify } from "../utils/objectify";


export interface Store {
  id?:string,
  name:string,
  email:string,
  facebook:string,
  location:string,
  user_id?:string
}

const defaultStore : Store ={
    id:'',
    name:'',
    email:'',
    facebook:'',
    location:'',
    user_id:''
}

export const getDefaultStore =(): Store=>{
    return objectify(defaultStore);
}
