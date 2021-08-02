/* TimeTable Filter Selection
 * Is it bad code? Yes.
 * Will the number of days in a week or the number of hours in a day change?
 * Probably not while this project is in use.
 */

import React from 'react';
import { Grid } from '@material-ui/core';

import CheckBox from "./CheckBox";
import "../../res/extraStyles.sass";

export default function TimeTable(props) {
	return (
		<Grid item>
			<table class="time-table time-table-selectable">
				<tr>
					<th></th>
					<td>Mon</td>
					<td>Tue</td>
					<td>Wed</td>
					<td>Thu</td>
					<td>Fri</td>
					<td>Sat</td>
					<td>Sun</td>
				</tr>
				<tr>
					<th>8 - 10</th>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mo8-10"]]} checked={props.filterState.time["Mo8-10"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Di8-10"]]} checked={props.filterState.time["Di8-10"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mi8-10"]]} checked={props.filterState.time["Mi8-10"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Do8-10"]]} checked={props.filterState.time["Do8-10"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Fr8-10"]]} checked={props.filterState.time["Fr8-10"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Sa8-10"]]} checked={props.filterState.time["Sa8-10"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "So8-10"]]} checked={props.filterState.time["So8-10"]}/></td>
				</tr>
				<tr>
					<th>10 - 12</th>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mo10-12"]]} checked={props.filterState.time["Mo10-12"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Di10-12"]]} checked={props.filterState.time["Di10-12"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mi10-12"]]} checked={props.filterState.time["Mi10-12"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Do10-12"]]} checked={props.filterState.time["Do10-12"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Fr10-12"]]} checked={props.filterState.time["Fr10-12"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Sa10-12"]]} checked={props.filterState.time["Sa10-12"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "So10-12"]]} checked={props.filterState.time["So10-12"]}/></td>
				</tr>
				<tr>
					<th>12 - 14</th>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mo12-14"]]} checked={props.filterState.time["Mo12-14"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Di12-14"]]} checked={props.filterState.time["Di12-14"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mi12-14"]]} checked={props.filterState.time["Mi12-14"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Do12-14"]]} checked={props.filterState.time["Do12-14"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Fr12-14"]]} checked={props.filterState.time["Fr12-14"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Sa12-14"]]} checked={props.filterState.time["Sa12-14"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "So12-14"]]} checked={props.filterState.time["So12-14"]}/></td>
				</tr>
				<tr>
					<th>14 - 16</th>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mo14-16"]]} checked={props.filterState.time["Mo14-16"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Di14-16"]]} checked={props.filterState.time["Di14-16"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mi14-16"]]} checked={props.filterState.time["Mi14-16"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Do14-16"]]} checked={props.filterState.time["Do14-16"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Fr14-16"]]} checked={props.filterState.time["Fr14-16"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Sa14-16"]]} checked={props.filterState.time["Sa14-16"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "So14-16"]]} checked={props.filterState.time["So14-16"]}/></td>
				</tr>
				<tr>
					<th>16 - 18</th>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mo16-18"]]} checked={props.filterState.time["Mo16-18"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Di16-18"]]} checked={props.filterState.time["Di16-18"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mi16-18"]]} checked={props.filterState.time["Mi16-18"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Do16-18"]]} checked={props.filterState.time["Do16-18"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Fr16-18"]]} checked={props.filterState.time["Fr16-18"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Sa16-18"]]} checked={props.filterState.time["Sa16-18"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "So16-18"]]} checked={props.filterState.time["So16-18"]}/></td>
				</tr>
				<tr>
					<th>18 - 20</th>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mo18-20"]]} checked={props.filterState.time["Mo18-20"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Di18-20"]]} checked={props.filterState.time["Di18-20"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Mi18-20"]]} checked={props.filterState.time["Mi18-20"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Do18-20"]]} checked={props.filterState.time["Do18-20"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Fr18-20"]]} checked={props.filterState.time["Fr18-20"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "Sa18-20"]]} checked={props.filterState.time["Sa18-20"]}/></td>
					<td><CheckBox timeTable={true} action={props.action} arguments={[["time", "So18-20"]]} checked={props.filterState.time["So18-20"]}/></td>
				</tr>
			</table>
		</Grid>
	);
}
