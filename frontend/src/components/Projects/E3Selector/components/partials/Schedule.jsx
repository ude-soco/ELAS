/* Nassims way more elegant way of creating a timetable! */

import React from "react";
import { Paper } from "@material-ui/core";

import { muiStyles } from "../../res/muiStyles";
import "../../res/extraStyles.sass";

export default function Schedule(props) {
    const booked = props.booked
    const overBooked = props.overBooked
    const list = props.schedule.split(";")

    const classes = muiStyles();

    const times = ['8-10','10-12','12-14','14-16','16-18','18-20']
    const days = ['Mo','Di','Mi', 'Do', 'Fr', 'Sa', 'So']

	return (
			<table class="time-table">
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
                {//t for time,  c for the day

                times.map( t => {
                    return(
                    <tr>
                        <th>{t}</th>
                        {
                            days.map( d => {
                                if (overBooked) { //means we are in the selectedList
                                    return(
                                        <td>
                                            {/* Red: double-booked; orange: booked by this course; dark grey; booked by other course; light gray: unbooked */}
                                            <Paper className={list.includes(d+t) ? (overBooked.includes(d+t) ? classes.overlap : classes.true) : (booked.includes(d+t) ? classes.booked : classes.slot)}/>
                                        </td>
                                    )
                                } else {
                                    return(
                                        <td>
                                            <Paper className={booked.includes(d+t) ? (list.includes(d+t) ? classes.overlap : classes.booked) : (list.includes(d+t) ? classes.true : classes.slot)}/>
                                        </td>
                                    )
                                }
                            })
                        }
                    </tr>)
                })}
			</table>
	);
}
