import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PostDetails from "@/Components/PostDetails";
import ReviewSectionList from "@/Components/ReviewSectionList";

export default function Read({ auth, page_data }) {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(page_data ? page_data : []);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title={data?.fileName} />
            <AuthenticatedLayout auth={auth}>
                <Box className="container">
                    <Box className="w-full flex flex-col justify-center items-center">
                        <Box className="text-center w-96">
                            {data?.content}
                        </Box>
                        <Box className="w-full pb-2">
                            <Box className={"text-center text-sm " + ( data?.status !== "Hidden" ? "text-green-700" : "text-red-700")}>
                                {data?.status}
                            </Box>
                            <Box className="text-center text-md">
                                {data?.user?.firstName +
                                    " " +
                                    data?.user?.lastName}
                            </Box>
                        </Box>
                    </Box>
                    <PostDetails page_data={data.post} />
                    <ReviewSectionList page_data={data.post} />
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
