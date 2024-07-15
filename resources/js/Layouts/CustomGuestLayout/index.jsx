import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import CommonLayout from "../CommonLayout";
import { Box } from "@mui/material";

export default function CustomGuestLayout({ children, ...props }) {
    return (
        <CommonLayout>
            <Box className="flex h-screen w-full flex-col items-center overflow-auto bg-white pt-6 sm:justify-center sm:pt-0">
                <Box>
                    <Link href="/">
                        <ApplicationLogo className="w-15 h-15 customGuestlogo fill-current" />
                    </Link>
                </Box>

                <Box className="customguestlayout mt-6 w-full items-center justify-center overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg">
                    {children}
                </Box>
            </Box>
        </CommonLayout>
    );
}
