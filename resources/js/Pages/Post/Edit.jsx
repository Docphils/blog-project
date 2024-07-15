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
import Editor from "@/Components/Editor/Editor";

export default function Edit({ auth, page_data, message, ...props }) {
    const [isLoading, setLoading] = useState(true);
    const [imageprev, setImageprev] = useState();
    const [pagedata, setPagedata] = useState(page_data);

    useEffect(() => {
        setLoading(false);
    }, []);

    const { data, setData, processing, errors, submit, progress, reset } = useForm(
        "post",
        route("post.update", { id: pagedata.id }),
        {
            subject: pagedata.subject,
            status: pagedata.status,
            coverImage: pagedata.coverImage,
            content: pagedata.content,
            summary: pagedata.summary,
            categorieId: pagedata.categorieId,
            subcategorieId: pagedata.subcategorieId,
        }
    );

    const statusOptionData = [
        { value: "Published", name: "Published" },
        { value: "Hidden", name: "Hidden" },
    ];

    const [subcategories, setSubcategories] = useState([]);

    const [categories, setCategories] = useState([]);

    async function fetchsubcategory(id) {
        await axios
            .get(route("subcategory.category", { id: id }), constantgraphqloptions)
            .then(({ data }) => {
                setSubcategories(data.page_data.data);
            })
            .catch(({ error }) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchsubcategory(data.categorieId);
    }, [data.categorieId]);

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
            <Head title="Edit Post" />
            <AuthenticatedLayout auth={auth}>
                <Box className="container flex h-full flex-col items-center justify-center overflow-auto">
                    <Box className="relative block h-full w-full flex-col items-center justify-center overflow-auto">
                        {message && <Box className="m-auto mb-4 w-full items-center justify-center text-center text-sm font-medium text-green-600">{message}</Box>}
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
                                                : data.coverImage
                                        }
                                    />
                                    <img
                                        src={
                                            imageprev ? imageprev : data.coverImage
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
                                        Upload A Cover Image
                                    </span>
                                </PrimaryButton>
                                <TextInput
                                    className="customtext-black absolute bottom-0 left-0 z-[1] h-[70px] w-full bg-[rgba(0,0,0,0.9)] opacity-0 lg:max-w-[600px]"
                                    id="coverImage"
                                    type="file"
                                    accept="image/*"
                                    name="coverImage"
                                    onChange={async function x(event) {
                                        handleOnChange(event);
                                        if (event.target.files[0]) {
                                            const x = event.target.files[0];

                                            const reader = new FileReader();
                                            reader.readAsDataURL(x);
                                            reader.addEventListener(
                                                "load",
                                                () => {
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
                                        htmlFor="subject"
                                        value="Subject"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <TextInput
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={data.subject}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="subject"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.subject}
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
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="summary"
                                        value="Summary"
                                        className="customtext-black mt-1 pt-1"
                                    />
                                    <TextAreaInput
                                        className="customtext-black mt-1 h-36 w-full"
                                        required
                                        id="summary"
                                        name="summary"
                                        value={data.summary}
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.summary}
                                        className="mt-2"
                                    />
                                </Box>
                                <Box className="w-full lg:max-w-[600px]" style={{
                                    resize: "both"
                                }}>
                                    <InputLabel
                                        htmlFor="content"
                                        value="Content"
                                        className="customtext-black mt-1 pt-1"
                                    />
                                    <Editor
                                        id="content"
                                        type="text"
                                        name="content"
                                        value={data.content}
                                        className="mt-1 min-h-full w-full border-2 border-blue-950"
                                        autoComplete="content"
                                        onChange={(e) => setData("content", e)}
                                        required
                                    />
                                    <InputError
                                        message={errors.content}
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
