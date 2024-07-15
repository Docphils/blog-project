import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
// project imports;
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import CustomAdminTable from "@/Components/CustomAdminTable";

export default function Index({ auth, message, ...props }) {
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
                value: "type",
                label: "Type",
            },
            {
                value: "permissionList",
                label: "Permission",
                headings: [
                    {
                        value: "name",
                        label: "Name",
                    },
                    {
                        value: "guard_name",
                        label: "Guard Name",
                    },
                    {
                        value: "description",
                        label: "Description",
                    },
                ]
            },
            {
                value: "roleList",
                label: "Role",
                headings: [
                    {
                        value: "name",
                        label: "Name",
                    },
                    {
                        value: "guard_name",
                        label: "Guard Name",
                    },
                    {
                        value: "description",
                        label: "Description",
                    },
                ]
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
        title: "All Users",
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
            <Head title="All Users" />
            <AuthenticatedLayout
                auth={auth}
            >
                <Box className="container">
                    <CustomAdminTable {...tableData} />
                    {props.page_data.data && <Pagination {...props} />}
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
