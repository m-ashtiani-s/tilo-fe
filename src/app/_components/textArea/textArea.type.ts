export type InputProps = {
	placeholder?:string;
	className?:string;
	name?:string;
	onChange?:(event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value:string | undefined;
	setValue:React.Dispatch<React.SetStateAction<any>>;
	groupValue?:boolean;
};
