import React from 'react';
import { Box, MenuItem, TextField } from '@material-ui/core';

import './Country.css';

const Country: React.FC<CountryProps> = props => {
	// iterates through props.data fields and makes option elements
	const items = Object.keys(props.data).map((value: string) => {
		return <MenuItem value={value} key={value}>{props.data[value]}</MenuItem>
	});

	return (
		<Box
			m={2.5}
			pr={2}
			display={"flex"}
			flexDirection={"row"}
			alignItems={"center"}
			justifyContent={"right"}
		>
			<TextField
				variant={"outlined"}
				className={"country-field"}
				select
				label={"Country"}
				value={props.selectedCountry}
				onChange={props.onChangeSelect}
				size={"small"}
				required={props.required}
			>
				{items}
			</TextField>
		</Box>
	);
};

export default Country;