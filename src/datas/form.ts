type FieldType =
	| "text"
	| "email"
	| "number"
	| "password"
	| "textarea"
	| "date"
	| "checkbox"
	| "datetime-local";

export type Field = {
	name: string;
	label?: string;
	type: FieldType;
	required?: boolean;
};
