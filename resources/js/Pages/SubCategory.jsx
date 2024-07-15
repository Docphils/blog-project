import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import BlogListingFront from "@/Components/BlogListingFront";
import SubCategoryListingFront from "@/Components/SubCategoryListingFront";

export default function SubCategory({ auth, page_data, type, posts, ...props }) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="SubCategories" />
            <GuestLayout auth={auth}>
                <Box className="flex flex-col container">
                    <Box className="container">
                        <SubCategoryListingFront
                            page_data={page_data}
                            type={type}
                        />
                    </Box>
                    <Box className="container">
                        {type === "list" ? <BlogListingFront page_data={{ data: posts.data }} /> : <BlogListingFront page_data={{ data: page_data?.posts }} />}
                    </Box>
                </Box>
            </GuestLayout>
        </>
    );
}
