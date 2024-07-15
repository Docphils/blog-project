import Card from "../Card";
import "./styles.css";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoogleAds from "../GoogleAds";
import PrimaryButton from "../PrimaryButton";
import Pagination from "../Pagination";
import PostCard from "../Card";

export default function BlogListingFront({ ...props }) {
    const [showmore, setShowmore] = useState(false);
    const [thedata, setTheData] = useState(props.page_data?.data ? props.page_data?.data : []);

    return (
        <Box className="mx-auto flex w-full flex-col justify-center px-4 py-5">
            <h2 className="pb-5 text-center text-3xl"> Blog Posts</h2>
            {/* <GoogleAds /> */}
            <Box className="mx-auto grid w-full flex-grow grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:justify-center">
                {Array.isArray(thedata) && thedata.slice(0, showmore ? thedata.length : 20).map((x, i) => (
                    <PostCard key={i} props={x} />
                ))}
            </Box>
            {/* <GoogleAds /> */}
            <Box className="m-auto mt-5 w-full text-center"><Button className="text-xl" onClick={() => setShowmore(showmore => !showmore)}>Show More Blogs</Button></Box>
            {showmore && <Pagination page_data={props.page_data} />}
        </Box>
    );
}
