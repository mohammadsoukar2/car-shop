import { objectify } from "../../utils/objectify";

export const generateInserteQuery=<T> (tableName :string,defaultObject:T,insertObject:Partial<T>,returnRow =true,deleteId=true)=>{
	const cleaned = cleanObject<T>( defaultObject, insertObject );
	if ( deleteId && 'id' in cleaned ) delete cleaned[ 'id' ];
	let paramCounter = 0;
	let text = `INSERT INTO ${ tableName } (${ Object.keys( cleaned ).map( field => `"${ field }"` ).join( ',' ) }) VALUES (`;
	const values: any[] = [];
	for ( const key in cleaned ) {
		text += `$${ ++paramCounter },`;
		values.push( cleaned[ key ] );
	}
	if ( paramCounter ) text = text.substr( 0, text.length - 1 );
	text += ') ';
	if ( returnRow )
		text += 'RETURNING * ';

	return { text, values, paramCounter };  

}

export const cleanObject =<T> (defaultObject:T,targetObject:Partial<T>)=>{
    const cleaned =objectify(targetObject);
    for(const key in targetObject)
        if(!(key in defaultObject))
            delete cleaned[key]; 
    return cleaned;        
}
