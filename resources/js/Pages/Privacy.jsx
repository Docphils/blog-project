import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Dashboard({ auth, ...props }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title="Privacy Policy Page" />
            <GuestLayout auth={auth}>
                <Box className="container relative block h-screen overflow-auto bg-white py-10">
                    <Box className="relative flex w-full flex-row items-center justify-center bg-white">
                        <Box className="relative flex h-full min-h-screen w-full max-w-5xl flex-col items-center justify-center pb-10 pl-5 pr-5 pt-5 text-start">
                            <Box className="flex w-full flex-col gap-10">
                                <h1>
                                    Privacy Policy for Swifre - Your Blogging
                                    Platform
                                </h1>

                                <p>Effective Date: 01/01/2023</p>

                                <p>
                                    Welcome to Swifre, the ultimate platform for
                                    bloggers to express themselves and share their
                                    thoughts with the world. At Swifre, we are
                                    committed to protecting your privacy and
                                    ensuring the security of your personal
                                    information. This Privacy Policy outlines the
                                    types of information we collect, how it is used,
                                    and the choices you have regarding your data.
                                </p>

                                <h2>1. Information We Collect:</h2>

                                <p>
                                    1.1 <strong>Account Information:</strong> When
                                    you sign up for Swifre, we collect information
                                    such as your username, email address, and
                                    password.
                                </p>

                                <p>
                                    1.2 <strong>Profile Information:</strong> Users
                                    have the option to provide additional
                                    information in their profiles, such as a profile
                                    picture, bio, and other details they wish to
                                    share.
                                </p>

                                <p>
                                    1.3 <strong>Blog Posts:</strong> Any content you
                                    post on Swifre, including blogs, comments, and
                                    interactions, will be stored on our platform.
                                </p>

                                <p>
                                    1.4 <strong>Usage Data:</strong> We collect
                                    information about your interactions with Swifre,
                                    such as the pages you visit, the time and date
                                    of your visits, and your IP address.
                                </p>

                                <p>
                                    1.5 <strong>Cookies:</strong> Like many
                                    websites, we use cookies to enhance your
                                    experience on Swifre. These cookies help us
                                    personalize content, analyze site traffic, and
                                    improve our services.
                                </p>

                                <h2>2. How We Use Your Information:</h2>

                                <p>
                                    2.1 <strong>Providing Services:</strong> We use
                                    your information to operate, maintain, and
                                    improve Swifre, as well as to provide the
                                    services you request.
                                </p>

                                <p>
                                    2.2 <strong>Communication:</strong> We may use
                                    your email address to send you important
                                    updates, notifications, and newsletters related
                                    to your account and Swifre.
                                </p>

                                <p>
                                    2.3 <strong>Customization:</strong> Your
                                    information helps us tailor your experience on
                                    Swifre, providing personalized content and
                                    features.
                                </p>

                                <p>
                                    2.4 <strong>Analytics:</strong> We analyze user
                                    behavior and preferences to improve the
                                    performance and functionality of Swifre.
                                </p>

                                <h2>3. Sharing Your Information:</h2>

                                <p>
                                    3.1 <strong>Publicly Shared Content:</strong>{" "}
                                    Any content you post on Swifre is publicly
                                    accessible. Exercise caution and avoid sharing
                                    sensitive personal information.
                                </p>

                                <p>
                                    3.2 <strong>Third-Party Services:</strong> We
                                    may use third-party services to enhance Swifre.
                                    These services may have their own privacy
                                    policies, and we encourage you to review them.
                                </p>

                                <h2>4. Your Choices:</h2>

                                <p>
                                    4.1 <strong>Account Settings:</strong> You can
                                    review and update your account information and
                                    privacy settings at any time.
                                </p>

                                <p>
                                    4.2 <strong>Communication Preferences:</strong>{" "}
                                    You can choose to opt out of certain
                                    communications by adjusting your notification
                                    preferences.
                                </p>

                                <h2>5. Security:</h2>

                                <p>
                                    We take the security of your information
                                    seriously and employ industry-standard measures
                                    to protect it. However, no method of
                                    transmission over the internet or electronic
                                    storage is entirely secure, and we cannot
                                    guarantee absolute security.
                                </p>

                                <h2>6. Changes to This Privacy Policy:</h2>

                                <p>
                                    We may update this Privacy Policy from time to
                                    time. Any changes will be posted on this page,
                                    and we encourage you to review it periodically.
                                </p>

                                <h2>7. Contact Us:</h2>

                                <p>
                                    If you have any questions or concerns about this
                                    Privacy Policy, please contact us at{" "}
                                    <a href="mailto:contactus@swifre.com">
                                        contactus@swifre.com
                                    </a>
                                    .
                                </p>

                                <p>
                                    Thank you for choosing Swifre - where every
                                    voice matters!
                                </p>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </GuestLayout>
        </>
    );
}
