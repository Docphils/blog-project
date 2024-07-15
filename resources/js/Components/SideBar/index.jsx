import React, { useState } from "react";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { AiFillSliders } from "@react-icons/all-files/ai/AiFillSliders";
import { VscNote } from "@react-icons/all-files/vsc/VscNote";
import { FaBlog } from "@react-icons/all-files/fa/FaBlog";
import { FaImages } from "@react-icons/all-files/fa/FaImages";
import { ImReply } from "@react-icons/all-files/im/ImReply";
import { FaUsers } from "@react-icons/all-files/fa/FaUsers";
import { CgProfile } from "@react-icons/all-files/cg/CgProfile";
import { GoSearch } from "@react-icons/all-files/go/GoSearch";
import { IoMdCreate } from "@react-icons/all-files/io/IoMdCreate";
import { AiOutlineUnorderedList } from "@react-icons/all-files/ai/AiOutlineUnorderedList";
import { RiDashboardLine } from "@react-icons/all-files/ri/RiDashboardLine";
import { Link } from "@inertiajs/react";
import { Box, Button, Drawer } from "@mui/material";
import LastPageIcon from '@mui/icons-material/LastPage';

export default function SideBar({ auth,
    ...props
}) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const [dropdown0, setDropdrown0] = useState(false);
    const [dropdown1, setDropdrown1] = useState(false);
    const [dropdown2, setDropdrown2] = useState(false);
    const [dropdown3, setDropdrown3] = useState(false);
    const [dropdown4, setDropdrown4] = useState(false);
    const [dropdown5, setDropdrown5] = useState(false);
    const [dropdown6, setDropdrown6] = useState(false);
    const [dropdown7, setDropdrown7] = useState(false);
    const [dropdown8, setDropdrown8] = useState(false);
    const [dropdown9, setDropdrown9] = useState(false);
    const [dropdown10, setDropdrown10] = useState(false);
    const [dropdown11, setDropdrown11] = useState(false);
    const [dropdown12, setDropdrown12] = useState(false);
    const [dropdown13, setDropdrown13] = useState(false);
    const [dropdown14, setDropdrown14] = useState(false);
    const [dropdown15, setDropdrown15] = useState(false);

    function handleEvent0() {
        setDropdrown0(!dropdown0);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent1() {
        setDropdrown0(false);
        setDropdrown1(!dropdown1);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent2() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(!dropdown2);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent3() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(!dropdown3);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent4() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(!dropdown4);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent5() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(!dropdown5);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent6() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(!dropdown6);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent7() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(!dropdown7);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent8() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(!dropdown8);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent9() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(!dropdown9);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent10() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(!dropdown10);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent11() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(!dropdown11);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent12() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(!dropdown12);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent13() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(!dropdown13);
        setDropdrown14(false);
        setDropdrown15(false);
    }

    function handleEvent14() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(!dropdown14);
        setDropdrown15(false);
    }

    function handleEvent15() {
        setDropdrown0(false);
        setDropdrown1(false);
        setDropdrown2(false);
        setDropdrown3(false);
        setDropdrown4(false);
        setDropdrown5(false);
        setDropdrown6(false);
        setDropdrown7(false);
        setDropdrown8(false);
        setDropdrown9(false);
        setDropdrown10(false);
        setDropdrown11(false);
        setDropdrown12(false);
        setDropdrown13(false);
        setDropdrown14(false);
        setDropdrown15(!dropdown15);
    }

    return (
        <div>
            <Button className="h-screen w-1 overflow-auto" onClick={toggleDrawer(true)}><LastPageIcon /></Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <List
                    className="w-72 py-10"
                    sx={{ maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            <Box className="">
                                <picture>
                                    <source srcSet={auth.user.avatar ?? "/cover.svg"} />
                                    <img src={auth.user.avatar} alt="avatar" height="80px" />
                                </picture>
                            </Box>
                            <Box className="w-full text-center">
                                Hi {auth.user.lastName + " " + auth.user.firstName}
                            </Box>
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
                        <Link className="flex flex-row items-center justify-center text-inherit" href={route("dashboard")}>
                            <ListItemIcon>
                                <RiDashboardLine className="icons cursor-pointer hover:scale-[1.05]" />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </Link>
                    </ListItemButton>
                    <ListItemButton onClick={handleEvent1}>
                        <ListItemIcon>
                            <FaBlog className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                        {dropdown1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("post.create")}>
                                    <ListItemIcon>
                                        <IoMdCreate className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Post" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("post.index")}>
                                    <ListItemIcon>
                                        <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary=" All Posts" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("post.search")}>
                                    <ListItemIcon>
                                        <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Posts" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleEvent2}>
                        <ListItemIcon>
                            <AiFillSliders className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Categories" />
                        {dropdown2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("category.create")}>
                                    <ListItemIcon>
                                        <IoMdCreate className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Category" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("category.index")}>
                                    <ListItemIcon>
                                        <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary=" All categories" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("category.search")}>
                                    <ListItemIcon>
                                        <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Categories" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleEvent3}>
                        <ListItemIcon>
                            <AiFillSliders className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Sub-Categories" />
                        {dropdown3 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown3} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("subcategory.create")}>
                                    <ListItemIcon>
                                        <IoMdCreate className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Create Subcategory" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("subcategory.index")}>
                                    <ListItemIcon>
                                        <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary=" All Subcategories" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("subcategory.search")}>
                                    <ListItemIcon>
                                        <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Subcategories" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>






                    <ListItemButton onClick={handleEvent4}>
                        <ListItemIcon>
                            <VscNote className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Comments" />
                        {dropdown4 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown4} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("comment.me")}>
                                    <ListItemIcon>
                                        <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary=" All Comments" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("comment.search")}>
                                    <ListItemIcon>
                                        <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Comments" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleEvent6}>
                        <ListItemIcon>
                            <ImReply className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Replies" />
                        {dropdown6 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown6} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("reply.me")}>
                                    <ListItemIcon>
                                        <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary=" All Replies" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("reply.search")}>
                                    <ListItemIcon>
                                        <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Replies" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>




                    <ListItemButton onClick={handleEvent5}>
                        <ListItemIcon>
                            <FaImages className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Files" />
                        {dropdown5 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown5} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("file.create")}>
                                    <ListItemIcon>
                                        <IoMdCreate className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Upload file" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("file.me")}>
                                    <ListItemIcon>
                                        <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="All Files" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("file.search")}>
                                    <ListItemIcon>
                                        <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Files" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleEvent9}>
                        <ListItemIcon>
                            <CgProfile className="icons cursor-pointer hover:scale-[1.05]" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                        {dropdown9 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={dropdown9} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("user.show", {
                                    id: auth.user.id
                                })}>
                                    <ListItemIcon>
                                        <CgProfile className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary="My Profile" />
                                </Link>
                            </ListItemButton>
                            <ListItemButton sx={{ pl: 4 }}>
                                <Link className="flex flex-row items-center justify-center" href={route("user.edit", {
                                    id: auth.user?.id
                                })}>
                                    <ListItemIcon>
                                        <IoMdCreate className="icons cursor-pointer hover:scale-[1.05]" />
                                    </ListItemIcon>
                                    <ListItemText primary=" Edith Profile" />
                                </Link>
                            </ListItemButton>
                        </List>
                    </Collapse>
                    {auth.user.type === "Admin" && <>
                        <ListItemButton onClick={handleEvent8}>
                            <ListItemIcon>
                                <FaUsers className="icons cursor-pointer hover:scale-[1.05]" />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                            {dropdown8 ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={dropdown8} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <Link className="flex flex-row items-center justify-center" href={route("user.index")}>
                                        <ListItemIcon>
                                            <AiOutlineUnorderedList className="icons cursor-pointer hover:scale-[1.05]" />
                                        </ListItemIcon>
                                        <ListItemText primary="All Users" />
                                    </Link>
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <Link className="flex flex-row items-center justify-center" href={route("user.search")}>
                                        <ListItemIcon>
                                            <GoSearch className="icons cursor-pointer hover:scale-[1.05]" />
                                        </ListItemIcon>
                                        <ListItemText primary="Search Users" />
                                    </Link>
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </>}



                </List>
            </Drawer>
        </div>
    )
}