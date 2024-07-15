import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

// project imports;
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table2 from "@/Components/Table2";
import Pagination from "@/Components/Pagination";

export default function Search({ auth, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const tableData = {
        auth: auth,
        headings: [
            {
                value: "content",
                label: "Content",
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
        title: "Search Comments",
        searchURLName: "comment.search",
        filterDateURLName: "comment.searchdate",
        singleItemDisplayPrefixURLName: "comment.show",
        singleItemEditPrefixURLName: "comment.edit",
        singleItemDeletePrefixURLName: "comment.destroy",
        addNewEntryURLName: "comment.create",
        ...props,
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="Search Results" />
            <AuthenticatedLayout
                auth={auth}
            >
                <Box className="w-full">
                    <Table2 {...tableData} />
                    {props.page_data.data && <Pagination page_data={props.page_data} {...props} />}
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
