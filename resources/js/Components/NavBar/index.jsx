import { Box } from "@mui/material";
import React from "react";
import { HiTrendingUp } from "@react-icons/all-files/hi/HiTrendingUp";
import { AiFillSliders } from "@react-icons/all-files/ai/AiFillSliders";
import { ImNewspaper } from "@react-icons/all-files/im/ImNewspaper";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { AiOutlineLogout } from "@react-icons/all-files/ai/AiOutlineLogout";
import { IoIosArrowDown } from "@react-icons/all-files/io/IoIosArrowDown";
import { RiAdvertisementLine } from "@react-icons/all-files/ri/RiAdvertisementLine";
import { AiOutlineQuestion } from "@react-icons/all-files/ai/AiOutlineQuestion";
import { RiContactsBook2Line } from "@react-icons/all-files/ri/RiContactsBook2Line";
import { HiOutlineBookOpen } from "@react-icons/all-files/hi/HiOutlineBookOpen";
import { BiLogInCircle } from "@react-icons/all-files/bi/BiLogInCircle";
import { FaUserEdit } from "@react-icons/all-files/fa/FaUserEdit";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { RiDashboardLine } from "@react-icons/all-files/ri/RiDashboardLine";
import ApplicationLogo from "../ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function NavBar({ auth, ...props }) {
    return (
        <Box className="navbar bg-base-100 pr-5">
            <Box className="navbar-start">
                <Box className="dropdown">
                    <Box tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </Box>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
                        <li>
                            <Link href={route("front.trending")}>
                                <Box>
                                    <HiTrendingUp className="icons" />
                                </Box>{" "}
                                <Box className="">Trending</Box>
                            </Link>
                        </li>
                        <li>
                            <Link href={route("front.category")}>
                                <Box>
                                    <AiFillSliders className="icons" />
                                </Box>{" "}
                                <Box className="">Categories</Box>
                            </Link>
                        </li>
                        <li>
                            <Link href={route("front.news")}>
                                <Box>
                                    <ImNewspaper className="icons" />
                                </Box>{" "}
                                <Box className="">News</Box>
                            </Link>
                        </li>
                        <li>
                            <Link href={route("front.search", { queryString: "sports" })}>
                                <Box>
                                    <FaSearch className="icons" />
                                </Box>{" "}
                                <Box className="">Search</Box>
                            </Link>
                        </li>
                    </ul>
                </Box>
                <Link
                    href={route("index")}
                    className="btn btn-ghost text-center text-xl"
                >
                    <ApplicationLogo />
                </Link>
            </Box>
            <Box className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link href={route("front.trending")}>
                            <Box>
                                <HiTrendingUp className="icons" />
                            </Box>{" "}
                            <Box className="">Trending</Box>
                        </Link>
                    </li>
                    <li>
                        <Link href={route("front.category")}>
                            <Box>
                                <AiFillSliders className="icons" />
                            </Box>{" "}
                            <Box className="">Categories</Box>
                        </Link>
                    </li>
                    <li>
                        <Link href={route("front.news")}>
                            <Box>
                                <ImNewspaper className="icons" />
                            </Box>{" "}
                            <Box className="">News</Box>
                        </Link>
                    </li>
                    <li>
                        <Link href={route("front.search", { queryString: "sports" })}>
                            <Box>
                                <FaSearch className="icons" />
                            </Box>{" "}
                            <Box className="">Search</Box>
                        </Link>
                    </li>
                </ul>
            </Box>
            <Box className="navbar-end">
                <Box className="dropdown dropdown-end">
                    <Box tabIndex={0} role="button" className="avatar btn btn-circle btn-ghost">
                        <Box className="flex w-10 items-center justify-center rounded-full">
                            {auth?.user ? (<img
                                alt="user avatar"
                                src={auth.user.avatar ?? "/cover.svg"} />
                            ) : (
                                <Box className="m-auto flex flex-row items-center justify-center p-3 text-center">
                                    <IoIosArrowDown
                                        className={"icons text-3xl text-[#508cc7]"}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
                        {auth?.user ? (
                            <>
                                <li>
                                    <Link href={route("dashboard")}>
                                        <Box>
                                            <RiDashboardLine className="icons" />
                                        </Box>{" "}
                                        <Box>Dashboard</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route("post.create")}>
                                        <Box>
                                            <IoMdCreate className="icons" />
                                        </Box>{" "}
                                        <Box>Create Post</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route("logout")}>
                                        <Box>
                                            <AiOutlineLogout className="icons" />
                                        </Box>{" "}
                                        <Box>Logout</Box>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href={route("login")}>
                                        <Box>
                                            <BiLogInCircle className="icons" />
                                        </Box>{" "}
                                        <Box>Login</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route("register")}>
                                        <Box>
                                            <FaUserEdit className="icons" />
                                        </Box>{" "}
                                        <Box>Register</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex flex-row"
                                        href={route("front.advertise")}
                                    >
                                        <Box>
                                            <RiAdvertisementLine className="icons" />
                                        </Box>{" "}
                                        <Box>Advertise</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex flex-row"
                                        href={route("front.about")}
                                    >
                                        <Box>
                                            <HiOutlineBookOpen className="icons" />
                                        </Box>{" "}
                                        <Box>About</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex flex-row"
                                        href={route("front.contact")}
                                    >
                                        <Box>
                                            <RiContactsBook2Line className="icons" />
                                        </Box>{" "}
                                        <Box>Contact</Box>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex flex-row"
                                        href={route("front.faq")}
                                    >
                                        <Box>
                                            <AiOutlineQuestion className="icons" />
                                        </Box>{" "}
                                        <Box>Faq</Box>
                                    </Link>
                                </li>
                            </>)}
                    </ul>

                </Box>
            </Box >
        </Box>
    )
}