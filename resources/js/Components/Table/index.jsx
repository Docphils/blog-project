import SelectCheckbox from "../SelectCheckbox";
import useIsomorphicLayoutEffect from "@/Hooks/useIsomorphicLayoutEffect";
import "./styles.css";
import { Box } from "@mui/material";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BiShow } from "@react-icons/all-files/bi/BiShow";
import { AiTwotoneEdit } from "@react-icons/all-files/ai/AiTwotoneEdit";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { BiReset } from "@react-icons/all-files/bi/BiReset";
import React, { useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { convert } from "html-to-text";
import { uniqBy } from "lodash";
import { Link } from "@inertiajs/react";

export default function Table({
    auth,
    headings = [
        {
            value: "firstName",
            label: "Firstname",
        },
        {
            value: "lastName",
            label: "Lastname",
        },
        {
            value: "email",
            label: "Email",
        },
    ],
    data = [
        {
            firstName: "Ukweh",
            lastName: "Everest",
            email: "ukweheverest@github.com",
        },
    ],
    title = "List of Users",
    searchURLName,
    filterDateURLName,
    singleItemDisplayPrefixURLName,
    singleItemEditPrefixURLName,
    singleItemDeletePrefixURLName,
    addNewEntryURLName,
    ...props
}) {
    const [datainuse, setDatainuse] = useState(data);
    const [selectedRows, setSelectedRows] = useState(headings.slice(0, 5));

    const handleSeachFilter = (e) => {
        e.preventDefault();
        if (e.target.value !== "" || e.target.value !== null) {
            const SearchData = [];
            for (const item of datainuse) {
                const search = new RegExp(
                    e.target.value.trim().toLowerCase(),
                    "i"
                );
                for (const x of headings) {
                    const searchelement =
                        item[x.value] !== null
                            ? item[x.value].toLowerCase()
                            : null;
                    if (searchelement !== null) {
                        if (search.test(searchelement)) {
                            const dothesearch = datainuse.find(
                                (y, index) => y[x.value] === searchelement
                            );
                            if (dothesearch !== undefined) {
                                SearchData.push(dothesearch);
                            }
                        }
                    }
                }
            }
            const SearchDatafinal =
                SearchData.length >= 1 ? SearchData : datainuse;
            setDatainuse((datainuse) => [...uniqBy(SearchDatafinal, "id")]);
        } else {
            setDatainuse((datainuse) => datainuse);
        }
    };

    const handleDateFilter = (e) => {
        e.preventDefault();
        if (e.target.value !== "" || e.target.value !== null) {
            const SearchData = [];
            for (const item of datainuse) {
                const search = new RegExp(
                    e.target.value.trim().toLowerCase(),
                    "i"
                );
                for (const x of [
                    { value: created_at },
                    { value: updated_at },
                ]) {
                    const searchelement =
                        item[x.value] !== null
                            ? item[x.value].toLowerCase()
                            : null;
                    if (searchelement !== null) {
                        if (search.test(searchelement)) {
                            const dothesearch = datainuse.find(
                                (y, index) => y[x.value] === searchelement
                            );
                            if (dothesearch !== undefined) {
                                SearchData.push(dothesearch);
                            }
                        }
                    }
                }
            }
            const SearchDatafinal =
                SearchData.length >= 1 ? SearchData : datainuse;
            setDatainuse((datainuse) => [...uniqBy(SearchDatafinal, "id")]);
        } else {
            setDatainuse((datainuse) => datainuse);
        }
    };

    useEffect(() => {
        const first5 = headings.slice(0, 5);
        setSelectedRows((selectedRows) => first5);
    }, []);

    useIsomorphicLayoutEffect(() => {
        setSelectedRows((selectedRows) => selectedRows);
    }, [selectedRows]);

    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|bmp|gif|svg)$/.test(url);
    }

    return (
        <Box className="flex min-h-full w-full flex-col justify-start overflow-auto">
            <Box className="mx-auto min-h-[50vh] w-full min-w-[764px] sm:px-6 lg:min-h-[70vh] lg:px-8">
                <Box className="flex w-full flex-col">
                    <Box className="mb-4 mt-4">
                        <h1 className="font-bolder text-center text-3xl leading-tight text-gray-900">
                            {title}
                        </h1>
                    </Box>

                    <Box className="-mb-2 flex w-full flex-row flex-nowrap justify-between py-4">
                        <Box className="flex justify-start py-2">
                            <Box className="flex flex-row items-center py-2 pr-4">
                                <input
                                    className="bg-white-200 tableinputtag div10-8 appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                                    id="inline-searcg"
                                    type="text"
                                    onChange={(e) => handleSeachFilter(e)}
                                    placeholder="Search"
                                />
                                <button
                                    className="tablesubmitbutton bg-white-200 div10-2 appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                                    type="submit"
                                >
                                    <BsSearch className="icons" />
                                </button>
                            </Box>
                            <Box className="flex flex-row items-center py-2 pr-4">
                                <input
                                    className="bg-white-200 tableinputtag div10-8 appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                                    id="filter-date"
                                    type="date"
                                    onChange={(e) => handleDateFilter(e)}
                                    placeholder="Date"
                                />
                                <button
                                    className="tablesubmitbutton bg-white-200 div10-2 appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                                    type="submit"
                                >
                                    <BsSearch className="icons" />
                                </button>
                            </Box>
                            <Box className="flex flex-row items-center py-2">
                                <button
                                    className="tablesubmitbutton bg-white-200 appearance-none rounded border-2 border-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                                    type="button"
                                    onClick={(e) =>
                                        setDatainuse((datainuse) => data)
                                    }
                                >
                                    <BiReset className="icons" />
                                </button>
                            </Box>
                        </Box>
                        <Box className="tableAddNewEntry flex items-center justify-self-end py-2">
                            <Link
                                href={route(addNewEntryURLName)}
                                className="focus:shadow-outline link inline-block min-w-fit whitespace-nowrap rounded-md border border-transparent bg-blue-950 px-5 py-3 text-sm font-medium leading-5 text-white hover:bg-indigo-500 focus:outline-none"
                            >
                                New Entry
                            </Link>
                        </Box>
                    </Box>

                    <Box className="-my-2 flex h-full w-full flex-col py-2">
                        <Box className="flex w-full flex-col border-b border-gray-200">
                            <Box className="flex w-full flex-grow flex-row border-b border-gray-200 bg-white text-base leading-4 tracking-wider text-gray-900">
                                <Box className="w-6/12 flex-grow px-6 py-5 text-left max-md:w-0"></Box>
                                <Box className="z-10 px-6 py-5 text-left max-md:w-full md:w-6/12">
                                    <SelectCheckbox
                                        className="w-full rounded"
                                        selectedRows={selectedRows}
                                        setSelectedRows={setSelectedRows}
                                        optionData={headings}
                                    />
                                </Box>
                            </Box>

                            <table className="w-full">
                                {/* HEAD start */}
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 text-xs uppercase leading-4 tracking-wider text-gray-500">
                                        <th className="px-6 py-3 text-left font-medium">
                                            <input
                                                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                type="checkbox"
                                            />
                                        </th>
                                        {selectedRows.map(
                                            (selectedRow, index) => (
                                                <th
                                                    key={index}
                                                    className="px-6 py-3 text-left font-medium"
                                                >
                                                    {selectedRow.label}
                                                </th>
                                            )
                                        )}
                                        <th className="px-6 py-3 text-left font-medium"></th>
                                    </tr>
                                </thead>

                                {/* HEAD end */}
                                {/* BODY start */}
                                <tbody className="bg-white">
                                    {datainuse.map((datas, index) => (
                                        <tr key={index}>
                                            <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                                                <input
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    type="checkbox"
                                                />
                                            </td>
                                            {selectedRows.map(
                                                (selectedRow, index) => (
                                                    <td
                                                        key={index}
                                                        className="whitespace-no-wrap border-gray-200 px-6 py-4"
                                                    >
                                                        <Box
                                                            className={
                                                                selectedRow.value ===
                                                                    "content"
                                                                    ? "text-sm leading-5 text-gray-900 w-[180px]"
                                                                    : "text-sm leading-5 text-gray-900"
                                                            }
                                                        >
                                                            {selectedRow.value ===
                                                                "content" ? (
                                                                <EditorTextParser data={props.page_data?.content} />
                                                            ) : isImage(
                                                                datas[
                                                                selectedRow
                                                                    .value
                                                                ]
                                                            ) ? (
                                                                <object
                                                                    className="h-[100px] w-[100px] rounded-md"
                                                                    data={
                                                                        datas[
                                                                        selectedRow
                                                                            .value
                                                                        ]
                                                                    }
                                                                />
                                                            ) : (
                                                                datas[
                                                                selectedRow
                                                                    .value
                                                                ]
                                                            )}
                                                        </Box>
                                                    </td>
                                                )
                                            )}
                                            <td className="whitespace-no-wrap m-auto flex flex-col items-center justify-center border-gray-200 px-6 py-4 text-center text-sm font-medium leading-5">
                                                <Box className="flex flex-grow flex-col items-center justify-center">
                                                    <Box className="flex flex-row">
                                                        {singleItemDisplayPrefixURLName && (<Link
                                                            title="click to view item"
                                                            href={
                                                                route(singleItemDisplayPrefixURLName, {
                                                                    id:
                                                                        datas["id"]
                                                                })
                                                            }
                                                            className="mr-2 text-indigo-600 hover:text-indigo-900 focus:underline focus:outline-none"
                                                        >
                                                            <BiShow />
                                                        </Link>)}<>
                                                            {datas.userId ===
                                                                auth.user.id && (
                                                                    <>
                                                                        {singleItemEditPrefixURLName && (<Link
                                                                            title="click to edit item"
                                                                            href={
                                                                                route(singleItemEditPrefixURLName, {
                                                                                    id:
                                                                                        datas["id"]
                                                                                })
                                                                            }
                                                                            className="mr-2 text-indigo-600 hover:text-indigo-900 focus:underline focus:outline-none"
                                                                        >
                                                                            <AiTwotoneEdit />
                                                                        </Link>)}
                                                                    </>
                                                                )}
                                                            {datas.userId ===
                                                                auth.user.id && (
                                                                    <>
                                                                        {singleItemDeletePrefixURLName && (
                                                                            <Link
                                                                                title="click to delete item"
                                                                                href={
                                                                                    route(singleItemDeletePrefixURLName, {
                                                                                        id:
                                                                                            datas["id"]
                                                                                    })
                                                                                }
                                                                                className="text-indigo-600 hover:text-indigo-900 focus:underline focus:outline-none"
                                                                            >
                                                                                <AiFillDelete />
                                                                            </Link>)
                                                                        }
                                                                    </>
                                                                )}
                                                        </>
                                                    </Box></Box>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                {/* BODY end */}
                            </table>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
