import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { Link } from "@inertiajs/react";

export default function LongButton({ routename, data, className = "", ...props }) {
    const { name, id } = data || {};
    return (
        <Link href={route(routename, { id: id })} className={`icons btn inline-flex items-center rounded-md border border-black bg-white px-4 py-2 text-xs font-semibold capitalize tracking-widest transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 ${className}`}>
            {name}
        </Link>
    );
}
