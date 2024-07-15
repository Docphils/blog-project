import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import CategoryListingFront from "@/Components/CategoryListingFront";
import BlogListingFront from "@/Components/BlogListingFront";

export default function Category({ auth, page_data, type, posts, ...props }) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="Categories" />
            <GuestLayout auth={auth}>
                <Box className="flex flex-col container">
                    <Box className="container">
                        <CategoryListingFront
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
