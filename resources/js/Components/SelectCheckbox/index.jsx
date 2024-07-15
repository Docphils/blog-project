import "./styles.css";
import React, { useState, forwardRef, useRef, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

export default forwardRef(function SelectCheckbox(
    {
        className = "",
        optionData = [
            { label: "Grapes 🍇", value: "grapes" },
            { label: "Mango 🥭", value: "mango" },
            { label: "Strawberry 🍓", value: "strawberry", disabled: true },
        ],
        ...props
    },
    ref
) {

    const [selected, setSelected] = useState(props.selectedRows);
    const { selectedRows, setSelectedRows } = props;
    const selectedRef = ref ? ref : useRef();
    useEffect(() => {
        selectedRef.current = selected;
        setSelectedRows(selectedRows => selected);
    }, [selected]);

    const customFilterOptions = (options, filter) => {
        if (!filter) {
            return options;
        }
        const re = new RegExp(filter, "i");
        return options.filter(({ value }) => value && value.match(re));
    };

    return (
        <MultiSelect
            className={className}
            options={optionData}
            value={selected}
            onChange={setSelected}
            filterOptions={customFilterOptions}
            labelledBy="Select {props.heading}"
        />
    );
});
