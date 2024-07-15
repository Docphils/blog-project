import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Read({ auth, page_data }) {
    const [isLoading, setLoading] = useState(true);
    const [copy, setCopy] = useState("copy");
    const [data, setData] = useState(page_data ? page_data : []);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title={data?.fileName} />
            <AuthenticatedLayout auth={auth}>
                <Box className="container">
                    <Box className="w-full flex flex-col justify-center items-center">
                        <Box className="text-center max-w-6xl">
                            {data?.source && <object
                                data={data?.source}
                                className="rounded-md w-full h-full"
                            />}
                        </Box>
                        <Box className="w-full pb-2">
                            <Box className="text-center text-3xl">
                                {data?.fileName}
                            </Box>
                            <Box className="text-center text-sm ">
                                {data?.fileType}
                            </Box>
                            <Box className={"text-center text-sm " + (data?.status !== "Hidden" ? "text-green-700" : "text-red-700")}>
                                {data?.status}
                            </Box>
                            <Box className="flex flex-col text-center text-md p-10 gap-2">
                                <Box><code className="text-white bg-black p-5">
                                    {data?.source}
                                </code></Box>
                                <Box><PrimaryButton
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            data?.source
                                        );
                                        setCopy(()=>"copied")
                                    }}
                                >
                                    {copy}
                                </PrimaryButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
