import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import BlogListingFront from "@/Components/BlogListingFront";
import Slider from "@/Components/Slider/index";

export default function Index({ auth, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const [sliderdata, setSliderdata] = useState(
        props.page_data?.data ? props.page_data.data?.slice(0, 6) : []
    );
    useEffect(() => {
        setLoading(false);
    }, []);

    const slides = [
        {
            eachSlide: sliderdata[0]?.coverImage ? sliderdata[0]?.coverImage : route("index") + "/cover.svg",
            id: sliderdata[0]?.id,
            content: sliderdata[0]?.summary ? sliderdata[0].summary : ""
        },
        {
            eachSlide: sliderdata[1]?.coverImage ? sliderdata[1]?.coverImage : route("index") + "/cover.svg",
            id: sliderdata[1]?.id,
            content: sliderdata[1]?.summary ? sliderdata[1].summary : ""
        },
        {
            eachSlide: sliderdata[2]?.coverImage ? sliderdata[2]?.coverImage : route("index") + "/cover.svg",
            id: sliderdata[2]?.id,
            content: sliderdata[2]?.summary ? sliderdata[2].summary : ""
        },
        {
            eachSlide: sliderdata[3]?.coverImage ? sliderdata[3]?.coverImage : route("index") + "/cover.svg",
            id: sliderdata[3]?.id,
            content: sliderdata[3]?.summary ? sliderdata[3].summary : ""
        },
        {
            eachSlide: sliderdata[4]?.coverImage ? sliderdata[4]?.coverImage : route("index") + "/cover.svg",
            id: sliderdata[4]?.id,
            content: sliderdata[4]?.summary ? sliderdata[4].summary : ""
        },
        {
            eachSlide: sliderdata[5]?.coverImage ? sliderdata[5]?.coverImage : route("index") + "/cover.svg",
            id: sliderdata[5]?.id,
            content: sliderdata[5]?.summary ? sliderdata[5].summary : ""
        },
    ];

    return (
        <>
            <Head title="Home" />
            <GuestLayout auth={auth}>
                <Box className="relative flex h-full w-full flex-col items-center justify-center gap-1 overflow-auto">
                    <Box className="flex h-[600px] w-full">
                        <Slider slides={slides} />
                    </Box>
                    <Box className="flex h-screen w-full overflow-auto">
                        <BlogListingFront {...props} />
                    </Box>
                </Box>
            </GuestLayout>
        </>
    );
}
