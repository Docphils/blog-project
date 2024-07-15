import React, { useState, useEffect } from "react";
import CommonLayout from "@/Layouts/CommonLayout";
import NavBar from "@/Components/NavBar/index";
import SideBar from "@/Components/SideBar/index";
import { Box } from "@mui/material";

export default function AuthenticatedLayout({ auth, children, ...props }) {
    return (
        <CommonLayout className="famous-background bg-white">
            <Box className="sticky left-0 top-0 z-50 w-full">
                <NavBar auth={auth} />
            </Box>
            <Box
                className="relative flex h-screen w-full flex-row"
            >
                <Box className="h-screen w-fit overflow-auto">
                    <SideBar
                        auth={auth}
                    />
                </Box>
                <Box className="flex h-screen w-auto flex-grow flex-col overflow-auto py-10">
                    <Box className="block h-auto w-full p-1">
                        {children}
                    </Box>
                </Box>
            </Box>
        </CommonLayout>
    );
}
