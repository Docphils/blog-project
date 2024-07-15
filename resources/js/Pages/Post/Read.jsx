import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import ReviewSectionList from "@/Components/ReviewSectionList";
import PostDetails from "@/Components/PostDetails";
import BlogListingFront from "@/Components/BlogListingFront";
import SubCategoryListingFront from "@/Components/SubCategoryListingFront";

export default function Read({ auth, ...props }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title={props.page_data?.subject} />
            <GuestLayout auth={auth}>
                <Box className="container m-auto flex flex-col items-center bg-inherit">
                    <PostDetails {...props} />
                    <ReviewSectionList {...props} />
                    <BlogListingFront page_data={{ data: props.page_data?.subcategory?.posts }} />
                    {props.page_data?.category?.subcategorys && <SubCategoryListingFront type="list" page_data={{ data: props.page_data?.category?.subcategorys }} />}
                </Box>
            </GuestLayout>
        </>
    );
}
