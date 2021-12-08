import React, { Ref } from 'react';
import { Typography, Box } from '@material-ui/core';

import Input from '../Input/Input';

const Email: React.ForwardRefExoticComponent<
	EmailProps &
	React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<EmailRef, EmailProps>((props, ref) => {
	const {
		type,
		radioName,
		radioValue,
		name,
		children,
		businessEmail,
		privateEmail,
		onChangeRadio,
		onChangeInput,
		onCheckedRadio,
		error,
		helperText
	} = props;

	const placeholder = "example@example.com";

	// iterates through the values and makes email input elements
	const inputEmail = radioValue.map((element: string, index: number) => {

		const requiredEmail = onCheckedRadio === children[index] ? true : false;
		const emailValue = [businessEmail, privateEmail];

		return <Input
			type={type}
			radioName={radioName}
			radioValue={element}
			name={name[index]}
			children={element}
			value={emailValue[index]}
			onChangeRadio={onChangeRadio}
			onChangeInput={onChangeInput}
			onChecked={onCheckedRadio}
			placeholder={placeholder}
			error={error[index]}
			required={requiredEmail}
			key={index}
			helperText={helperText[index]}
		/>
	});

	return (
		<div>
			<Box m={2}>
				<Typography variant={"body1"} ref={ref}>
					Email <sup>1</sup>:
				</Typography>
			</Box>
			{inputEmail}
			<Box my={0.6} pl={2}>
				<Typography variant={"body2"}>
					1: Please select your primary Email.
				</Typography>
			</Box>
		</div>
	);
});

export default Email;