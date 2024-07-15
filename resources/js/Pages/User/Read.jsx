import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

// project imports;
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Read({ auth, page_data }) {
    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState(page_data ? page_data : auth.user);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title={data.firstName + " " + data.lastName} />
            <AuthenticatedLayout
                auth={auth}
            >
                <Box className="container flex flex-row justify-center items-center">
                    <Box className="w-full flex flex-col justify-center items-center">
                        <Box className="text-center w-96 h-96">
                            <picture>
                                <source
                                    srcSet={
                                        data.avatar
                                            ? data.avatar
                                            : "/cover.svg"
                                    }
                                />
                                <img
                                    src={data.avatar}
                                    alt="avatar"
                                    className="rounded-md"
                                />
                            </picture>
                        </Box>
                        <Box className="w-full pb-2">
                            <Box className="text-center text-3xl">
                                {data.firstName + " " + data.lastName}
                            </Box>
                            <Box className="text-center text-sm text-green-700">
                                {data.phone}
                            </Box>
                            <Box className="text-center text-sm">
                                {data.email}
                            </Box>
                        </Box>
                        <Box className="w-full text-center flex flex-row flex-wrap justify-center items-center gap-1">
                            {data.id === auth.user.id && <Link
                                className="w-72 h-14"
                                href={route("user.edit", { id: data.id })}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Edit
                                    </span>
                                </PrimaryButton>
                            </Link>}
                            <Link
                                className="w-72 h-14"
                                href={route("post.me")}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Post
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("file.me")}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Files
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("category.me")}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Categories
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("subcategory.me")}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Sub Categories
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("comment.me")}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Comments
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("reply.me")}
                            >
                                <PrimaryButton
                                    className="w-full h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Replies
                                    </span>
                                </PrimaryButton>
                            </Link>
                        </Box>
                    </Box>
                    <hr className="mt-5" />
                    <Box className="flex flex-col justify-center items-center mt-5">
                        <Box></Box>
                    </Box>
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
