"use client";

import { useRef, useState } from "react";
import { IconMultiplication } from "../icon/icons";
import { InputProps } from "./input.type";

export default function Input({ placeholder, className='', name='', onChange=undefined, value, setValue, groupValue = false }: InputProps) {
	const [focused, setFocused] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleSpanClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
			setFocused(true);
		}
	};
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		groupValue
			? setValue((prev: any) => ({...prev,[name]:e.target.value}))
			: setValue(e.target.value);
		!!onChange && onChange(e);
	};

	const FocusHandler = () => {
		setFocused(true);
	};
	const BlureHandler = () => {
		!value && setFocused(false);
	};
	const handleClear = () => {
		setFocused(false);
		groupValue
			? setValue((prev: any) => {
					{
						const { [name]: omitted, ...rest } = prev;
						return rest;
					}
			  })
			: setValue("");
	};
	return (
		<div className="relative">
			<input
				name={!!name ? name : ''}
				ref={inputRef}
				onChange={changeHandler}
				value={!!value ? value : ''}
				onFocus={FocusHandler}
				onBlur={BlureHandler}
				className={`${className} border border-1 border-gray-300 rounded-md py-3 px-6 duration-200 focus:outline-1 outline-primary/0 focus:outline-primary z-20 text-black/80`}
			/>
			{!!placeholder && <span
				onClick={handleSpanClick}
				className={`whitespace-nowrap absolute duration-200 z-10 bg-white px-2  ${focused ? "right-3 -top-2 text-xs " : "right-3 top-3"}`}
			>
				{placeholder}
			</span>}
			<span
				onClick={handleClear}
				className={`whitespace-nowrap absolute duration-200 z-10 bg-white px-2 left-3 top-4 cu  ${focused ? "block" : "hidden"}`}
			>
				<IconMultiplication fill="#00000080" stroke="none" />
			</span>
		</div>
	);
}
