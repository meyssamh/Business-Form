import React from 'react';
import { Typography, Box } from '@material-ui/core';

import Input from '../Input/Input';

const Phone: React.ForwardRefExoticComponent<
	PhoneProps &
	React.RefAttributes<HTMLParagraphElement>
> = React.forwardRef<PhoneRef, PhoneProps>((props, ref) => {
	const {
		type,
		radioName,
		radioValue,
		name,
		children,
		primaryPhone,
		mobilePhone,
		businessPhone,
		privatePhone,
		onChangeRadio,
		onChangeInput,
		onCheckedRadio,
		error,
		helperText
	} = props;

	const placeholder = "00123456789";

	// iterates through the values and makes phone input elements
	const inputPhone = radioValue.map((element: string, index: number) => {

		const requiredPhone = onCheckedRadio === children[index] ? true : false;
		const phoneValue = [primaryPhone, mobilePhone, businessPhone, privatePhone];

		return <Input
			type={type}
			radioName={radioName}
			radioValue={element}
			name={name[index]}
			children={element}
			value={phoneValue[index]}
			onChangeRadio={onChangeRadio}
			onChangeInput={onChangeInput}
			onChecked={onCheckedRadio}
			placeholder={placeholder}
			error={error[index]}
			required={requiredPhone}
			key={index}
			helperText={helperText[index]}
		/>
	});

	return (
		<div>
			<Box p={2}>
				<Typography variant={"body1"} ref={ref}>
					Phone <sup>2</sup>:
				</Typography>
			</Box>
			{inputPhone}
			<Box my={0.6} pl={2}>
				<Typography variant={"body2"}>
					2: Please select your primary Phone.
				</Typography>
			</Box>
		</div>
	);
});

export default Phone;