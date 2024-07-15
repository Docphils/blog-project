import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import BlogListingFront from "@/Components/BlogListingFront";
import SubCategoryListingFront from "@/Components/SubCategoryListingFront";

export default function Read({ auth, page_data, type, posts, ...props }) {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="SubCategories" />
            <AuthenticatedLayout auth={auth}>
                <Box className="flex flex-col w-full">
                    <Box className="w-full">
                        <SubCategoryListingFront
                            page_data={page_data}
                            type={type}
                        />
                    </Box>
                    <Box className="w-full">
                        {type === "list" ? <BlogListingFront page_data={{ data: posts.data }} /> : <BlogListingFront page_data={{ data: page_data?.posts }} />}
                    </Box>
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
