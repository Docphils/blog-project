"use client";
import "./styles.css";
import React, { useEffect, Suspense } from "react";
import {
    CssBaseline,
    StyledEngineProvider,
    ThemeProvider,
    createTheme,
    Box,
} from "@mui/material";
import Alert from "@/Components/Alert";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const theme = createTheme({});
export default function CommonLayout({ children, ...props }) {
    useEffect(() => {
        if (typeof JSON == "undefined") {
            alert("Please upgrade your browser for better performance");
        }
    }, []);
    const message = props.message ?? props.session_message;
    const error = props.error ?? props.session_error;

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        if (error) {
            toast.error(error);
        }
    }, [message, error]);
    return (
        <Suspense>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <ToastContainer />
                    <Box
                        className={
                            `block w-screen h-screen overflow-auto relative 
                            ${props.className}`
                        }
                    >
                        {children}
                    </Box>
                </ThemeProvider>
            </StyledEngineProvider>
        </Suspense>
    );
}
