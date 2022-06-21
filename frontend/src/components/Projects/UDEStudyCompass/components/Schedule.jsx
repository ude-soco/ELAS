import React, { useEffect, useState } from "react";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Grid, Paper, Typography } from "@material-ui/core";

const schedulerData = [
  {
    id: 1,
    startDate: new Date("2022-06-21T09:45"),
    endDate: new Date("2022-06-21T11:00"),
    title: "Course 1",
    color: "green",
  },
  {
    id: 2,
    startDate: new Date("2022-06-21T09:45"),
    endDate: new Date("2022-06-21T12:00"),
    title: "Course 2",
    color: "green",
  },
  {
    id: 3,
    startDate: new Date("2022-06-21T08:45"),
    endDate: new Date("2022-06-21T09:45"),
    title: "Course 3",
    color: "green",
  },
];

const Schedule = () => {
  const [currentSchedule, setCurrentSchedule] = useState(undefined);

  useEffect(() => {
    const updateSchedule = isOverlapping(schedulerData);
    setCurrentSchedule(updateSchedule);
  }, [currentSchedule]);

  const Appointment = ({ children, style, ...restProps }) => {
    return (
      <Appointments.Appointment
        {...restProps}
        style={{
          ...style,
          backgroundColor: restProps.data.color,
          borderRadius: "6px",
        }}
        onClick={() => console.log(`You clicked on ${restProps.data.title}`)}
      >
        {children}
      </Appointments.Appointment>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Paper>
          <Scheduler data={currentSchedule}>
            <ViewState />
            <EditingState />
            <IntegratedEditing />
            <WeekView
              startDayHour={7.5}
              endDayHour={17.5}
              excludedDays={[0, 6]}
            />
            <Appointments appointmentComponent={Appointment} />
            <AppointmentTooltip showCloseButton showOpenButton />
            {/* <AppointmentForm readOnly /> */}
          </Scheduler>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper style={{ height: "50vh", padding: 16 }}>
          <Typography variant="h6" color="textSecondary">
            Conflicted schedule
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

const overlapping = (a, b) => {
  if (
    (a.startDate >= b.startDate && a.startDate < b.endDate) ||
    (a.endDate > b.startDate && a.endDate < b.endDate)
  ) {
    return true;
  }
};

const isOverlapping = (arr) => {
  let conflicts = [];
  arr.forEach((arr1) => {
    arr.forEach((arr2) => {
      if (arr1.id !== arr2.id) {
        if (overlapping(arr1, arr2)) {
          if (!conflicts.some((date) => (date.id === arr1.id ? true : false))) {
            conflicts.push({ id: arr1.id });
          }
        }
      }
    });
  });
  let newSchedule = arr;
  conflicts.forEach((conflict) => {
    let objIndex = newSchedule.findIndex((obj) => obj.id === conflict.id);
    newSchedule[objIndex].color = "red";
  });

  return newSchedule;
};

export default Schedule;
