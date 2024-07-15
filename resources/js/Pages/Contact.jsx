import "./styles.css";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { ImHome } from "@react-icons/all-files/im/ImHome";
import { FaPhone } from "@react-icons/all-files/fa/FaPhone";
import { BsEnvelopeFill } from "@react-icons/all-files/bs/BsEnvelopeFill";
import { useForm } from "laravel-precognition-react-inertia";


export default function Contact({ auth, status, ...props }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const { data, setData, post, processing, errors } = useForm("post", route("front.contact.store"), {
        fullName: "",
        email: "",
        content: ""
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('front.contact.store'));
    };
    return (
        <>
            <Head title="Contact Us" />
            <GuestLayout
                auth={auth}
            >
                <Box className="c-body container bg-white">
                    <section className="c-section">
                        <Box className="c-section-header">
                            <Box className="c-container pt-10 max-md:pt-0">
                                <h2 style={{ fontFamily: 'philosopherbold' }} className="text-3xl icons">Contact Us</h2>
                                <p>
                                    We're here to assist you and answer any questions you may have. Feel free to reach out to us using the following methods:
                                </p>
                            </Box>
                        </Box>
                        {status && <Box className="mb-4 font-medium text-sm text-center w-full items-center justify-center m-auto text-green-600">{status}</Box>}
                        <Box className="c-container">
                            <Box className="c-row">
                                <Box className="c-contact-info">
                                    <Box className="c-contact-info-item">
                                        <Box className="c-contact-info-icon">
                                            <ImHome className="icons" />
                                        </Box>
                                        <Box className="c-contact-info-content">
                                            <h4>Address</h4>
                                            <p>
                                                Emmanuel Aguma Crescent, Jabi,
                                                <br /> Abuja, Nigeria, <br />
                                                900001
                                            </p>
                                        </Box>
                                    </Box>
                                    <Box className="c-contact-info-item">
                                        <Box className="c-contact-info-icon">
                                            <FaPhone className="icons" />
                                        </Box>
                                        <Box className="c-contact-info-content">
                                            <h4>Phone</h4>
                                            <p>+2348109502584</p>
                                        </Box>
                                    </Box>
                                    <Box className="c-contact-info-item">
                                        <Box className="c-contact-info-icon">
                                            <BsEnvelopeFill className="icons" />
                                        </Box>
                                        <Box className="c-contact-info-content">
                                            <h4>Email</h4>
                                            <p>contactus@swifre.com</p>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="c-contact-form">
                                    <form onSubmit={submit} id="contact-form">
                                        <h2 style={{ fontFamily: 'philosopherbold' }}>Send Message</h2>
                                        <Box className="c-input-box">
                                            <input
                                                type="text"
                                                required={true}
                                                name="fullName"
                                                value={data.fullName}
                                                onChange={(e) => setData('fullName', e.target.value)}
                                            />
                                            <span>Full Name</span>
                                        </Box>
                                        <Box className="c-input-box">
                                            <input
                                                type="email"
                                                required={true}
                                                name="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            <span>Email</span>
                                        </Box>
                                        <Box className="c-input-box">
                                            <textarea
                                                required={true}
                                                name="content"
                                                defaultValue={""}
                                                value={data.content}
                                                onChange={(e) => setData('content', e.target.value)}
                                            />
                                            <span>Type your Message...</span>
                                        </Box>
                                        <Box className="c-input-box">
                                            <input
                                                type="submit"
                                                defaultValue="Send"
                                            />
                                        </Box>
                                    </form>
                                </Box>
                            </Box>
                        </Box>
                    </section>
                </Box>
            </GuestLayout>
        </>
    );
}
