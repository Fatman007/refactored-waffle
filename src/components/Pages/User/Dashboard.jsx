import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    UilArrowUpRight,
    UilFavorite,
    UilArrowDownLeft,
    UilAngleLeft,
    UilBookmark,
    UilAngleRight,
    UilEdit,
    UilTrashAlt,
    UilCopy,
    UilFileCheckAlt
} from "@iconscout/react-unicons";
import { useTranslation } from "react-i18next";
import Breadcrumb from "./demo/components/breadcrumb";
import App from "./layouts/App";
import "../../../assets/css/chart.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import documentIcn from "../../../assets/frontend/img/dashboard/document.png";
import imageIcn from "../../../assets/frontend/img/dashboard/image1.png";
import programingIcn from "../../../assets/frontend/img/dashboard/programing.png";

export default function Dashboard(props) {
    const [bubbleCopied, setBubbleCopied] = useState(false);
    const [embedCopied, setEmbedCopied] = useState(false);
    const contentRef = useRef(null);
    const {
        per_page,
        currentPage,
        form,
        lastPage,
        next_page_url,
        prev_page_url,
        to,
        total
    } = props?.pagination ?? {
        per_page: null,
        currentPage: null,
        form: null,
        lastPage: null,
        next_page_url: null,
        prev_page_url: null,
        to: null,
        total: null
    };
    const data = [
        {
            name: "monday",
            AiWrite: 200,
            Images: 200,
            Code: 300,
            aiSpeechToText: 400
        },
        {
            name: "tuesday",
            AiWrite: 200,
            Images: 200,
            Code: 300,
            aiSpeechToText: 400
        }
    ];
    const [levelUsesDocument, setLevelUsesDocument] = useState(false);
    const [levelUsesCode, setLevelUsesCode] = useState(false);
    const [levelUsesImages, setLevelUsesImages] = useState(false);
    const [levelUsesAiSpeechToText, setLevelUsesAiSpeechToText] =
        useState(false);

    const lineColors = {
        AiWrite: "#82ca9d", // Color for "Documents" dataKey
        Images: "#FEB019",
        Code: "#FF4560", // Color for "Code" dataKey
        aiSpeechToText: "#008FFB" // Color for "Code" dataKey
    };

    const options = {
        chart: {
            type: "donut"
        },
        colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
        labels: [
            "Total Content Generate",
            "Total Image Generate",
            "Total Code Generate",
            "Total AiSpeechToText Generate"
        ],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false // Disable the legend that appears on hover
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ]
    };

    const series = [44, 55, 41, 17];

    const handleCopy = (content, type) => {
        if (content) {
            const el = document.createElement("textarea");
            el.value = content;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);

            if (type === "bubble") {
                setBubbleCopied(true);
                setTimeout(() => {
                    setBubbleCopied(false);
                }, 5000);
            } else {
                setEmbedCopied(true);
                setTimeout(() => {
                    setEmbedCopied(false);
                }, 5000);
            }
        }
    };

    const { t } = useTranslation("global");

    return (
        <>
            <App auth={props.auth?.user} logo={props.logo}>
                <div className="m-5 my-6">
                    <div className="grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                        <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                            <div className=" bg-white rounded-xl p-7 py-6 ">
                                <div className=" flex justify-between">
                                    <div>
                                        <p className=" uppercase text-slate-600">
                                            {t("Total Documents")}
                                        </p>
                                        <h2 className=" my-2 text-3xl">
                                            {props.totalDocumentsCurrentMonth}
                                        </h2>
                                        <div className=" flex items-center text-sm text-slate-400">
                                            <div className=" flex items-center text-sm text-green-600 font-medium">
                                                {props.changeStatusDocuments ===
                                                "positive" ? (
                                                    <>
                                                        <UilArrowUpRight
                                                            className="text-green-600"
                                                            size={18}
                                                        />
                                                        <div className="mr-1 text-green-600">
                                                            {
                                                                props.percentageChangeDocuments
                                                            }
                                                            %
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UilArrowDownLeft
                                                            className="text-red-600"
                                                            size={18}
                                                        />
                                                        <div className="mr-1 text-red-600">
                                                            {
                                                                props.percentageChangeDocuments
                                                            }
                                                            %
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div> {t("than last month.")} </div>
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className=" h-custom-card border-dashed p-2 border-violet-300 bg-jatis-ai border rounded-lg"
                                            src={documentIcn}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                            <div className=" bg-white rounded-xl p-7 py-6 ">
                                <div className=" flex justify-between">
                                    <div>
                                        <p className=" uppercase text-slate-600">
                                            {t("Total Images")}
                                        </p>
                                        <h2 className=" my-2 text-3xl">
                                            {props.totalImagesCurrentMonth}
                                        </h2>
                                        <div className=" flex items-center text-sm text-slate-400">
                                            <div className=" flex items-center text-sm text-green-600 font-medium">
                                                {props.changeStatusImages ===
                                                "positive" ? (
                                                    <>
                                                        <UilArrowUpRight
                                                            className="text-green-600"
                                                            size={18}
                                                        />
                                                        <div className="mr-1 text-green-600">
                                                            {
                                                                props.percentageChangeImages
                                                            }
                                                            %
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UilArrowDownLeft
                                                            className="text-red-600"
                                                            size={18}
                                                        />
                                                        <div className="mr-1 text-red-600">
                                                            {
                                                                props.percentageChangeImages
                                                            }
                                                            %
                                                        </div>
                                                    </>
                                                )}
                                            </div>{" "}
                                            <div> {t("than last month")}</div>.
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className=" h-custom-card border-dashed p-1.5 border-green-300 bg-green-50 border rounded-lg"
                                            src={imageIcn}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r p-[1px] xl:col-span-1 sm:col-span-2 from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                            <div className=" bg-white rounded-xl p-7 py-6 h-full">
                                <div className=" flex justify-between">
                                    <div>
                                        <p className=" uppercase text-slate-600">
                                            {t("Total Code")}
                                        </p>
                                        <h2 className=" my-2 text-3xl">
                                            {props.totalAiCodeCurrentMonth}
                                        </h2>
                                        <div className=" flex items-center text-sm text-slate-400">
                                            <div className=" flex items-center text-sm text-green-600 font-medium">
                                                {props.changeStatusAiCode ===
                                                "positive" ? (
                                                    <>
                                                        <UilArrowUpRight
                                                            className="text-green-600"
                                                            size={18}
                                                        />
                                                        <div className="mr-1 text-green-600">
                                                            {
                                                                props.percentageChangeAiCode
                                                            }
                                                            %
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UilArrowDownLeft
                                                            className="text-red-600"
                                                            size={18}
                                                        />
                                                        <div className="mr-1 text-red-600">
                                                            {
                                                                props.percentageChangeAiCode
                                                            }
                                                            %
                                                        </div>
                                                    </>
                                                )}
                                            </div>{" "}
                                            <div> {t("than last month")}</div>.
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            className=" h-custom-card border-dashed p-2 bg-sky-50 border-sky-300 border rounded-lg"
                                            src={programingIcn}
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 sm:gap-5 mt-5">
                        <div className="col-span-2 bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto sm:mb-0 xs:mb-5">
                            <div className="bg-white h-full rounded-xl relative">
                                <div className=" flex items-center justify-between px-7 pt-7">
                                    <h2 className="uppercase  text-slate-600">
                                        {t("Usages Statistics")}
                                    </h2>
                                    <div className="sm:block xs:hidden">
                                        <div className=" flex space-x-5 text-sm text-slate-500">
                                            <div
                                                onClick={() =>
                                                    setLevelUsesDocument(
                                                        !levelUsesDocument
                                                    )
                                                }
                                                className="flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>{" "}
                                                <div
                                                    className={
                                                        levelUsesDocument &&
                                                        " line-through"
                                                    }
                                                >
                                                    {t("AiWrite")}
                                                </div>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLevelUsesImages(
                                                        !levelUsesImages
                                                    )
                                                }
                                                className="flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>{" "}
                                                <span
                                                    className={
                                                        levelUsesImages &&
                                                        " line-through"
                                                    }
                                                >
                                                    {t("Images")}
                                                </span>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLevelUsesCode(
                                                        !levelUsesCode
                                                    )
                                                }
                                                className="flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>{" "}
                                                <span
                                                    className={
                                                        levelUsesCode &&
                                                        " line-through"
                                                    }
                                                >
                                                    {t("Codes")}
                                                </span>
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setLevelUsesAiSpeechToText(
                                                        !levelUsesAiSpeechToText
                                                    )
                                                }
                                                className="flex items-center space-x-1.5 cursor-pointer"
                                            >
                                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>{" "}
                                                <span
                                                    className={
                                                        levelUsesAiSpeechToText &&
                                                        " line-through"
                                                    }
                                                >
                                                    {t("SpeechToText")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span className=" text-sm text-slate-300">
                                        {moment().format("MMM")}{" "}
                                        {moment().format("YYYY")}
                                    </span>
                                </div>
                                <div className="mt-5 w-full pr-5 pb-5">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart data={data}>
                                            <CartesianGrid
                                                strokeDasharray="3"
                                                stroke="#edebeb"
                                                vertical={0}
                                            />
                                            <XAxis
                                                tickLine={0}
                                                dataKey="name"
                                                axisLine={{
                                                    stroke: "#edebeb",
                                                    strokeWidth: 1
                                                }}
                                                tick={{
                                                    fill: "#94a3b8",
                                                    fontSize: 10
                                                }}
                                            />
                                            <YAxis
                                                tickLine={{
                                                    stroke: "#edebeb",
                                                    strokeWidth: 1
                                                }}
                                                axisLine={{
                                                    stroke: "#edebeb",
                                                    strokeWidth: 1
                                                }}
                                                tick={{
                                                    fill: "#94a3b8",
                                                    fontSize: 10
                                                }}
                                            />
                                            <Tooltip
                                                content={({
                                                    payload,
                                                    label,
                                                    active
                                                }) => {
                                                    if (active) {
                                                        return (
                                                            <div className="custom-tooltip bg-white shadow-lg px-5 py-3 rounded-lg text-sm border border-violet-100">
                                                                <p className="label border-b border-slate-100 pb-1 mb-1">
                                                                    {moment().format(
                                                                        "MMM"
                                                                    )}{" "}
                                                                    {`${label}`}
                                                                    ,{" "}
                                                                    {moment().format(
                                                                        "YYYY"
                                                                    )}
                                                                </p>
                                                                {payload.map(
                                                                    (
                                                                        entry,
                                                                        index
                                                                    ) => (
                                                                        <p
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="tooltip-item"
                                                                            style={{
                                                                                color: lineColors[
                                                                                    entry
                                                                                        .dataKey
                                                                                ]
                                                                            }}
                                                                        >
                                                                            <span className="tooltip-label">
                                                                                {
                                                                                    entry.name
                                                                                }
                                                                                :{" "}
                                                                            </span>
                                                                            <span className="tooltip-value">
                                                                                {
                                                                                    entry.value
                                                                                }{" "}
                                                                                Used.
                                                                            </span>
                                                                        </p>
                                                                    )
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }}
                                            />
                                            <Legend />
                                            {levelUsesDocument ? (
                                                <Line
                                                    type="monotone"
                                                    stroke="#82ca9d"
                                                />
                                            ) : (
                                                <Line
                                                    type="monotone"
                                                    dataKey="AiWrite"
                                                    stroke="#82ca9d"
                                                />
                                            )}
                                            {levelUsesImages ? (
                                                <Line
                                                    type="monotone"
                                                    stroke="#FEB019"
                                                />
                                            ) : (
                                                <Line
                                                    type="monotone"
                                                    dataKey="Images"
                                                    stroke="#FEB019"
                                                />
                                            )}
                                            {levelUsesCode ? (
                                                <Line
                                                    type="monotone"
                                                    stroke="#FF4560"
                                                />
                                            ) : (
                                                <Line
                                                    type="monotone"
                                                    dataKey="Code"
                                                    stroke="#FF4560"
                                                />
                                            )}
                                            {levelUsesAiSpeechToText ? (
                                                <Line
                                                    type="monotone"
                                                    stroke="#008FFB"
                                                />
                                            ) : (
                                                <Line
                                                    type="monotone"
                                                    dataKey="aiSpeechToText"
                                                    stroke="#008FFB"
                                                />
                                            )}
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r h-392 p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto">
                            <div className=" bg-white rounded-xl p-7 h-full overflow-hidden">
                                <div className=" flex items-center justify-between mb-8">
                                    <h2 className="uppercase  text-slate-600">
                                        {t("Total History")}
                                    </h2>
                                </div>
                                {series?.[0] === 0 &&
                                series?.[1] === 0 &&
                                series?.[2] === 0 &&
                                series?.[3] === 0 ? (
                                    <div className="h-56 flex items-center justify-center">
                                        <p className=" text-slate-400 text-lg">
                                            {t("No Data Found.")}
                                        </p>
                                    </div>
                                ) : (
                                    <ReactApexChart
                                        options={options}
                                        series={series}
                                        type="donut"
                                        height="220"
                                    />
                                )}
                                <div className=" mt-5">
                                    <div className="w-full text-sm text-slate-500 text-center">
                                        <div className=" inline-block mr-3">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                                                <div>
                                                    {t("Content Generate")}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inline-block mr-3">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                                                <span>
                                                    {t("Image Generate")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline-block mr-3">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>{" "}
                                                <span>
                                                    {t("Code Generate")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="inline-block mr-3">
                                            <div className="flex items-center space-x-1.5">
                                                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>{" "}
                                                <span>
                                                    {t("SpeechToText Generate")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.recentDocuments?.length > 0 && (
                        <div className=" mt-12">
                            <h2 className=" text-2xl text-slate-600 font-medium">
                                {t("Most Recent UseCases")}
                            </h2>
                            <div className="grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-3">
                                {Array.isArray(props.recentDocuments) ? (
                                    Object.values(props.recentDocuments).map(
                                        (document, index) => (
                                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                                                <div className="bg-white px-8 py-12 rounded-xl relative transition-all delay-75 group hover:bg-gradient cursor-pointer h-full">
                                                    <Link
                                                        key={index}
                                                        to={`/user/templates/${document.template.slug}`}
                                                    >
                                                        <div>
                                                            <button className="absolute top-5 right-5">
                                                                <UilFavorite className="text-slate-400 group-hover:text-slate-200" />
                                                            </button>
                                                            <img
                                                                className="h-12 mb-5"
                                                                src={
                                                                    JSON.parse(
                                                                        document
                                                                            .template
                                                                            .data
                                                                    ).image
                                                                }
                                                                alt=""
                                                            />
                                                            <h2 className="font-medium text-xl text-slate-800 mb-2 group-hover:text-white">
                                                                {
                                                                    document
                                                                        .template
                                                                        .title
                                                                }
                                                            </h2>
                                                            <p className="text-gray-400 text-sm group-hover:text-slate-300">
                                                                {
                                                                    JSON.parse(
                                                                        document
                                                                            .template
                                                                            .data
                                                                    )
                                                                        .description
                                                                }
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    )}
                    <div className=" mt-12">
                        <h2 className=" text-2xl text-slate-600 font-medium">
                            {t("Recent Documents")}
                        </h2>
                        <div className="mt-3">
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto">
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
                                            {props.documents?.data?.length >
                                            0 ? (
                                                props.documents?.data?.map(
                                                    (value, index) => {
                                                        if (
                                                            value.type ===
                                                            "aiwrite"
                                                        ) {
                                                            const category =
                                                                value.template;
                                                            const categoryInfo =
                                                                JSON.parse(
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
                                                                            {
                                                                                category.title
                                                                            }
                                                                        </h5>
                                                                    </td>
                                                                    <td className="px-5 py-4 text-gray-900">
                                                                        {/* <h5 onClick={() => bookmark(value.id)} className="font-base cursor-pointer justify-center text-gray-500 flex items-center space-x-1"> */}
                                                                        <h5
                                                                            onClick={() => {}}
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
                                                                        {value.data ===
                                                                        null
                                                                            ? ""
                                                                            : value.data.replace(
                                                                                    /<[^>]+>/g,
                                                                                    ""
                                                                                )
                                                                                    .length >
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
                                                                                to={`/user/document/${value.slug}`}
                                                                                className="bg-green-100 border border-green-500 rounded-full text-green-600 py-2.5 px-2.5"
                                                                            >
                                                                                <UilEdit
                                                                                    size={
                                                                                        17
                                                                                    }
                                                                                />
                                                                            </Link>
                                                                            {/* <button onClick={() => deleteDocument(value.id)} className="bg-red-100 border border-red-500 rounded-full text-red-600 py-2.5 px-2.5"> */}
                                                                            <button
                                                                                onClick={() => {}}
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
                                                            value.type ===
                                                            "aiCode"
                                                        ) {
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
                                                                            {
                                                                                value.title
                                                                            }
                                                                        </h5>
                                                                    </td>
                                                                    <td className="px-5 py-4 text-gray-900">
                                                                        {/* <h5 onClick={() => bookmark(value.id)} className="font-base justify-center cursor-pointer text-gray-500 flex items-center space-x-1"> */}
                                                                        <h5
                                                                            onClick={() => {}}
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
                                                                        )
                                                                            .code ===
                                                                        null
                                                                            ? ""
                                                                            : JSON.parse(
                                                                                    value.data
                                                                                )
                                                                                    .code
                                                                                    .length >
                                                                                100
                                                                              ? JSON.parse(
                                                                                    value.data
                                                                                ).code.slice(
                                                                                    0,
                                                                                    100
                                                                                ) +
                                                                                "..."
                                                                              : JSON.parse(
                                                                                    value.data
                                                                                )
                                                                                    .code}
                                                                    </td>
                                                                    <td className="px-5 py-4 text-gray-600 font-medium">
                                                                        <div className=" flex items-center space-x-3">
                                                                            <Link
                                                                                to={`/user/document/${value.slug}`}
                                                                                className="bg-green-100 border border-green-500 rounded-full text-green-600 py-2.5 px-2.5"
                                                                            >
                                                                                <UilEdit
                                                                                    size={
                                                                                        17
                                                                                    }
                                                                                />
                                                                            </Link>
                                                                            {/* <button onClick={() => deleteDocument(value.id)} className="bg-red-100 border border-red-500 rounded-full text-red-600 py-2.5 px-2.5"> */}
                                                                            <button
                                                                                onClick={() => {}}
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
                                                            value.type ===
                                                            "aiSpeechToText"
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
                                                                            {
                                                                                value.title
                                                                            }
                                                                        </h5>
                                                                    </td>
                                                                    <td className="px-5 py-4 text-gray-900">
                                                                        {/* <h5 onClick={() => bookmark(value.id)} className="font-base cursor-pointer justify-center text-gray-500 flex items-center space-x-1"> */}
                                                                        <h5
                                                                            onClick={() => {}}
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
                                                                        {value.data ===
                                                                        null
                                                                            ? ""
                                                                            : value.data.replace(
                                                                                    /<[^>]+>/g,
                                                                                    ""
                                                                                )
                                                                                    .length >
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
                                                                                to={`/user/document/${value.slug}`}
                                                                                className="bg-green-100 border border-green-500 rounded-full text-green-600 py-2.5 px-2.5"
                                                                            >
                                                                                <UilEdit
                                                                                    size={
                                                                                        17
                                                                                    }
                                                                                />
                                                                            </Link>
                                                                            {/* <button onClick={() => deleteDocument(value.id)} className="bg-red-100 border border-red-500 rounded-full text-red-600 py-2.5 px-2.5"> */}
                                                                            <button
                                                                                onClick={() => {}}
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
                                                    }
                                                )
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
                                                                    {t(
                                                                        "Rows per page"
                                                                    )}
                                                                    :
                                                                </span>{" "}
                                                                <span className=" text-gray-500">
                                                                    {per_page}
                                                                </span>
                                                            </div>
                                                            <div className=" text-gray-500 mr-5">
                                                                {form} - {to}{" "}
                                                                {t("of")}{" "}
                                                                {total}
                                                            </div>
                                                            <div className=" flex items-center">
                                                                {currentPage >
                                                                1 ? (
                                                                    <Link
                                                                        to={
                                                                            "/user/documents?page=" +
                                                                            (currentPage -
                                                                                1)
                                                                        }
                                                                    >
                                                                        <UilAngleLeft
                                                                            size={
                                                                                25
                                                                            }
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
                                                                            size={
                                                                                25
                                                                            }
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
                                                                        to={
                                                                            "/user/documents?page=" +
                                                                            (currentPage +
                                                                                1)
                                                                        }
                                                                    >
                                                                        <UilAngleRight
                                                                            size={
                                                                                25
                                                                            }
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
                                                                            size={
                                                                                25
                                                                            }
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
                    </div>
                </div>
            </App>
        </>
    );
}
