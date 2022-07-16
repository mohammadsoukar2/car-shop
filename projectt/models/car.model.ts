import {objectify} from '../utils/objectify'

export  interface  Car {

    id?:string,
    color:string,
    doors:string,
    price:number,
    year:string,
    images?:string[],
    model_id?:string,
    agency_id?:string,

}

export const defaultCar : Car={
    id:'',
    color:'',
    doors:'',
    price:0,
    year:'',
    images:[],
    model_id:'',
    agency_id:'',
}

export const getDefaultCar = ()=>{
    return objectify(defaultCar);
}
