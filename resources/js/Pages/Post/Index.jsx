import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

// project imports;
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";

export default function Index({ auth, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const tableData = {
        auth: auth,
        headings: [
            {
                value: "subject",
                label: "Subject",
            },
            {
                value: "summary",
                label: "Summary",
            },
            {
                value: "coverImage",
                label: "Cover Image",
            },
            {
                value: "status",
                label: "Status",
            },
            {
                value: "created_at",
                label: "Created At",
            },
            {
                value: "updated_at",
                label: "Updated At",
            },
        ],
        data: props.page_data.data ? [...props.page_data.data] : [],
        title: "All Posts",
        searchURLName: "post.search",
        filterDateURLName: "post.searchdate",
        singleItemDisplayPrefixURLName: "post.show",
        singleItemEditPrefixURLName: "post.edit",
        singleItemDeletePrefixURLName: "post.destroy",
        addNewEntryURLName: "post.create",
        ...props,
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="All Posts" />
            <AuthenticatedLayout
                auth={auth}
            >
                <Box className="w-full">
                    <Table {...tableData} />
                    {props.page_data.data && <Pagination page_data={props.page_data} {...props} />}
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
