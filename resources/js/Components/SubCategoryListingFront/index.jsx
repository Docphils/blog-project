import "./styles.css";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import LongButton from "../LongButton";
import PrimaryButton from "../PrimaryButton";
import Pagination from "../Pagination";

export default function SubCategoryListingFront({ ...props }) {
    const [showmore, setShowmore] = useState(false);
    const [thedata, setTheData] = useState([
        // {
        //     id: "9c8b9cc0-a54c-42ec-8be7-247d731b596a",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "e21d49a0-e1e7-4bb1-9dc6-a5c852728e8b",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "ef376fd4-a540-40a8-84f3-b5aa135e85a8",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "243252c1-57ef-4128-9e4c-2b1cdfbf9782",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "243252c1-57ef-4128-9e4c-2b1cdfbf9782",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "243252c1-57ef-4128-9e4c-2b1cdfbf9782",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "243252c1-57ef-4128-9e4c-2b1cdfbf9782",
        //     name: "lorem lorem lorem lorem lorem",
        // },
        // {
        //     id: "243252c1-57ef-4128-9e4c-2b1cdfbf9782",
        //     name: "lorem lorem lorem lorem lorem",
        // },
    ]);

    useEffect(() => {
        if (props.page_data?.data?.length >= 1) {
            setTheData((thedata) => props.type == "list" ? props.page_data?.data : [{...props.page_data?.data.category}]);
        }  else {
            setTheData((thedata) => props.type == "list" ? props.page_data : [{...props.page_data?.category}]);
        }
    }, []);

    return (
        <Box className="flex flex-col justify-center items-center mx-auto w-full  px-4 py-5 ">
             {props.type === "list" ? <h2 className="text-center text-3xl max-sm:pt-2 pb-5"> Related Sub Categories</h2> : <h2 className="text-center max-sm:pt-2 text-3xl pb-5">Related To This Category {props.page_data?.data?.category?.name ?? props.page_data?.category?.name}</h2>}
            <Box className="w-full flex flex-grow mx-auto flex-row flex-wrap justify-center items-center">
                {Array.isArray(thedata) && thedata.slice(0, showmore ? thedata.length : 20).map((x, i) => (
                    <LongButton
                        key={i}
                        data={x}
                        routename={props.type == "list" ? "front.subcategory": "front.category"}
                        className="w-fit whitespace-nowrap mr-5 mb-2"
                    />
                ))}
            </Box>
            <Box className="w-full text-center m-auto mt-5"><PrimaryButton className="text-4xl" onClick={()=>setShowmore(showmore => !showmore)}>Show More {props.type === "list" ? "Sub Categories": "Parent Categories"}</PrimaryButton></Box>
           {showmore && <Pagination page_data={props.page_data} {...props}/>}
        </Box>
    );
}
