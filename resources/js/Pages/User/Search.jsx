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
                value: "firstName",
                label: "First Name",
            },
            {
                value: "lastName",
                label: "Last Name",
            },
            {
                value: "email",
                label: "Email",
            },
            {
                value: "status",
                label: "Status",
            },
            {
                value: "email_verified_at",
                label: "Email Verified At",
            },
            {
                value: "phone",
                label: "Phone",
            },
            {
                value: "avatar",
                label: "Avatar",
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
        title: "Search Users",
        searchURLName: "user.search",
        filterDateURLName: "user.searchdate",
        singleItemDisplayPrefixURLName: "user.show",
        singleItemEditPrefixURLName: "user.edit",
        singleItemDeletePrefixURLName: "user.destroy",
        addNewEntryURLName: "user.create",
        ...props,
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="Search Users" />
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
