import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Box } from "@mui/material";
import { useState, useEffect } from 'react';

export default function Dashboard({ auth, page_data }) {
    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState(page_data ? page_data : auth.user);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <Head title="Dashboard" />
            <AuthenticatedLayout
                auth={auth}
            >
                <Box className="container">
                    <Box className="container flex flex-col justify-center items-center">
                        <Box className="text-center w-96 h-96 max-sm:w-full">
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
                        <Box className="container pb-2">
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
                        <Box className="container text-center flex flex-row flex-wrap justify-center items-center gap-1">
                            <Link
                                className="w-72 h-14"
                                href={route("user.edit", { id: data.id })}
                            >
                                <PrimaryButton
                                    className="container h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Edit
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("post.me")}
                            >
                                <PrimaryButton
                                    className="container h-full text-center justify-center items-center"
                                    disabled={false}
                                >
                                    <span className="text-lg font-sans">
                                        Posts
                                    </span>
                                </PrimaryButton>
                            </Link>
                            <Link
                                className="w-72 h-14"
                                href={route("file.me")}
                            >
                                <PrimaryButton
                                    className="container h-full text-center justify-center items-center"
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
                                    className="container h-full text-center justify-center items-center"
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
                                    className="container h-full text-center justify-center items-center"
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
                                    className="container h-full text-center justify-center items-center"
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
                                    className="container h-full text-center justify-center items-center"
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
