import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import BlogListingFront from "@/Components/BlogListingFront";
import TextInput from "@/Components/TextInput";
import { useForm } from "laravel-precognition-react-inertia";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Search({ auth, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    const { data, setData, processing, errors, submit, progress, reset } = useForm("post", route("front.search"),
        {
            queryString: ""
        }
    );

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.type === "file"
                    ? event.target.files[0]
                    : event.target.value
        );
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        submit({
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Search" />
            <GuestLayout auth={auth}>
                <Box className="flex flex-col container overflow-hidden">
                    <Box className="container p-10">
                        {/* {message && <Box className="font-medium text-xs text-center container items-center justify-center m-auto text-green-950">{message}</Box>} */}
                        <form encType="multipart/form-data"
                            onSubmit={handlesubmit}
                            className="container flex flex-col justify-center items-center m-auto"
                        >
                            <Box className="faq seachpage  container flex flex-col justify-center items-start w-full">
                                {/* <TextInput
                                    required
                                    id="queryString"
                                    type="text"
                                    name="queryString"
                                    value={data.queryString}    
                                    className="mt-1 container h-12 customtext-black border-2 border-blue-950"
                                    onChange={handleOnChange}
                                /> */}
                                <svg viewBox="0 0 512 512" width="100" title="search">
                                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                                </svg>
                                <input
                                    className="searchbar"
                                    type="text"
                                    placeholder="Enter your search here"
                                    onChange={handleOnChange}
                                    value={data.queryString}
                                />
                            </Box>
                            <Box className="flex justify-center items-center mt-6 container">
                                <PrimaryButton
                                    className="w-56 h-14 flex justify-center items-center"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <span className="font-sans">Search</span>
                                </PrimaryButton>
                            </Box>
                        </form>
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </Box>
                    <BlogListingFront {...props} />
                </Box>
            </GuestLayout>
        </>
    );
}
