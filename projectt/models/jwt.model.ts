import{objectify} from '../utils/objectify'

export interface Jwt {
    uid:string,
    name:string,
    email:string,
    type?:string,
    isAdmin:boolean,
    hasStore:boolean,
    hasAgency:boolean,
    store_id:string,
    agency_id:string,
    tokenLife?:number,
    refreshToken?:string,
    refreshTokenLife?:number,
    token?:string,
    actorType?:string,
}
export const defaultJwt: Jwt={
    uid:'',
    name:'',
    email:'',
    type:'',
    isAdmin:false,
    hasStore:false,
    hasAgency:false,
    store_id:'',
    agency_id:'',
    tokenLife:0,
    refreshToken:'',
    refreshTokenLife:0,
    token:'',
    actorType:''
}
export const getDefaultJwt =()=>{
    return objectify(defaultJwt);
}
