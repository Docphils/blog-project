import { Box } from '@mui/material';
import React from 'react';

export default function ContentRapperGuest({ auth, ...props }) {
    return (
        <Box className={`relative flex h-full w-full flex-grow items-center justify-center overflow-auto text-black ${props.className}`}>
            {props.children}
        </Box>
    );
}