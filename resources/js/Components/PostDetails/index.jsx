import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
// import AdSense from "react-adsense";
// import { config } from "@/config";
import LongButton from "../LongButton";
import ShareSocials from "../ShareSocials";
import EditorTextParser from "../EditorParser/EditorTextParser";

export default function PostDetails({ ...props }) {

    return (
        <Box className="w-full max-w-5xl rounded-lg bg-inherit hover:scale-[1.0099]">
            <Box className="mt-5 flex h-fit w-full flex-row flex-wrap items-center justify-start p-5 max-lg:mt-10">
                <LongButton
                    routename="front.category"
                    data={props.page_data?.category}
                    className="mr-2 w-fit whitespace-nowrap"
                />{" "}
                &gt;{" "}
                <LongButton
                    routename="front.subcategory"
                    data={props.page_data?.subcategory}
                    className="ml-2 mr-2 w-fit whitespace-nowrap"
                />
            </Box>
            <Box className="w-full">
                <h1
                    className="mb-2 mt-5 p-5 text-center font-sans text-3xl font-bold capitalize"
                    style={{
                        color: "rgba(7, 7, 159, 1)",
                    }}
                >
                    {props.page_data?.subject}
                </h1>
            </Box>
            <Box className="w-full">
                <object
                    data={props.page_data?.coverImage}
                    className="mb-2 h-full w-full rounded-md rounded-tl-lg rounded-tr-lg"
                />
            </Box>
            <Box className="flex w-full flex-col">
                <Box className="p-10 text-center">Share To Your Handles</Box>
                <Box className="w-full items-center justify-center text-center">
                    <ShareSocials
                        url={route("post.show", { id: props.page_data?.id })}
                        title={props.page_data?.subject}
                        media={props.page_data?.coverImage}
                    />
                </Box>
            </Box>
            <Box className="w-full">
                {/* <AdSense.Google
                    client={config.googleAddClient}
                    slot={config.googleAddSlot}
                    style={{ display: "block" }}
                    format="auto"
                    responsive="true"
                    layoutKey="-gw-1+2a-9x+5c"
                /> */}
            </Box>

            <Box className="mb-2 flex flex-col gap-4 rounded-bl-lg rounded-br-lg p-5 font-sans text-xl font-normal">
                <EditorTextParser data={props.page_data?.content} />
            </Box>
            <Box className="mb-2 px-2 py-1 text-start">
                Created by:{" "}
                {props.page_data?.user.firstName +
                    " " +
                    props.page_data?.user.lastName}{" "}
                <span className="icons text-xs">
                    {" " + new Date(props.page_data?.created_at)}
                </span>
            </Box>

            <Box className="w-full">
                {/* <AdSense.Google
                    client={config.googleAddClient}
                    slot={config.googleAddSlot}
                    style={{ display: "block" }}
                    format="auto"
                    responsive="true"
                    layoutKey="-gw-1+2a-9x+5c"
                /> */}
            </Box>
        </Box>
    );
}
