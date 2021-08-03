/* Wrapper for MUI CheckBoxes. Can return three types of CB:
 * - normal CheckBox
 * - CheckBox wrapped in a FormControlLable
 * - custom-styled CheckBox for the TimeTable-filters
 */

import React, { useState } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function CheckBox(props) {
	// some CBs have to toggle multiple filters (legacy-scraper-reasons)
	const actionIterator = (action, params) => {
		params.forEach(p => {
			action(p[0], p[1]);
		});
	};

	const [isActive, toggle] = useState(props.checked)

	if (props.timeTable) {
		return (<div class={props.cssClasses + " checked-" + isActive} onClick={() => {toggle(!isActive); actionIterator(props.action, props.arguments)}}>&nbsp;</div>);
	} else if (props.label.length >= 1) {
		return (
			<FormControlLabel
	            control={
					<Checkbox defaultChecked={props.checked} color={props.color} classes={props.classes} onClick={() => {actionIterator(props.action, props.arguments)}}/>
				}
	            label={props.label}
	            labelPlacement={props.labelPosition}
				classes={props.labelClasses}
	        />
		);
	} else {
		return (
			<Checkbox defaultChecked={props.checked} color={props.color} classes={props.classes} onClick={() => {actionIterator(props.action, props.arguments)}}/>
		);
	}
}

CheckBox.defaultProps = {
	action: null,
	arguments: [],
	checked: true,
	color: "primary",
	classes: {},
	timeTable: false,
	cssClasses: "timeTableCheckbox",
	label: "",
	labelPosition: "end",
	labelClasses: {}
}
