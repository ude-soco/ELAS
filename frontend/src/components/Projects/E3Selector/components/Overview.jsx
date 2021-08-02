/* Straightforward component:
 * DataHandler does the heavy lifting,
 * here we just display the results.
 */

import React from "react";
import { Grid } from "@material-ui/core";

import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import "../res/extraStyles.sass";

export default function Overview(props) {
    const data = props.data;

    const creditNotification = () => {
        switch(data.creditsStatus){
            case "on-ok": return(<div class="overview-notification on-ok"><CheckCircleIcon /> Credit target matched</div>)
            case "on-warn" : return(<div class="overview-notification on-warn"><ErrorIcon /> Credit target exceeded</div>)
            default: return(<div class="overview-notification"><ErrorIcon /> Credit target not matched</div>)
        }
    }

    const conflictNotification = () => {
        switch(data.conflicts){
            case true: return(<div class="overview-notification on-warn"><ErrorIcon /> Possible schedule overlappings</div>)
            default: return(<div class="overview-notification on-ok"><CheckCircleIcon /> No schedule overlappings</div>)
        }
    }

    const smallCourseNotification = () => {
        switch(data.smallCourses){
            case true: return(<Grid item xs={12}><div class="overview-notification"><ErrorIcon /> Course with few available seats selected</div></Grid>)
            default: return
        }
    }

    if (props.selectedList.length) { // only display information when there are selected courses
      return (
          <Grid container spacing={1} direction="row" alignItems="stretch" justify="space-between" id="overview">
            <Grid item xs={12} sm={8}>
              <h1 class={data.creditsStatus} id="overview-credit-count">{data.selectedCredits}</h1>
            </Grid>

            <Grid item xs={12} sm={4}>
              <h1 id="overview-workload-count">{data.workload}</h1>
            </Grid>

            {smallCourseNotification()}
            <Grid item xs={12}>
              {creditNotification()}
            </Grid>
            <Grid item xs={12}>
              {conflictNotification()}
            </Grid>
          </Grid>
      );
    } else {
      return <p>add courses to start receiving information</p>
    }
}
