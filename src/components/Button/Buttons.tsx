import React from 'react';
import { Button } from '@material-ui/core';

const Buttons: React.FC<ButtonProps> = props => {
	const {
		variant,
		children,
		onButtonClick,
		color,
	} = props;

	return (
		<Button
			variant={variant}
			color={color}
			onClick={onButtonClick}
		>
			{children}
		</Button>
	);
};

export default Buttons;