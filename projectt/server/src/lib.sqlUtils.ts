import { objectify } from "../../utils/objectify";

export const generateInserteQuery = <T>(tableName: string, defaultObject: T, insertObject: Partial<T>, returnRow = true, deleteId = true) => {
	const cleaned = cleanObject<T>(defaultObject, insertObject);
	if (deleteId && 'id' in cleaned) delete cleaned['id'];
	let paramCounter = 0;
	let text = `INSERT INTO ${tableName} (${Object.keys(cleaned).map(field => `"${field}"`).join(',')}) VALUES (`;
	const values: any[] = [];
	for (const key in cleaned) {
		text += `$${++paramCounter},`;
		values.push(cleaned[key]);
	}
	if (paramCounter) text = text.substr(0, text.length - 1);
	text += ') ';
	if (returnRow)
		text += 'RETURNING * ';

	return { text, values, paramCounter };

}

export const generateUpdateQuery = <T>(tableName: string, defaultObject: T, updateObj: Partial<T>, deleteId = true, images = false) => {

	const cleaned = cleanObject<T>(defaultObject, updateObj);
	if (deleteId && 'id' in cleaned) delete cleaned['id'];
	if (!images) {
		if ('images' in cleaned)
			delete cleaned['images'];
		if ('photo' in cleaned)
			delete cleaned['photo'];
	};

	let paramCounter = 0;
	let text = `UPDATE ${tableName} SET`;
	const values: any[] = [];
	for (const key in cleaned) {
		text += ` "${key}" = $${++paramCounter},`;
		values.push(cleaned[key]);
	}
	if (paramCounter) text = text.substr(0, text.length - 1);
	text += ' ';
	return { text, values, paramCounter };

}

export const generateDeleteQuery = <T>(tableName: string, criterias: any) => {
	let paramCounter = 0;
	let text = `DELETE FROM ${tableName} WHERE`;
	const values: any[] = [];
	for (const key in criterias) {
		text += ` "${key}" = $${++paramCounter} AND`;
		values.push(criterias[key]);
	}
	if (paramCounter) text = text.substr(0, text.length - 3);
	text += '; ';

	return { text, values };
}

export const generateDeleteQueryForAgency = <T>(tableName: string, criterias: any) => {
	let paramCounter = 0;
	let text = `DELETE FROM public."agency" as a join public."user" as u on a.user_id=u.id join public."car" as c on a.id=c.agency_id WHERE`;
	const values: any[] = [];
	for (const key in criterias) {
		text += ` "${key}" = $${++paramCounter} AND`;
		values.push(criterias[key]);
	}
	if (paramCounter) text = text.substr(0, text.length - 3);
	text += '; ';

	return { text, values };
}

export const cleanObject = <T>(defaultObject: T, targetObject: Partial<T>) => {
	const cleaned = objectify(targetObject);
	for (const key in targetObject)
		if (!(key in defaultObject))
			delete cleaned[key];
	return cleaned;
}
