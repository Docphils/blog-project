import "./styles.css";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import LongButton from "../LongButton";
import PrimaryButton from "../PrimaryButton";
import Pagination from "../Pagination";

export default function CategoryListingFront({ ...props }) {
    const [showmore, setShowmore] = useState(false);
    const [thedata, setTheData] = useState([]);

    useEffect(() => {
        if (props.page_data?.data?.length >= 1) {
            setTheData((thedata) => props.type === "list" ? props.page_data?.data : props.page_data?.data?.subcategorys);
        } else {
            setTheData((thedata) => props.type === "list" ? props.page_data : props.page_data?.subcategorys);
        }
    }, [props.page_data]);

    return (
        <Box className="mx-auto flex w-full flex-col items-center justify-center px-4 py-5">
            {props.type === "list" ? <h2 className="pb-5 text-center text-3xl max-sm:pt-2"> Available Categories</h2> : <h2 className="pb-5 text-center text-3xl capitalize max-sm:pt-2">Related Sub Categories Under {props.page_data?.name ?? props.page_data?.data?.name}</h2>}
            <Box className="mx-auto flex w-full flex-grow flex-row flex-wrap items-center justify-center">
                {thedata.length > 0 && thedata.slice(0, showmore ? thedata.length : 20).map((x, i) => (
                    <LongButton
                        key={i}
                        data={x}
                        routename={props.type == "list" ? "front.category" : "front.subcategory"}
                        className="mb-2 mr-5 w-fit whitespace-nowrap text-black"
                    />
                ))}
            </Box>
            <Box className="m-auto mt-5 w-full text-center"><Button className="text-xl" onClick={() => setShowmore(showmore => !showmore)}> Show More {props.type === "list" ? "Categories" : "Sub Categories"}</Button></Box>
            {showmore && <Pagination page_data={props.page_data} {...props} />}
        </Box>
    );
}
