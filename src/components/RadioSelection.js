import React from 'react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core';

const RadioSelection = ({ name, formLabel, radioItem, className, style, ...otherProps }) => {
	return (
		<FormControl className={`form-control radio-component ${formLabel ? 'form-label' : ''}`} style={style}>
			{formLabel && <FormLabel>{formLabel}</FormLabel>}
			<RadioGroup
				{...otherProps}
				name={name}
				className={`${className} form-elements`}
			>
				{radioItem && radioItem.map((item, index) =>
					<FormControlLabel
						key={index}
						disabled={item.disabled}
						value={item.value}
						control={<Radio color="default" />}
						label={item.label} />
				)}
			</RadioGroup>
		</FormControl>
	);
}

export default RadioSelection;