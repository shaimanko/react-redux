import React from 'react';
import Flag from 'react-world-flags'
import { FormControl, FormLabel, MenuItem, Select as MUISelect, Icon } from '@material-ui/core';

import './style.css';

const Select = ({ name, value, formLabel, onChange, items, className, style, required, ...otherProps }) => {
	return (
		<FormControl
			required={required ? true : false}
			className={`select-section`}
			style={style}>
			{formLabel !== undefined &&
				<FormLabel>{formLabel}</FormLabel>
			}
			<MUISelect
				displayEmpty
				{...otherProps}
				className={`${className} form-elements`}
				name={name}
				value={value}
				onChange={onChange}>
				<MenuItem value="">
					<em>Please Select</em>
				</MenuItem>
				{items.length > 0 && items.map((item, i) => {
					return (
						<MenuItem
							key={`select-${formLabel}-${i}`}
							value={item.value}>
							{item.countryCode && <Icon><Flag code={item.countryCode} /></Icon>}
							{item.label}
						</MenuItem>
					);
				})}
			</MUISelect>
		</FormControl>
	);
}

export default Select;