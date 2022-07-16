import { objectify } from "../utils/objectify";


export interface Modeul{
    id?:string,
    make:string,
    model_name:string,
    type:string,
    fuel:string,
    transmission:string,
}

export const defaultModeul : Modeul={
    id:'',
    make:'',
    model_name:'',
    type:'',
    fuel:'',
    transmission:'',
}
export const getDefaultModeul =()=>{
    return objectify(defaultModeul);
}
//هاي ، انا ما ضل عندي تغطية 
// اي ع راسي 
