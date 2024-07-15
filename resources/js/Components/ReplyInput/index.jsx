import { useForm } from 'laravel-precognition-react-inertia';
import "./styles.css";
import { Box } from "@mui/material";
import React, {useRef} from "react";

export default function ReplyInput({commentId, ...props }) {
    const contentRef = useRef();
    
    const { setData, processing, submit} = useForm("post", route("reply.store"), {
        content: "",
        commentId: commentId,
    });

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
            <Box className="w-full p-2 mt-2 bg-[rgba(0,0,0,0.1)] rounded-md">
                <form onSubmit={handleOnSubmit}>
                    <textarea
                        onChange={handleOnchange}
                        className="w-full"
                        ref={contentRef}
                        rows="4"
                        cols="50"
                        name="content"
                        defaultValue=""
                    />
                    <button
                        style={{ backgroundColor: "rgba(7, 7, 159, 0.9)" }}
                        className="w-full text-white p-5 rounded-b-md"
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
