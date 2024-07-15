import "./styles.css";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "laravel-precognition-react-inertia";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectOption from "@/Components/SelectOption";

export default function Create({ auth, page_data, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const [pagedata, setPagedata] = useState(page_data);

    useEffect(() => {
        setLoading(false);
    }, []);

    const { data, setData, processing, errors, submit, progress, reset } = useForm("post", route("category.store"),
        {
            name: "",
            status: "",
        }
    );

    const statusOptionData = [
        { value: "Published", name: "Published" },
        { value: "Hidden", name: "Hidden" },
    ];

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.type === "file"
                    ? event.target.files[0]
                    : event.target.value
        );
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        submit({
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        })
    };
    return (
        <>
            <Head
                title="Create Category"
            />
            <AuthenticatedLayout
                auth={auth}

            >
                <Box className="container">
                    <Box className="flex w-full flex-col items-center justify-center">
                        <h2 className="text-2xl">Create A Category</h2>
                        {message && <Box className="m-auto mb-4 w-full items-center justify-center text-center text-sm font-medium text-green-600">{message}</Box>}
                        <form encType="multipart/form-data"
                            onSubmit={handlesubmit}
                            className="relative m-auto flex w-full flex-col items-center justify-center py-10"
                        >
                            <Box className="mt-5 flex w-full flex-col items-center justify-center lg:max-w-[600px]">
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="name"
                                        value="Name"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <TextInput
                                        required
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="customtext-black mt-1 h-12 w-full border-2 border-blue-950"
                                        autoComplete="name"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </Box>
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="status"
                                        value="Status"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <SelectOption
                                        required
                                        id="status"
                                        optionData={statusOptionData}
                                        name="status"
                                        value={data.status}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="status"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.status}
                                        className="mt-2"
                                    />
                                </Box>
                            </Box>

                            <Box className="mt-6 flex w-full items-center justify-center">
                                <PrimaryButton
                                    className="flex h-14 w-56 items-center justify-center"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <span className="font-sans">Save</span>
                                </PrimaryButton>
                            </Box>
                        </form>
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                    </Box>
                </Box>
            </AuthenticatedLayout>
        </>
    );
}
