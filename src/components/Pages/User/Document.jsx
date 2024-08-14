import { useState } from "react";
import App from "./layouts/App";
import {
    UilAngleLeft,
    UilEdit,
    UilAngleRight,
    UilBookmark,
    UilTrashAlt
} from "@iconscout/react-unicons";
import { Head, Link } from "@inertiajs/inertia-react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { useTranslation } from "react-i18next";

export default function Document({ auth, logo, documents, pagination }) {
    const {
        per_page,
        currentPage,
        form,
        lastPage,
        next_page_url,
        prev_page_url,
        to,
        total
    } = pagination ?? {
        per_page: null,
        currentPage: null,
        form: null,
        lastPage: null,
        next_page_url: null,
        prev_page_url: null,
        to: null,
        total: null
    };

    const [t] = useTranslation("global");

    const deleteDocument = (id) => {
        if (window.confirm("Are you sure you want to delete this document?")) {
            axios
                .post("/user/document/delete", {
                    id: id
                })
                .then((res) => {
                    Inertia.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const bookmark = (id) => {
        // axios.post('/user/document/bookmark', {
        //     id: id
        // }).then(res => {
        //     Inertia.reload()
        // }).catch(error => {
        //     console.log(error)
        // })
    };

    return (
        <>
            <App auth={auth?.user} logo={logo}>
                <div className="">
                    <div className="2xl:flex xl:flex lg:flex md:flex sm:flex xs:block items-center justify-between xs:text-center px-5 py-8">
                        <div className=" 2xl:flex xl:flex lg:flex md:flex sm:flex xs:block justify-between w-full">
                            <h2 className=" font-medium text-3xl text-gray-700">
                                {t("My Documents")}
                            </h2>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div className="mx-5">
                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto mb-10">
                        <div className="overflow-x-auto border bg-white border-slate-100 rounded-xl">
                            <table className="w-full text-left">
                                <thead className="text-slate-700 font-normal table-bg ">
                                    <tr className=" font-medium">
                                        <td className="px-8 py-6">
                                            {t("Type")}
                                        </td>
                                        <td className="px-3 py-6">
                                            {t("Category")}
                                        </td>
                                        <td className="px-5 py-6">
                                            {t("Bookmark")}
                                        </td>
                                        <td className="pl-5 py-6 whitespace-nowrap">
                                            {t("Total Tokens")}
                                        </td>
                                        <td className="px-8 py-6">
                                            {t("Output")}
                                        </td>
                                        <td className="px-5 py-6">
                                            {t("Action")}
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents?.data?.length > 0 ? (
                                        documents.data?.map((value, index) => {
                                            if (value.type === "aiwrite") {
                                                const category = value.template;
                                                const categoryInfo = JSON.parse(
                                                    category.data
                                                );
                                                return (
                                                    <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                        <td className="px-8 py-4 text-gray-900">
                                                            <img
                                                                className=" h-10 w-10"
                                                                src={
                                                                    categoryInfo.image
                                                                }
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td className="px-3 py-4 text-gray-900">
                                                            <h5 className="font-base text-gray-500 flex items-center space-x-1">
                                                                {category.title}
                                                            </h5>
                                                        </td>
                                                        <td className="px-5 py-4 text-gray-900">
                                                            <h5
                                                                onClick={() =>
                                                                    bookmark(
                                                                        value.id
                                                                    )
                                                                }
                                                                className="font-base cursor-pointer justify-center text-gray-500 flex items-center space-x-1"
                                                            >
                                                                {value.is_bookmark ? (
                                                                    <UilBookmark className=" text-violet-500" />
                                                                ) : (
                                                                    <UilBookmark />
                                                                )}
                                                            </h5>
                                                        </td>
                                                        <td className="pl-5 py-4">
                                                            <h5 className="font-base text-base text-gray-500 flex items-center space-x-1">
                                                                {
                                                                    value.used_token
                                                                }
                                                            </h5>
                                                        </td>
                                                        <td className="px-8 py-4 text-base text-gray-500 font-normal">
                                                            {value.data === null
                                                                ? ""
                                                                : value.data.replace(
                                                                        /<[^>]+>/g,
                                                                        ""
                                                                    ).length >
                                                                    100
                                                                  ? value.data
                                                                        .replace(
                                                                            /<[^>]+>/g,
                                                                            ""
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            100
                                                                        ) +
                                                                    "..."
                                                                  : value.data.replace(
                                                                        /<[^>]+>/g,
                                                                        ""
                                                                    )}
                                                        </td>
                                                        <td className="px-5 py-4 text-gray-600 font-medium">
                                                            <div className=" flex items-center space-x-3">
                                                                <Link
                                                                    href={`/user/document/${value.slug}`}
                                                                    className="bg-green-100 border border-green-500 rounded-full text-green-600 py-2.5 px-2.5"
                                                                >
                                                                    <UilEdit
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteDocument(
                                                                            value.id
                                                                        )
                                                                    }
                                                                    className="bg-red-100 border border-red-500 rounded-full text-red-600 py-2.5 px-2.5"
                                                                >
                                                                    <UilTrashAlt
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            if (value.type === "aiCode") {
                                                return (
                                                    <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                        <td className="px-8 py-4 text-gray-900">
                                                            <img
                                                                className=" h-10 w-11"
                                                                src="/frontend/img/templates/programing.png"
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td className="px-3 py-4 text-gray-900">
                                                            <h5 className="font-base text-gray-500 flex items-center space-x-1">
                                                                {value.title}
                                                            </h5>
                                                        </td>
                                                        <td className="px-5 py-4 text-gray-900">
                                                            <h5
                                                                onClick={() =>
                                                                    bookmark(
                                                                        value.id
                                                                    )
                                                                }
                                                                className="font-base justify-center cursor-pointer text-gray-500 flex items-center space-x-1"
                                                            >
                                                                {value.is_bookmark ? (
                                                                    <UilBookmark className=" text-violet-500" />
                                                                ) : (
                                                                    <UilBookmark />
                                                                )}
                                                            </h5>
                                                        </td>
                                                        <td className="pl-5 py-4">
                                                            <h5 className="font-base text-base text-gray-500 flex items-center space-x-1">
                                                                {
                                                                    value.used_token
                                                                }
                                                            </h5>
                                                        </td>
                                                        <td className="px-8 py-4 text-base text-gray-500 font-normal">
                                                            {JSON.parse(
                                                                value.data
                                                            ).code === null
                                                                ? ""
                                                                : JSON.parse(
                                                                        value.data
                                                                    ).code
                                                                        .length >
                                                                    100
                                                                  ? JSON.parse(
                                                                        value.data
                                                                    ).code.slice(
                                                                        0,
                                                                        100
                                                                    ) + "..."
                                                                  : JSON.parse(
                                                                        value.data
                                                                    ).code}
                                                        </td>
                                                        <td className="px-5 py-4 text-gray-600 font-medium">
                                                            <div className=" flex items-center space-x-3">
                                                                <Link
                                                                    href={`/user/document/${value.slug}`}
                                                                    className="bg-green-100 border border-green-500 rounded-full text-green-600 py-2.5 px-2.5"
                                                                >
                                                                    <UilEdit
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteDocument(
                                                                            value.id
                                                                        )
                                                                    }
                                                                    className="bg-red-100 border border-red-500 rounded-full text-red-600 py-2.5 px-2.5"
                                                                >
                                                                    <UilTrashAlt
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                            if (
                                                value.type === "aiSpeechToText"
                                            ) {
                                                return (
                                                    <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                        <td className="px-8 py-4 text-gray-900">
                                                            <img
                                                                className=" h-10 w-11"
                                                                src="/frontend/img/templates/podcast.png"
                                                                alt=""
                                                            />
                                                        </td>
                                                        <td className="px-3 py-4 text-gray-900">
                                                            <h5 className="font-base text-gray-500 flex items-center space-x-1">
                                                                {value.title}
                                                            </h5>
                                                        </td>
                                                        <td className="px-5 py-4 text-gray-900">
                                                            <h5
                                                                onClick={() =>
                                                                    bookmark(
                                                                        value.id
                                                                    )
                                                                }
                                                                className="font-base cursor-pointer justify-center text-gray-500 flex items-center space-x-1"
                                                            >
                                                                {value.is_bookmark ? (
                                                                    <UilBookmark className=" text-violet-500" />
                                                                ) : (
                                                                    <UilBookmark />
                                                                )}
                                                            </h5>
                                                        </td>
                                                        <td className="pl-5 py-4">
                                                            <h5 className="font-base text-base text-gray-500 flex items-center space-x-1">
                                                                {
                                                                    value.used_token
                                                                }
                                                            </h5>
                                                        </td>
                                                        <td className="px-8 py-4 text-base text-gray-500 font-normal">
                                                            {value.data === null
                                                                ? ""
                                                                : value.data.replace(
                                                                        /<[^>]+>/g,
                                                                        ""
                                                                    ).length >
                                                                    100
                                                                  ? value.data
                                                                        .replace(
                                                                            /<[^>]+>/g,
                                                                            ""
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            100
                                                                        ) +
                                                                    "..."
                                                                  : value.data.replace(
                                                                        /<[^>]+>/g,
                                                                        ""
                                                                    )}
                                                        </td>
                                                        <td className="px-5 py-4 text-gray-600 font-medium">
                                                            <div className=" flex items-center space-x-3">
                                                                <Link
                                                                    href={`/user/document/${value.slug}`}
                                                                    className="bg-green-100 border border-green-500 rounded-full text-green-600 py-2.5 px-2.5"
                                                                >
                                                                    <UilEdit
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        deleteDocument(
                                                                            value.id
                                                                        )
                                                                    }
                                                                    className="bg-red-100 border border-red-500 rounded-full text-red-600 py-2.5 px-2.5"
                                                                >
                                                                    <UilTrashAlt
                                                                        size={
                                                                            17
                                                                        }
                                                                    />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })
                                    ) : (
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td
                                                colSpan="2"
                                                className="px-8 py-6 text-slate-400 text-center"
                                            >
                                                {t("No Data Found.")}
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    )}
                                    {total > 0 && (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-8 py-5 table-bg text-right text-sm"
                                            >
                                                <div className=" flex items-center justify-end space-x-6">
                                                    <div>
                                                        <span className=" text-gray-500 mr-1">
                                                            {t("Rows per page")}
                                                            :
                                                        </span>{" "}
                                                        <span className=" text-gray-500">
                                                            {per_page}
                                                        </span>
                                                    </div>
                                                    <div className=" text-gray-500 mr-5">
                                                        {form} - {to} {t("of")}{" "}
                                                        {total}
                                                    </div>
                                                    <div className=" flex items-center">
                                                        {currentPage > 1 ? (
                                                            <Link
                                                                href={
                                                                    "/user/documents?page=" +
                                                                    (currentPage -
                                                                        1)
                                                                }
                                                            >
                                                                <UilAngleLeft
                                                                    size={25}
                                                                    className={
                                                                        currentPage >
                                                                        1
                                                                            ? "text-gray-500"
                                                                            : "text-slate-300 pointer-events-none"
                                                                    }
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <button className="pointer-events-none">
                                                                <UilAngleLeft
                                                                    size={25}
                                                                    className={
                                                                        currentPage >
                                                                        1
                                                                            ? "text-gray-500"
                                                                            : "text-slate-300 pointer-events-none"
                                                                    }
                                                                />
                                                            </button>
                                                        )}

                                                        {to < total ? (
                                                            <Link
                                                                href={
                                                                    "/user/documents?page=" +
                                                                    (currentPage +
                                                                        1)
                                                                }
                                                            >
                                                                <UilAngleRight
                                                                    size={25}
                                                                    className={
                                                                        to <
                                                                        total
                                                                            ? "text-gray-500"
                                                                            : "text-slate-300 pointer-events-none"
                                                                    }
                                                                />
                                                            </Link>
                                                        ) : (
                                                            <button className=" pointer-events-none">
                                                                <UilAngleRight
                                                                    size={25}
                                                                    className={
                                                                        to <
                                                                        total
                                                                            ? "text-gray-500"
                                                                            : "text-slate-300 pointer-events-none"
                                                                    }
                                                                />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}
