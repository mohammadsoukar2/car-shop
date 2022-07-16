import{objectify} from '../utils/objectify'

export interface Jwt {
    uid:string,
    name:string,
    email:string,
    type?:string,
    isAdmin:boolean,
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
    tokenLife:0,
    refreshToken:'',
    refreshTokenLife:0,
    token:'',
    actorType:''
}
export const getDefaultJwt =()=>{
    return objectify(defaultJwt);
}
