import { useForm } from 'laravel-precognition-react-inertia';
import { RatingInputWidgetFront } from "../RatingInputWidgetFront";
import "./styles.css";
import { Box } from "@mui/material";
import React, { useState, useRef } from "react";

export default function ReplyInputGeneral({ postId, ...props }) {
    const [ratings, setRatings] = useState(0);
    const contentRef = useRef();
    const { data, setData, processing, submit, transform } = useForm("post", route("comment.store"), {
        rating: ratings,
        content: "",
        postId: postId,
    });
    transform((data)=>({
    ...data,
    rating: ratings,
    }))
    const handleOnchange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        submit();
    };
    return (
        <>
            <Box className="w-full mt-2 bg-[rgba(0,0,0,0.1)] rounded-md">
                <Box className="font-bold w-full text-center">
                    Express yourself here...
                </Box>
                <Box className="w-full m-auto bg-[rgba(255,255,255,0.7)]" title="Rate your experience">
                    <RatingInputWidgetFront
                        ratings={ratings}
                        setRatings={setRatings}
                    />
                </Box>
                <form onSubmit={handleOnSubmit} className='flex flex-col w-full m-auto'>
                    <input className='w-full'
                        type="number"
                        onChange={handleOnchange}
                        hidden
                        name="rating"
                        value={ratings}
                    />
                    <textarea
                        onChange={handleOnchange}
                        className="w-full"
                        ref={contentRef}
                        rows="5"
                        cols="50"
                        name="content"
                        defaultValue=""
                    />
                    <button
                        style={{ backgroundColor: "rgba(7, 7, 159, 0.9)" }}
                        className="w-full text-white p-5 mt-2 rounded-b-md"
                        type="submit"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </form>
            </Box>
        </>
    );
}
