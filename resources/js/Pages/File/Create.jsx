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
import { constantgraphqloptions } from "@/config";
import axios from "axios";
import SelectOption from "@/Components/SelectOption";

export default function Create({ auth, page_data, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const [fileType, setFileType] = useState();
    const [imageprev, setImageprev] = useState();
    const [pagedata, setPagedata] = useState(page_data);

    useEffect(() => {
        setLoading(false);
    }, []);

    const { data, setData, processing, errors, submit, progress, reset, transform } =
        useForm("post", route("file.store"), {
            fileName: "",
            status: "",
            source: "",
            fileType: "",
            categorieId: "",
            subcategorieId: "",
        });

    transform((data) => ({
        ...data,
        fileType: fileType,
    }));

    const statusOptionData = [
        { value: "Published", name: "Published" },
        { value: "Hidden", name: "Hidden" },
    ];

    const [subcategories, setSubcategories] = useState([]);

    const [categories, setCategories] = useState([]);

    async function fetchsubcategory() {
        await axios
            .get(route("subcategory.index"), constantgraphqloptions)
            .then(({ data }) => {
                setSubcategories(data.page_data.data);
            })
            .catch(({ error }) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchsubcategory();
    }, []);

    async function fetchcategory() {
        await axios
            .get(route("category.index"), constantgraphqloptions)
            .then(({ data }) => {
                setCategories(data.page_data.data);
            })
            .catch(({ error }) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchcategory();
    }, []);

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
        });
    };

    return (
        <>
            <Head title="Upload" />
            <AuthenticatedLayout auth={auth}>
                <Box className="container">
                    <Box className="flex w-full flex-col items-center justify-center">
                        {message && <Box className="m-auto mb-4 w-full items-center justify-center p-10 text-center text-sm font-medium text-green-600">{message}</Box>}
                        <form
                            encType="multipart/form-data"
                            onSubmit={handlesubmit}
                            className="relative m-auto flex w-full flex-col items-center justify-center py-10"
                        >
                            <Box className="relative m-auto flex h-full w-full flex-col items-center justify-center text-center lg:max-w-[600px]">
                                <picture className="w-full">
                                    <source
                                        className="w-full"
                                        srcSet={
                                            imageprev
                                                ? imageprev
                                                : data.source
                                        }
                                    />
                                    <img
                                        src={
                                            imageprev
                                                ? imageprev
                                                : data.source
                                        }
                                        alt="Upload A Cover Image"
                                        className="w-full rounded-md"
                                    />
                                </picture>
                                <PrimaryButton
                                    type="button"
                                    className="absolute bottom-0 left-0 z-[0] h-14 w-full bg-[rgba(0,0,0,0.9)] lg:max-w-[600px]"
                                >
                                    <span className="mt-10 h-12 w-full whitespace-nowrap text-center text-white">
                                        Upload A Your File
                                    </span>
                                </PrimaryButton>
                                <TextInput
                                    required
                                    className="customtext-black absolute bottom-0 left-0 z-[1] h-[70px] w-full bg-[rgba(0,0,0,0.9)] opacity-0 lg:max-w-[600px]"
                                    id="source"
                                    type="file"
                                    accept="image/*"
                                    name="source"
                                    onChange={async function x(event) {
                                        handleOnChange(event);
                                        if (event.target.files[0]) {
                                            const x = event.target.files[0];

                                            const reader = new FileReader();
                                            reader.readAsDataURL(x);
                                            reader.addEventListener(
                                                "load",
                                                () => {
                                                    setFileType(
                                                        () => x.type ?? "unknown"
                                                    );
                                                    setImageprev(
                                                        () => reader.result
                                                    );
                                                }
                                            );
                                        }
                                    }}
                                />
                            </Box>
                            <Box className="mt-5 flex w-full flex-col items-center justify-center">
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="fileType"
                                        value="File Type"
                                        className="customtext-black mt-1 hidden pt-1"
                                    />

                                    <TextInput
                                        required
                                        hidden
                                        id="fileType"
                                        type="text"
                                        name="fileType"
                                        value={fileType}
                                        className="customtext-black mt-1 h-12 w-full"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.fileType}
                                        className="mt-2 hidden"
                                    />
                                </Box>
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="fileName"
                                        value="File Name"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <TextInput
                                        required
                                        id="fileName"
                                        type="text"
                                        name="fileName"
                                        value={data.fileName}
                                        className="customtext-black mt-1 h-12 w-full border-2 border-blue-950"
                                        autoComplete="fileName"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.fileName}
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
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="categorieId"
                                        value="Category"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <SelectOption
                                        required
                                        id="categorieId"
                                        optionData={categories}
                                        name="categorieId"
                                        value={data.categorieId}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="categorieId"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.categorieId}
                                        className="mt-2"
                                    />
                                </Box>
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="subcategorieId"
                                        value="Sub Category"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <SelectOption
                                        required
                                        id="subcategorieId"
                                        optionData={subcategories}
                                        name="subcategorieId"
                                        value={data.subcategorieId}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="subcategorieId"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.subcategorieId}
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
