import React, { useEffect } from "react";
import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  DateNavigator,
  DayView,
  MonthView,
  Scheduler,
  TodayButton,
  Toolbar,
  ViewSwitcher,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Grid, Paper } from "@material-ui/core";

const Schedule = ({ handleResolvedConflict, currentSchedule }) => {
  useEffect(() => {}, [currentSchedule]);

  const Appointment = ({ children, style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: restProps.data.color,
          borderRadius: "6px",
        }}
        // onMouseEnter={() => console.log(restProps.data)}
        onClick={() => handleResolvedConflict(restProps.data.courseId)}
      >
        {children}
      </Appointments.Appointment>
    );
  };

  const currentDate = Boolean(currentSchedule.length !== 0) ? currentSchedule[0].startDate : new Date();

  return (
    <Grid container spacing={1}>
      {/*<Grid item xs={8}>*/}
      <Paper>
        <Scheduler data={currentSchedule}>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <WeekView startDayHour={8} endDayHour={20.5} excludedDays={[0, 6]} />
          <DayView startDayHour={8} endDayHour={20.5} />
          <MonthView />
          <ViewSwitcher />
          <Appointments appointmentComponent={Appointment} />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm readOnly />
        </Scheduler>
      </Paper>
      {/*</Grid>*/}
      {/*<Grid item xs={4}>*/}
      {/*  <Paper style={{ height: "50vh", padding: 16 }}>*/}
      {/*    <Typography variant="h6" color="textSecondary">*/}
      {/*      Conflicted schedule*/}
      {/*    </Typography>*/}
      {/*  </Paper>*/}
      {/*</Grid>*/}
    </Grid>
  );
};

export default Schedule;
