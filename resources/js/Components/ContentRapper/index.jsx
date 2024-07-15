import { Box } from '@mui/material';
import React from 'react';

export default function ContentRapper({ auth, ...props }) {
    return (
        <Box className={`w-full h-full box-border flex flex-grow relative justify-center items-center overflow-auto py-5  ${props.className}`}>
            {props.children}
        </Box>
    );
}