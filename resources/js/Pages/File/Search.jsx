import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

// project imports;
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";

export default function Search({ auth, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const tableData = {
        auth: auth,
        headings: [
            {
                value: "fileName",
                label: "file Name",
            },
            {
                value: "fileType",
                label: "file Type",
            },
            {
                value: "source",
                label: "Source",
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
        title: "My Files",
        searchURLName: "file.search",
        filterDateURLName: "file.searchdate",
        singleItemDisplayPrefixURLName: "file.show",
        singleItemEditPrefixURLName: "file.edit",
        singleItemDeletePrefixURLName: "file.destroy",
        addNewEntryURLName: "file.create",
        ...props,
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="My Files" />
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
