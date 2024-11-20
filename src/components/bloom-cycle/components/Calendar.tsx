import React from "react";
import { Typography } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

interface CalendarProps {
  startDate: string;
  cycleLength: number;
}

const Calendar: React.FC<CalendarProps> = ({ startDate, cycleLength }) => {
  const start = new Date(startDate);

  // Explicitly type predictedDates as an array of strings
  const predictedDates: string[] = [];

  // Generate predicted dates for the next 6 cycles
  for (let i = 0; i < 6; i++) {
    const date = new Date(start.getTime() + i * cycleLength * 24 * 60 * 60 * 1000);
    predictedDates.push(date.toDateString());
  }

  const renderDay = (
    day: Date,
    _value: Date | null,
    DayComponentProps: PickersDayProps<Date>
  ) => {
    const formattedDate = day.toDateString();

    return (
      <PickersDay
        {...DayComponentProps}
        sx={{
          backgroundColor: predictedDates.includes(formattedDate)
            ? "rgba(255, 64, 129, 0.7)"
            : undefined,
          color: predictedDates.includes(formattedDate) ? "white" : undefined,
        }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Typography variant="h6" gutterBottom>
        Predicted Cycle Dates
      </Typography>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={start}
        onChange={() => {}} // Calendar is read-only
        slots={{
          day: (props) => renderDay(props.day, null, props),
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
