import "./styles.css";
import { Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Dashboard({
    auth,
    ...props
}) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title="Advertisement Information Page" />
            <GuestLayout auth={auth}>
                <Box className="container relative block h-screen overflow-auto bg-white py-10">
                    <Box className="relative flex h-fit w-full flex-col items-center justify-center pb-10 pl-5 pr-5 pt-5 text-start">
                        <Box className="flex h-auto w-full max-w-5xl flex-col gap-4">
                            <h1 className="p-10 pl-5 text-3xl font-bold">
                                Join Us on the Big Stage!
                            </h1>
                            <h2 className="p-10 pl-5 text-2xl">
                                Advertise Your Brand Here
                            </h2>
                            <p className="p-10 text-lg">
                                Are you ready to make a BIG impact? We invite
                                you to seize the opportunity to promote your
                                brand on our prime advertisement space. Located in a
                                high-traffic area, this advertisement offers
                                unmatched visibility and exposure for your
                                business.
                            </p>
                            <h3 className="p-10 pl-5 text-2xl">
                                Why Advertise with Us?
                            </h3>
                            <ul className="p-5 text-lg">
                                <li className="p-5 text-lg">
                                    <strong>Unrivaled Exposure:</strong> Reach
                                    thousands of potential customers daily as
                                    they pass by our strategically located
                                    advertisement.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>24/7 Visibility:</strong> Your
                                    message will be on display day and night,
                                    ensuring round-the-clock brand exposure.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>Memorable Impressions:</strong>{" "}
                                    Capture the attention of commuters,
                                    pedestrians, and travelers with a
                                    captivating message and design.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>Customized Options:</strong> We
                                    offer flexible advertising packages to suit
                                    your budget and campaign objectives.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>Proven Success:</strong> Many
                                    businesses have benefited from our advertisement
                                    advertising, generating increased brand
                                    recognition and sales.
                                </li>
                            </ul>
                            <h3 className="p-10 pl-5 text-2xl">
                                How to Get Started:
                            </h3>
                            <ol className="p-5 text-lg">
                                <li className="p-5 text-lg">
                                    <strong>Contact Us:</strong> Reach out to
                                    our advertising team to discuss your needs,
                                    campaign goals, and budget.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>Design &amp; Approval:</strong> Work
                                    with our creative team to craft an
                                    attention-grabbing advertisement design. We'll
                                    assist you in obtaining any necessary
                                    approvals.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>Placement:</strong> Your
                                    advertisement will be displayed prominently
                                    on our advertisement for the agreed-upon
                                    duration.
                                </li>
                                <li className="p-5 text-lg">
                                    <strong>Monitor &amp; Evaluate:</strong>{" "}
                                    Track the performance of your ad campaign
                                    and see the results firsthand.
                                </li>
                            </ol>
                            <p className="p-5 text-lg">
                                Your Success is Our Priority.
                            </p>
                        </Box>
                        <Box>
                            <Link
                                className="m-auto flex items-center justify-center"
                                href={route("front.contact")}
                            >
                                <button
                                    type="button"
                                    style={{
                                        backgroundColor: "#0c4c91",
                                        color: "white",
                                        width: "180px",
                                        textAlign: "center",
                                        padding: "15px 0px 15px 0px",
                                        fontSize: "14pt",
                                    }}
                                >
                                    Contact Us
                                </button>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </GuestLayout>
        </>
    );
}
