/* Filters are often Grouped, like in
 * the filter dropdown and the Catalog-bar.
 * Here they are simply being bundled together.
 */

import React from 'react';
import { Grid, FormLabel } from '@material-ui/core';

import CheckBox from "./CheckBox";

const FilterGroup = (props) => {
	const filterArray = props.filters.map(f => (
		<Grid item>
			<CheckBox label={f.label} labelClasses={{label: f.classes}} action={props.action} arguments={f.arguments} checked={f.checked}/>
		</Grid>
	));
	return (
		<Grid item>
			<Grid container	direction="column" justify="space-evenly" alignItems="flex-start">
				<FormLabel component="legend">{props.groupLabel}</FormLabel>
				{ filterArray }
			</Grid>
		</Grid>
	);
}

const VerticalFilterGroup = (props) => {
	const applyFilter = (action, params) => {
		params.forEach(p => {
			action(p[0], p[1]);
		});
	};

	// custom color indicator for which catalog is selected
	const toggleClass = (e) => {
		let others = document.getElementsByClassName('vertical-checked');
		Array.from(others).forEach(elem => elem.classList.remove("vertical-checked"));
		e.target.classList.toggle("vertical-checked");
	}
	const filterArray = props.filters.map(f => (
		<Grid item>
			<div class="vertical-filter" onClick={(e) => {toggleClass(e); applyFilter(props.action, f.arguments)}}>{f.label}</div>
		</Grid>
	));
	return (
		<Grid item>
			<Grid container	direction="row" justify="center" alignItems="flex-end">
				<div class="vertical-filter vertical-checked" onClick={(e) => {toggleClass(e); props.action("catalog", "all")}}>all</div>
				{ filterArray }
			</Grid>
		</Grid>
	);
}

FilterGroup.defaultProps = {
	classes: {}
}

export { FilterGroup };
export { VerticalFilterGroup };
