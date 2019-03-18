import React from 'react';

import { IconButton, SvgIcon, SnackbarContent as MuiSnackbarContent } from '@material-ui/core';

import './style.css';

export const SnackbarContent = (props) =>
	<MuiSnackbarContent className={props.className}
		message={props.message}
		action={props.action}
		{...props}>
	</MuiSnackbarContent>

export const SnackbarContentDangerResponse = (props) =>
	<MuiSnackbarContent className='snackbar-content danger-response'
		message={props.message}
		action={<IconButton className='close-button' onClick={props.onClick}>
			<SvgIcon fontSize='small'>
				<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
			</SvgIcon>
		</IconButton>}>
	</MuiSnackbarContent>

export const SnackbarContentSuccessResponse = (props) =>
	<MuiSnackbarContent className='snackbar-content success-response'
		message={props.message}
		action={<IconButton className='close-button' onClick={props.onClick}>
			<SvgIcon fontSize='small'>
				<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
			</SvgIcon>
		</IconButton>}>
	</MuiSnackbarContent>

//  TODO: Will have to build as we require: Info, Warning...