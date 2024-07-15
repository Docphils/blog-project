import "./styles.css";
import { Box } from "@mui/material";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import React, {useRef, useState } from "react";
import DateTimePicker from "react-datetime-picker";

export default React.forwardRef(function CustomDatepicker(
    { className = "", ...props },
    ref
) {
    const dateref = ref ? ref : useRef();
    const [value, onChange] = useState(new Date().toISOString().slice(0, 16));
    return (
        <DateTimePicker
            className={
                "rounded-sm bg-white-8 h-12 max-md:w-full border-none " +
                className
            }
            ref={dateref}
            onChange={onChange}
            value={value}
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            maxDetail="second"
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            secondAriaLabel="Second"
            yearAriaLabel="Year"
            {...props}
        />
    );
});
