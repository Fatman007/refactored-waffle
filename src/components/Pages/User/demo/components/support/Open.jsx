import { Link } from "@inertiajs/inertia-react";
import {
    UilCheckCircle,
    UilAngleLeft,
    UilAngleRight,
    UilBullseye,
    UilEye,
    UilTrashAlt,
    UilTimesCircle
} from "@iconscout/react-unicons";
import moment from "moment";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Open({ openSupports, pagination }) {
    const {
        per_page,
        currentPage,
        form,
        lastPage,
        next_page_url,
        prev_page_url,
        to,
        total
    } = pagination;
    const [status, setStatus] = useState(false);

    const { t } = useTranslation("global");

    return (
        <>
            <div className="mt-5 mx-5">
                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                    <div className="overflow-x-auto border bg-white border-slate-100 rounded-xl">
                        <table className="w-full text-left">
                            <thead className="text-slate-700 font-normal table-bg">
                                <tr className=" font-medium">
                                    <td className="px-8 py-5">
                                        {t("Ticket No")}
                                    </td>
                                    <td className="px-8 py-5">{t("Title")}</td>
                                    <td className="px-8 py-5">{t("Status")}</td>
                                    <td className="px-8 py-5">
                                        {t("Created At")}
                                    </td>
                                    <td className="px-8 py-5">{t("Action")}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {openSupports.length > 0 ? (
                                    openSupports.map((value, index) => (
                                        <tr
                                            key={index}
                                            className="bg-white border-b border-slate-50 last:border-none hover:bg-gray-50"
                                        >
                                            <td className="px-8 py-4 text-gray-900 whitespace-nowrap">
                                                <h5 className="font-medium text-sm text-gray-600 flex items-center space-x-1">
                                                    <Link
                                                        href={`/user/support/view/${value.id}`}
                                                        className="font-mono"
                                                    >
                                                        {value.ticket_no}
                                                    </Link>
                                                </h5>
                                            </td>
                                            <td className="px-8 py-4 text-gray-900 whitespace-nowrap">
                                                <h5 className="font-medium text-sm text-gray-600 flex items-center space-x-1">
                                                    <Link
                                                        href="/"
                                                        className="font-mono"
                                                    >
                                                        {value.title}
                                                    </Link>
                                                </h5>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="bg-slate-200 px-5 py-2 rounded-full text-xs font-medium text-slate-700 inline-block">
                                                    <div className="flex items-center">
                                                        {value.status ===
                                                        "open" ? (
                                                            <>
                                                                <UilBullseye
                                                                    className="inline-block mr-1"
                                                                    size={16}
                                                                />
                                                                <div className="">
                                                                    {t("Open")}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <UilTimesCircle
                                                                    className="inline-block mr-1"
                                                                    size={16}
                                                                />
                                                                <div className="">
                                                                    {t(
                                                                        "Closed"
                                                                    )}
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </span>
                                            </td>
                                            <td className="px-8 py-4 text-sm text-gray-600 font-medium font-mono">
                                                {moment(
                                                    value.created_at
                                                ).fromNow()}
                                            </td>
                                            <td className="px-8 py-4 text-sm text-gray-600 font-medium">
                                                <div className="flex items-center">
                                                    <Link
                                                        href={`/user/support/view/${value.id}`}
                                                        className="mr-5 bg-green-100 border border-green-500 rounded text-green-600 py-2 px-2"
                                                    >
                                                        <UilEye size={17} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td
                                            colSpan="2"
                                            className="px-8 py-6 text-slate-400"
                                        >
                                            {t("No Data Found.")}
                                        </td>
                                        <td></td>
                                    </tr>
                                )}
                                {total > 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-8 py-4 text-right text-sm"
                                        >
                                            <span className=" text-gray-500 mr-1">
                                                {t("Rows per page")}:
                                            </span>{" "}
                                            <span className=" text-gray-500">
                                                {per_page}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-sm flex items-center">
                                            <div className=" text-gray-500 mr-5">
                                                {form} - {to} {t("of")} {total}
                                            </div>
                                            <div className=" flex items-center">
                                                {currentPage > 1 ? (
                                                    <Link
                                                        href={
                                                            "/user/support?page=" +
                                                            (currentPage - 1)
                                                        }
                                                    >
                                                        <UilAngleLeft
                                                            size={25}
                                                            className={
                                                                currentPage > 1
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
                                                                currentPage > 1
                                                                    ? "text-gray-500"
                                                                    : "text-slate-300 pointer-events-none"
                                                            }
                                                        />
                                                    </button>
                                                )}

                                                {to < total ? (
                                                    <Link
                                                        href={
                                                            "/user/support?page=" +
                                                            (currentPage + 1)
                                                        }
                                                    >
                                                        <UilAngleRight
                                                            size={25}
                                                            className={
                                                                to < total
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
                                                                to < total
                                                                    ? "text-gray-500"
                                                                    : "text-slate-300 pointer-events-none"
                                                            }
                                                        />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
