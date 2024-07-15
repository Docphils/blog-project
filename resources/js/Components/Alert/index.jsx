import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alert({ message, error, status }) {
    useEffect(() => {
        if (message !== undefined) {
            toast(message);
        }
    }, [message]);

    useEffect(() => {
        if (error !== undefined) {
            toast(error);
        }
    }, [error]);
    useEffect(() => {
        if (status !== undefined) {
            toast(status);
        }
    }, [status]);
    return (
        <>
            <ToastContainer />
        </>
    );
}
