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
        route("user.update", { id: pagedata.id ?? page_data.id }),
        {
            firstName: pagedata.firstName,
            lastName: pagedata.lastName,
            avatar: pagedata.avatar,
            phone: pagedata.phone,
            status: pagedata.status,
            content: pagedata.content,
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
        });
    };
    return (
        <>
            <Head
                title={"Edit " + pagedata.firstName + " " + pagedata.lastName}
            />
            <AuthenticatedLayout auth={auth}>
                <Box className="container block h-full overflow-auto p-4">
                    {message && <Box className="m-auto mb-4 w-full items-center justify-center text-center text-sm font-medium text-green-600">{message}</Box>}
                    <Box className="w-full flex-col items-center justify-center">
                        <form
                            encType="multipart/form-data"
                            onSubmit={handlesubmit}
                            className="relative m-auto flex w-full flex-col items-center justify-center py-10"
                        >
                            <Box className="relative m-auto flex h-full w-full flex-col items-center justify-center text-center lg:max-w-[600px]">
                                <picture className="block w-full">
                                    <source
                                        className="w-full"
                                        srcSet={
                                            imageprev
                                                ? imageprev
                                                : data.avatar
                                        }
                                    />
                                    <img
                                        src={
                                            imageprev ? imageprev : data.avatar
                                        }
                                        alt="avatar"
                                        className="w-full rounded-md"
                                    />
                                </picture>
                                <PrimaryButton
                                    type="button"
                                    className="absolute bottom-0 left-0 z-[0] h-14 w-full bg-[rgba(0,0,0,0.9)] lg:max-w-[600px]"
                                >
                                    <span className="mt-10 h-12 w-full whitespace-nowrap text-center text-white">
                                        Upload Profile Pic
                                    </span>
                                </PrimaryButton>
                                <TextInput
                                    className="customtext-black absolute bottom-0 left-0 z-[1] h-[70px] w-full bg-[rgba(0,0,0,0.9)] opacity-0 lg:max-w-[600px]"
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    name="avatar"
                                    autoComplete="avatar"
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
                            <Box className="relative mt-5 flex w-full flex-col items-center justify-center lg:max-w-[600px]">
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="firstName"
                                        value="First Name"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <TextInput
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={data.firstName}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="firstName"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.firstName}
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
                                        htmlFor="lastName"
                                        value="Last Name"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <TextInput
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        value={data.lastName}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="lastName"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.lastName}
                                        className="mt-2"
                                    />
                                </Box>
                                <Box className="w-full lg:max-w-[600px]">
                                    <InputLabel
                                        htmlFor="phone"
                                        value="Phone"
                                        className="customtext-black mt-1 pt-1"
                                    />

                                    <TextInput
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        className="customtext-black mt-1 h-12 w-full"
                                        autoComplete="phone"
                                        onChange={handleOnChange}
                                    />

                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </Box>
                                <Box
                                    className="w-full lg:max-w-[600px]"
                                    style={{
                                        resize: "both",
                                    }}
                                >
                                    <InputLabel
                                        htmlFor="content"
                                        value="About You"
                                        className="customtext-black mt-1 pt-1"
                                    />
                                    <Box className="mt-1 h-96 w-full border-2 border-blue-950">
                                        <Editor
                                            required
                                            id="content"
                                            name="content"
                                            value={data.content}
                                            onChange={setData}
                                        />
                                    </Box>
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
