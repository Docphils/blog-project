import SelectCheckbox from "../SelectCheckbox";
import useIsomorphicLayoutEffect from "@/Hooks/useIsomorphicLayoutEffect";
import "./styles.css";
import { Box } from "@mui/material";
import { BsSearch } from "@react-icons/all-files/bs/BsSearch";
import { BiShow } from "@react-icons/all-files/bi/BiShow";
import { AiTwotoneEdit } from "@react-icons/all-files/ai/AiTwotoneEdit";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { BiReset } from "@react-icons/all-files/bi/BiReset";
import React, { useRef, useState, useEffect } from "react";
import draftToHtml from "draftjs-to-html";
import { convert } from "html-to-text";
import { uniqBy } from "lodash";
import { Link } from "@inertiajs/react";

export default function CustomAdminTable({
    auth,
    headings = [
        {
            value: "firstName",
            label: "Firstname",
            headings: []
        },
        {
            value: "lastName",
            label: "Lastname",
            headings: []
        },
        {
            value: "email",
            label: "Email",
            headings: []
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
    const [activeModal, setActiveModal] = useState();

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
        <Box className="w-full flex flex-col overflow-auto">
            <Box className="min-w-[764px] w-full mx-auto sm:px-6 lg:px-8 min-h-[50vh] lg:min-h-[70vh]">
                <Box className="w-full flex flex-col">
                    <Box className="mb-4  mt-4">
                        <h1 className="text-3xl font-bolder text-center leading-tight text-gray-900">
                            {title}
                        </h1>
                    </Box>

                    <Box className="-mb-2 py-4 flex flex-row w-full flex-nowrap justify-between">
                        <Box className="flex justify-start py-2">
                            <Box className="flex flex-row items-center py-2 pr-4">
                                <input
                                    className="bg-white-200 tableinputtag appearance-none border-2 border-gray-200 rounded div10-8 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="inline-searcg"
                                    type="text"
                                    onChange={(e) => handleSeachFilter(e)}
                                    placeholder="Search"
                                />
                                <button
                                    className="tablesubmitbutton bg-white-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 div10-2"
                                    type="submit"
                                >
                                    <BsSearch className="icons" />
                                </button>
                            </Box>
                            <Box className="flex flex-row items-center py-2 pr-4">
                                <input
                                    className="bg-white-200 tableinputtag appearance-none border-2 border-gray-200 rounded div10-8 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="filter-date"
                                    type="date"
                                    onChange={(e) => handleDateFilter(e)}
                                    placeholder="Date"
                                />
                                <button
                                    className="tablesubmitbutton bg-white-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 div10-2"
                                    type="submit"
                                >
                                    <BsSearch className="icons" />
                                </button>
                            </Box>
                            <Box className="flex flex-row items-center py-2">
                                <button
                                    className="tablesubmitbutton bg-white-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="button"
                                    onClick={(e) =>
                                        setDatainuse((datainuse) => data)
                                    }
                                >
                                    <BiReset className="icons" />
                                </button>
                            </Box>
                        </Box>
                        <Box className="flex tableAddNewEntry justify-self-end items-center py-2">
                            <Link
                                href={route(addNewEntryURLName)}
                                className="inline-block min-w-fit link px-5 py-3 whitespace-nowrap border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-950 hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                            >
                                New Entry
                            </Link>
                        </Box>
                    </Box>

                    <Box className="-my-2 py-2 flex flex-col w-full h-full">
                        <Box className="flex flex-col w-full border-b border-gray-200">
                            <Box className="flex flex-row w-full border-b border-gray-200 bg-white flex-grow leading-4 tracking-wider text-base text-gray-900">
                                <Box className="w-6/12 flex-grow max-md:w-0 px-6 py-5 text-left"></Box>
                                <Box className="md:w-6/12 max-md:w-full px-6 py-5 text-left z-10">
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
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
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
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <input
                                                    className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                    type="checkbox"
                                                />
                                            </td>
                                            {selectedRows.map(
                                                (selectedRow, index) => (
                                                    <td
                                                        key={index}
                                                        className="px-6 py-4  whitespace-no-wrap  border-gray-200"
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
                                                                convert(
                                                                    draftToHtml(
                                                                        JSON.parse(
                                                                            datas[
                                                                            selectedRow
                                                                                .value
                                                                            ]
                                                                        )
                                                                    ),
                                                                    {
                                                                        selectors:
                                                                            [
                                                                                {
                                                                                    selector:
                                                                                        "a",
                                                                                    options:
                                                                                    {
                                                                                        baseUrl:
                                                                                            route(
                                                                                                "index"
                                                                                            ),
                                                                                    },
                                                                                },
                                                                                {
                                                                                    selector:
                                                                                        "a.button",
                                                                                    format: "skip",
                                                                                },
                                                                            ],
                                                                    }
                                                                ).slice(
                                                                    0,
                                                                    120
                                                                ) +
                                                                (convert(
                                                                    draftToHtml(
                                                                        JSON.parse(
                                                                            datas[
                                                                            selectedRow
                                                                                .value
                                                                            ]
                                                                        )
                                                                    ),
                                                                    {
                                                                        selectors:
                                                                            [
                                                                                {
                                                                                    selector:
                                                                                        "a",
                                                                                    options:
                                                                                    {
                                                                                        baseUrl:
                                                                                            route(
                                                                                                "index"
                                                                                            ),
                                                                                    },
                                                                                },
                                                                                {
                                                                                    selector:
                                                                                        "a.button",
                                                                                    format: "skip",
                                                                                },
                                                                            ],
                                                                    }
                                                                ).length > 120
                                                                    ? "..."
                                                                    : "")
                                                            ) : isImage(
                                                                datas[
                                                                selectedRow
                                                                    .value
                                                                ]
                                                            ) ? (
                                                                <object
                                                                    className="rounded-md w-[100px] h-[100px]"
                                                                    data={
                                                                        datas[
                                                                        selectedRow
                                                                            .value
                                                                        ]
                                                                    }
                                                                />
                                                            ) : (
                                                                Array.isArray(datas[
                                                                    selectedRow
                                                                        .value
                                                                ]) ?
                                                                    (<Box className="relative flex w-[100px]">
                                                                        <Box id={selectedRow.label + "_" + index} onClick={() => { setActiveModal(selectedRow.label + "_" + index) }}>{"show" + " " + selectedRow.label}</Box>
                                                                        <Box id={selectedRow.label + "_" + index} className={`absolute flex flex-col h-fit w-fit p- max-md:w-full z-50 ${activeModal === selectedRow.label + "_" + index ? "block" : "hidden"}`}>
                                                                            <Box className="flex" onClick={() => setActiveModal(undefined)}>close</Box>
                                                                            <Box className="flex flex-col">
                                                                                <CustomAdminTable
                                                                                    headings={selectedRow.headings}
                                                                                    data={datas[
                                                                                        selectedRow
                                                                                            .value
                                                                                    ]}
                                                                                    title={selectedRow.label + "s"}
                                                                                />
                                                                            </Box>
                                                                        </Box>
                                                                    </Box>)
                                                                    : datas[
                                                                    selectedRow
                                                                        .value
                                                                    ]

                                                            )}
                                                        </Box>
                                                    </td>
                                                )
                                            )}
                                            <td className="px-6 flex flex-col items-center m-auto justify-center py-4 whitespace-no-wrap text-center border-gray-200 text-sm leading-5 font-medium">
                                                <Box className="flex flex-col justify-center items-center flex-grow">
                                                    <Box className="flex flex-row">
                                                        {singleItemDisplayPrefixURLName && (<Link
                                                            title="click to view item"
                                                            href={
                                                                route(singleItemDisplayPrefixURLName, {
                                                                    id:
                                                                        datas["id"]
                                                                })
                                                            }
                                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline mr-2"
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
                                                                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline mr-2"
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
                                                                                className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline"
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
