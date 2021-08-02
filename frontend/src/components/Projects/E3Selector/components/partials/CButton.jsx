/* Custom Button for convenience, wraps MUI Button */

import React from 'react';
import Button from '@material-ui/core/Button';

export default function CButton(props){
	return (
		<Button color={props.color} variant={props.variant} onClick={props.action} className={props.classes} style={{borderRadius: props.radius}}>{props.children}</Button>
	);
}

CButton.defaultProps = {
	action: null,
	color: "primary",
	variant: "contained",
	radius: "4px",
	classes: {},
}
