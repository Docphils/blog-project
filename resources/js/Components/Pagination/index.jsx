
import "./styles.css";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ page_data, ...props }) {
    const [pageData, setPageData] = useState();
    useEffect(() => {
        setPageData(pageData => page_data)
    }, [page_data]);
    return (
        <Box className="center relative mx-auto mt-5 flex justify-center py-5">
            {pageData?.current_page && <Box className="pagination">
                {pageData && pageData.first_page_url && <Link className="link" href={pageData.first_page_url}>«</Link>}
                {pageData && pageData.prev_page_url && <Link className="link" href={pageData.prev_page_url}>prev</Link>}
                {pageData?.current_page && <Box className="link">{pageData.current_page} of {pageData.last_page}</Box>}
                {pageData && pageData.next_page_url && <Link className="link" href={pageData.next_page_url}>next</Link>}
                {pageData && pageData.last_page_url && <Link className="link" href={pageData.last_page_url}>»</Link>}
            </Box>}
        </Box>
    );
}
