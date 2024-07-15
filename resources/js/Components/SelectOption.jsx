import "./styles.css";
import { Box } from "@mui/material";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SelectOption(
    { className = "", isFocused = false, optionData = [], ...props },
    ref
) {
    const select = ref ? ref : useRef();
    const nameforselected = props.value
        ? optionData[optionData.findIndex(
              (options) =>
                  (options.value ? options.value : options.id) === props.value
          )]?.name
        : "select a value";
    useEffect(() => {
        if (isFocused) {
            select.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={className + " customborder "}
            ref={select}
        >
            <option value={props.value ?? ""}>{nameforselected}</option>
            {optionData.length > 0 &&
                optionData.map((options, index) => (
                    <option
                        key={index}
                        value={options.id ? options.id : options.value}
                    >
                        {options.name}
                    </option>
                ))}
        </select>
    );
});
