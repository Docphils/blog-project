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
                value: "name",
                label: "Name",
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
        title: "All Sub Categories",
        searchURLName: "subcategory.search",
        filterDateURLName: "subcategory.searchdate",
        singleItemDisplayPrefixURLName: "subcategory.show",
        singleItemEditPrefixURLName: "subcategory.edit",
        singleItemDeletePrefixURLName: "subcategory.destroy",
        addNewEntryURLName: "subcategory.create",
        ...props,
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="All Sub Categories" />
            <AuthenticatedLayout
                auth={auth}
            >
                <Box className="container overflow-auto">
                    <Table {...tableData} />
                    {props.page_data.data && <Pagination page_data={props.page_data} {...props} />}
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
