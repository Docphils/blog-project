import "./styles.css";
import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function About(auth, ...props) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    return (
        <>
            <Head title="About The Platform" />
            <GuestLayout auth={auth}>
                <Box className="container relative block h-screen overflow-auto bg-white py-10">
                    <Box className="about container relative flex w-full flex-col bg-white">
                        <Box className="container relative mx-auto mt-10 flex flex-col md:flex-row">
                            <Box className="imgcover container relative mx-auto flex flex-col justify-center pt-5 md:w-1/2 md:pr-7">
                                <Box className="container relative">
                                    <picture>
                                        <img
                                            className="m-auto rounded-br-3xl rounded-tl-3xl border-b-0 border-l-4 border-r-8 border-t-2 border-white"
                                            style={{
                                                borderBottomRightRadius: "30%",
                                                borderTopLeftRadius: "30%",
                                                borderBottomLeftRadius: 0,
                                                borderTopRightRadius: 0,
                                            }}
                                            src={route("index") + "/work-set-up-rustic-nalrndgxfz9figx3.webp"}
                                            alt="About Swifre"
                                        />
                                    </picture>
                                </Box>
                            </Box>
                            <Box className="container relative justify-start pb-10 pl-5 pr-5 pt-5 text-start md:w-1/2">
                                <Box className="pb-2">
                                    <h4
                                        style={{ fontFamily: "philosopherbold" }}
                                        className="icons p-5 text-center text-3xl font-bold"
                                    >
                                        About Swifre.com
                                    </h4>
                                    <h1 className="text-bold font-weight-bolder text-center text-2xl md:text-start">
                                        A blogging platform for every and anyone
                                    </h1>
                                </Box>
                                <Box>
                                    <p className="text-bold pb-2 text-center md:text-start">
                                        {" "}
                                        We believe, there's room for every voice and
                                        every story. That's why we are providing a
                                        blogging platform that's accessible and
                                        welcoming to all, regardless of your
                                        background, expertise, or interests. <br />{" "}
                                        At swifre.com, our goal is simply to empower
                                        individuals from all walks of life through
                                        this platform to share their unique
                                        perspectives and passions with the world.
                                    </p>
                                </Box>
                                <Box className="text-center md:text-start">
                                    <Link href={route("front.contact")}>
                                        <button type="button">contact us</button>
                                    </Link>
                                </Box>
                            </Box>
                        </Box>
                        <Box className="container relative p-10">
                            {" "}
                            <Box className="pb-2">
                                <h4
                                    style={{ fontFamily: "philosopherbold" }}
                                    className="icons p-5 text-center text-3xl font-bold"
                                >
                                    Our Mission
                                </h4>
                                <h1 className="font-weight-bolder text-center text-2xl">
                                    Swifre.com: Empower, Inform, Inspire
                                </h1>
                            </Box>
                            <p className="text-bold pb-2 text-center md:text-start">
                                {" "}
                                Swifre.com, Aspires to be to be a platform that
                                gives you useful information, makes you feel
                                inspired, entertains you, and helps you connect with
                                others. Our main goal is to share valuable knowledge
                                on many topics and create a friendly online
                                community where people from all backgrounds can
                                chat, share, and learn.
                                <br />
                                We also want to entertain you with fun content and
                                motivate you to grow and achieve your goals. Our
                                blog will tell personal stories of overcoming
                                challenges and show how life can be beautiful.
                                <br />
                                We understand that our blog can be a strong tool for
                                supporting important causes and making our society
                                better. We promise to use our platform for these
                                good purposes.
                                <br />
                                We'll also talk about businesses and brands in a
                                friendly way, without being pushy. We'll fund our
                                content by being ethical, like using ads, sponsored
                                content, and affiliate marketing.
                                <br />
                                In the long run, we want to become experts in our
                                chosen topics, so our readers and peers trust us.
                                Swifre.com aims to be a friendly platform that meets
                                your different needs and interests while always
                                trying to get better, stay real, and build a
                                community.
                                <br />
                            </p>
                        </Box>
                        <Box className="container relative">
                            <Box className="pb-2">
                                <h4
                                    style={{ fontFamily: "philosopherbold" }}
                                    className="icons p-5 text-center text-3xl font-bold"
                                >
                                    Featuring
                                </h4>
                                <h1 className="font-weight-bolder text-center text-2xl">
                                    Discover our blog's different features, like
                                    inspiring stories and fun quizzes etc. Come join us
                                    for an interesting blogging experience!
                                </h1>
                            </Box>
                            <Box className="right-section">
                                <Box className="right-info">
                                    <h2 style={{ fontFamily: "philosopherbold" }}>
                                        News
                                    </h2>
                                    <p className="rtext-start text-bold pb-2">
                                        {" "}
                                        Your news matters to us and we want you to share it, with the world through this platform <br />
                                        We hope you find valid information about whats happening around you.
                                    </p>
                                    {/* <Link href={route("front.contact")}>
                                    contact us
                                </Link>{" "} */}
                                </Box>
                                <Box className="right-image">
                                    <img
                                        src={route("index") + "/vintage-newspaper-0oqyne7rq39k6gzs.webp"}
                                        width="808"
                                        height="458"
                                    />
                                </Box>
                            </Box>
                            <Box className="left-section">
                                <Box className="left-image">
                                    <img
                                        src={route("index") + "/consultant-presenting-his-work-0bb0flkn9zvgvg9v.webp"}
                                        width="951"
                                        height="471"
                                    />
                                </Box>
                                <Box className="left-info">
                                    <h2 style={{ fontFamily: "philosopherbold" }}>
                                        Jobs
                                    </h2>
                                    <p className="text-bold pb-2 text-start">
                                        {" "}
                                        Search for Jobs here, Post your Jobs here etc.
                                    </p>
                                    {/* <Link href={route("front.contact")}>
                                    contact us
                                </Link> */}
                                </Box>
                            </Box>
                            <Box className="right-section">
                                <Box className="right-info">
                                    <h2 style={{ fontFamily: "philosopherbold" }}>
                                        Education
                                    </h2>
                                    <p className="text-bold pb-2 text-start">
                                        {" "}
                                        Find write up, contents and information usefull for learning,
                                        Post Educational Information here.
                                    </p>
                                    {/* <Link href={route("front.contact")}>
                                    contact us
                                </Link> */}
                                </Box>
                                <Box className="right-image">
                                    <img
                                        src={route("index") + "/educational-science-books-sxe9wj38f6ugflr8.webp"}
                                        width="808"
                                        height="458"
                                    />
                                </Box>
                            </Box>
                            <Box className="left-section">
                                <Box className="left-image">
                                    <img
                                        src={route("index") + "/vadivelu-with-indian-dancers-9bna11we6i8hl0si.webp"}
                                        width="951"
                                        height="471"
                                    />
                                </Box>
                                <Box className="left-info">
                                    <h2 style={{ fontFamily: "philosopherbold" }}>
                                        Entertainment
                                    </h2>
                                    <p className="text-bold pb-2 text-start">
                                        {" "}
                                        Discover a wide range of entertainment options, from music and art to videos, movies, and the world of celebrities, all available on our platform. Explore diverse cultural experiences and indulge your interests in one place.
                                    </p>
                                    {/* <Link href={route("front.contact")}>
                                    contact us
                                </Link> */}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </GuestLayout>
        </>
    );
}
