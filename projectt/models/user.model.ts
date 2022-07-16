import {objectify}  from '../utils/objectify';

export interface User 
{
  id:string,
  fname:string,
  lname:string,
  user_name:string,
  address:string,
  email:string,
  phone_number:string,
  password:string,
  isAdmin:boolean,
  sec_question:string,
  photo:string,
}

const defaultUser : Required<User>={
    id:'',
    fname:'',
    lname:'',
    user_name:'',
    address:'',
    email:'',
    phone_number:'',
    password:'',
    isAdmin: false,
    sec_question:'',
    photo:'',
 }
 export const getDefaultUser =()=>{
     return objectify(defaultUser);
 }
 export interface FileMetaData {
   name:string,
 }
 export interface  BaseUserFileData extends FileMetaData {
   file:Blob,
   apiTempPath?:string
 } 
 export interface UserFile extends BaseUserFileData{
   user?:User
 }