import React from 'react';
import CommonLayout from '@/Layouts/CommonLayout';
import ContentRapperGuest from '@/Components/ContentRapper/contentRapperGuest';
import Footer from '@/Components/Footer/index';
import MarqueeComponent from '@/Components/MarqueeComponent';
import { Box } from '@mui/material';
import NavBar from '@/Components/NavBar';

export default function GuestLayout({ auth, children, ...props }) {
    return (
        <CommonLayout>
            <Box className="relative w-full">
                <MarqueeComponent {...props} />
            </Box>
            <Box className="sticky left-0 top-0 z-50 w-full">
                <NavBar auth={auth} />
            </Box>

            <ContentRapperGuest auth={auth} props={props} className='flex w-full flex-grow flex-col bg-white'>
                {children}
            </ContentRapperGuest>
            <Footer />
        </CommonLayout>
    );
}

export function GuestLayout2({ auth, children, ...props }) {
    return (
        <CommonLayout>
            <Box className="sticky left-0 top-0 z-50 w-full">
                <NavBar auth={auth} />
            </Box>
            <Box className="relative w-full">
                <MarqueeComponent {...props} />
            </Box>
            <Box className={"famous-background relative h-full min-h-full w-full items-center justify-center overflow-auto text-black max-sm:top-[-60px]" + props.className}>
                {children}
            </Box>
            <Footer />
        </CommonLayout>
    );
}