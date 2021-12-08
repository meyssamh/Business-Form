import React from 'react';
import { TextField, Radio, Box } from '@material-ui/core';

import "./Input.css";

const Text: React.ForwardRefExoticComponent<
	TextProps &
	React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<TextRef, TextProps>((props, ref) => {
	const {
		type,
		radioName,
		radioValue,
		name,
		children,
		value,
		onChangeRadio,
		onChangeInput,
		onChecked,
		placeholder,
		error,
		required,
		helperText
	} = props;

	// a check for putting radio buttons before email and phone inputs
	const radio = type === "email" || type === "tel" ?
		<Radio
			name={radioName}
			value={radioValue}
			onChange={onChangeRadio}
			checked={onChecked === radioValue}
			color={"primary"}
		/> :
		null;

	return (
		<Box
			m={2.5}
			pr={2}
			display={"flex"}
			flexDirection={"row"}
			alignItems={"center"}
			justifyContent={"right"}
		>
			{radio}
			<TextField
				error={error}
				className={"input-field"}
				variant={"outlined"}
				name={name}
				type={type}
				label={children}
				placeholder={placeholder}
				onChange={onChangeInput}
				value={value}
				InputLabelProps={{
					shrink: true,
				}}
				required={required}
				size={"small"}
				helperText={helperText}
				ref={ref}
			/>
		</Box>
	);
});

export default Text;