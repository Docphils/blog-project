import SelectOption from "../SelectOption";
import ReplyInputGeneral from "../ReplyInputGeneral";
import ReviewCard from "../ReviewCard";
import "./styles.css";
import { Box } from "@mui/material";
import React, { useState } from "react";

export default function ReviewSectionList({ ...props }) {
    const [reviewdata, setReviewdata] = useState(
        props.page_data?.comments ? props.page_data?.comments : []
    );
    const ReviewFilterOptionData = [
        { value: "Newest", name: "Newest" },
        { value: "Oldest", name: "Oldest" },
    ];

    const handleOnChangeFliter = (event) => {
        if (event.target.value === "Newest") {
            setReviewdata((reviewdata) => reviewdata.sort());
        } else {
            setReviewdata((reviewdata) => reviewdata.reverse());
        }
    };

    return (
        <Box
            className={
                "relative w-full flex flex-col rounded-md max-w-5xl p-5 bg-[rgba(0,0,0,0.1)] " + props.className
            }
        >
            {reviewdata.length > 0 && (
                <Box className="flex flex-row w-full">
                    <SelectOption className="p-5"
                        onChange={handleOnChangeFliter}
                        optionData={ReviewFilterOptionData}
                        value={ReviewFilterOptionData[0].value}
                    />
                </Box>
            )}
            <Box className="flex flex-col w-full bg-[rgba(255,255,250, 0.5)] ">
                {Array.isArray(reviewdata) &&
                    reviewdata.map((x, i) => {
                        return <ReviewCard key={i} onereviewdata={x} />;
                    })}
                <Box className="w-full mt-10">
                    <ReplyInputGeneral postId={props.page_data?.id} />
                </Box>
            </Box>
        </Box>
    );
}
