import React from 'react';
import { FormControl, TextField as TextFieldMUI, FormLabel } from '@material-ui/core';

const TextField = ({ name, formLabel, className, style, required, type, ...otherProps }) => {
	return <FormControl required={required ? true : false} className={`form-control`} style={style}>
		<FormLabel>{formLabel}</FormLabel>
		<TextFieldMUI {...otherProps} name={name} className={`${className} form-elements`} type={type} />
	</FormControl>;
}

export default TextField;