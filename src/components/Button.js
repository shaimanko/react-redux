import React from 'react';
import { Button as MuiButton } from '@material-ui/core';

const Button = ({ className, color = 'primary', disabled, children, ...otherProps }) => {
	return (
		<MuiButton
			variant='contained'
			color={color} {...otherProps} className={`component-buttons ${color} ${className}`}
			disabled={disabled}>
			{children}
		</MuiButton>
	);
}

export default Button;