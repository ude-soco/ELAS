import React, { useMemo } from "react";
import CustomCheckbox from "./CustomCheckbox";
import { v4 as uuidv4 } from "uuid";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const Timetable = ({ reset, handleFilterSchedule }) => {
  const times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const days = ["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
  const daysText = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const rows = useMemo(() => createScheduleData(), []);

  return (
    <>
      <Typography color="textSecondary">Timetable</Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table padding="none" size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ borderBottom: "none" }}></TableCell>
              <TableCell
                align="center"
                style={{ borderBottom: "none", fontWeight: "bold" }}
              >
                Mo.
              </TableCell>
              <TableCell
                align="center"
                style={{ borderBottom: "none", fontWeight: "bold" }}
              >
                Di.
              </TableCell>
              <TableCell
                align="center"
                style={{ borderBottom: "none", fontWeight: "bold" }}
              >
                Mi.
              </TableCell>
              <TableCell
                align="center"
                style={{ borderBottom: "none", fontWeight: "bold" }}
              >
                Th.
              </TableCell>
              <TableCell
                align="center"
                style={{ borderBottom: "none", fontWeight: "bold" }}
              >
                Fr.
              </TableCell>
              <TableCell
                align="center"
                style={{ borderBottom: "none", fontWeight: "bold" }}
              >
                Sa.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    style={{ borderBottom: "none", fontWeight: "bold" }}
                  >
                    {row.time}
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <CustomCheckbox
                      reset={reset}
                      timeData={row.monday}
                      handleFilterSchedule={handleFilterSchedule}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <CustomCheckbox
                      reset={reset}
                      timeData={row.tuesday}
                      handleFilterSchedule={handleFilterSchedule}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <CustomCheckbox
                      reset={reset}
                      timeData={row.wednesday}
                      handleFilterSchedule={handleFilterSchedule}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <CustomCheckbox
                      reset={reset}
                      timeData={row.thursday}
                      handleFilterSchedule={handleFilterSchedule}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <CustomCheckbox
                      reset={reset}
                      timeData={row.friday}
                      handleFilterSchedule={handleFilterSchedule}
                    />
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <CustomCheckbox
                      reset={reset}
                      timeData={row.saturday}
                      handleFilterSchedule={handleFilterSchedule}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Timetable;

export const createScheduleData = () => {
  const times = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const days = ["Mo.", "Di.", "Mi.", "Do.", "Fr.", "Sa."];
  const daysText = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  let timetable = [];
  times.forEach((time) => {
    let splitTime = time.split(" - ");
    let object = {
      id: uuidv4(),
      time,
    };
    let day = {};
    days.forEach((d, index) => {
      day = {
        id: uuidv4(),
        day: d,
        time: {
          from: splitTime[0],
        },
      };
      switch (daysText[index]) {
        case "monday":
          object = { ...object, monday: day };
          break;
        case "tuesday":
          object = { ...object, tuesday: day };
          break;
        case "wednesday":
          object = { ...object, wednesday: day };
          break;
        case "thursday":
          object = { ...object, thursday: day };
          break;
        case "friday":
          object = { ...object, friday: day };
          break;
        case "saturday":
          object = { ...object, saturday: day };
          break;
      }
    });
    timetable.push(object);
  });
  return timetable;
};

// Output

const data = [
  {
    time: "08:00 - 10:00",
    monday: { day: "Mo.", time: { from: "08:00", to: "10:00" } },
    tuesday: { day: "Tu.", time: { from: "08:00", to: "10:00" } },
    wednesday: { day: "We.", time: { from: "08:00", to: "10:00" } },
    thursday: { day: "Th.", time: { from: "08:00", to: "10:00" } },
    friday: { day: "Fr.", time: { from: "08:00", to: "10:00" } },
    saturday: { day: "Sa.", time: { from: "08:00", to: "10:00" } },
  },
  {
    time: "10:00 - 12:00",
    monday: { day: "Mo.", time: { from: "10:00", to: "12:00" } },
    tuesday: { day: "Tu.", time: { from: "10:00", to: "12:00" } },
    wednesday: { day: "We.", time: { from: "10:00", to: "12:00" } },
    thursday: { day: "Th.", time: { from: "10:00", to: "12:00" } },
    friday: { day: "Fr.", time: { from: "10:00", to: "12:00" } },
    saturday: { day: "Sa.", time: { from: "10:00", to: "12:00" } },
  },
  {
    time: "12:00 - 14:00",
    monday: { day: "Mo.", time: { from: "12:00", to: "14:00" } },
    tuesday: { day: "Tu.", time: { from: "12:00", to: "14:00" } },
    wednesday: { day: "We.", time: { from: "12:00", to: "14:00" } },
    thursday: { day: "Th.", time: { from: "12:00", to: "14:00" } },
    friday: { day: "Fr.", time: { from: "12:00", to: "14:00" } },
    saturday: { day: "Sa.", time: { from: "12:00", to: "14:00" } },
  },
  {
    time: "14:00 - 16:00",
    monday: { day: "Mo.", time: { from: "14:00", to: "16:00" } },
    tuesday: { day: "Tu.", time: { from: "14:00", to: "16:00" } },
    wednesday: { day: "We.", time: { from: "14:00", to: "16:00" } },
    thursday: { day: "Th.", time: { from: "14:00", to: "16:00" } },
    friday: { day: "Fr.", time: { from: "14:00", to: "16:00" } },
    saturday: { day: "Sa.", time: { from: "14:00", to: "16:00" } },
  },
  {
    time: "16:00 - 18:00",
    monday: { day: "Mo.", time: { from: "16:00", to: "18:00" } },
    tuesday: { day: "Tu.", time: { from: "16:00", to: "18:00" } },
    wednesday: { day: "We.", time: { from: "16:00", to: "18:00" } },
    thursday: { day: "Th.", time: { from: "16:00", to: "18:00" } },
    friday: { day: "Fr.", time: { from: "16:00", to: "18:00" } },
    saturday: { day: "Sa.", time: { from: "16:00", to: "18:00" } },
  },
  {
    time: "18:00 - 20:00",
    monday: { day: "Mo.", time: { from: "18:00", to: "20:00" } },
    tuesday: { day: "Tu.", time: { from: "18:00", to: "20:00" } },
    wednesday: { day: "We.", time: { from: "18:00", to: "20:00" } },
    thursday: { day: "Th.", time: { from: "18:00", to: "20:00" } },
    friday: { day: "Fr.", time: { from: "18:00", to: "20:00" } },
    saturday: { day: "Sa.", time: { from: "18:00", to: "20:00" } },
  },
];
