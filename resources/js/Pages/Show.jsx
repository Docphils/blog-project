import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import ReviewSectionList from "@/Components/ReviewSectionList";
import PostDetails from "@/Components/PostDetails";
import BlogListingFront from "@/Components/BlogListingFront";
import SubCategoryListingFront from "@/Components/SubCategoryListingFront";

export default function Show({ auth, ...props }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title={props.page_data?.subject} />
            <GuestLayout auth={auth}>
                <Box className="flex flex-col items-center container m-auto bg-inherit">
                    <PostDetails {...props} />
                    <ReviewSectionList {...props} />
                    <BlogListingFront page_data={{data:props.page_data?.subcategory?.posts}}/>
                    {props.page_data?.category?.subcategorys && <SubCategoryListingFront type="list" page_data={{data: props.page_data?.category?.subcategorys}}/>}
                </Box>
            </GuestLayout>
        </>
    );
}
