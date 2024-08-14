import Sidebar from "@/Components/user/account/Sidebar";
import { Head, Link } from "@inertiajs/inertia-react";
import App from "./layouts/App";
import {
    UilFilePlusAlt,
    UilScenery,
    UilMicrophone
} from "@iconscout/react-unicons";
import { useState } from "react";
import Account from "./demo/components/settings/Account";
import Subscription from "./demo/components/settings/Subscription";
import Menubar from "./demo/components/settings/Menubar";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";

export default function Settings(props) {
    const info = JSON.parse(props.auth.user.data);

    const { t } = useTranslation("global");

    return (
        <>
            <Head>
                <title>{t("Overview")}</title>
            </Head>
            <App auth={props.auth.user} logo={props.logo}>
                <Menubar />
                <div className="m-5 bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                    <div className="overflow-x-auto border bg-white border-slate-100 rounded-xl">
                        <table className="w-full text-left">
                            <thead className="text-slate-700 font-normal table-bg">
                                <tr className=" font-medium">
                                    <td className="px-8 py-6">
                                        {t("Current Subscription")}
                                    </td>
                                    <td className="px-8 py-6"></td>
                                    <td className="px-8 py-6"></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b border-slate-50 last:border-none hover:bg-gray-50">
                                    <td className="px-8 py-6 text-sm text-gray-400 font-medium ">
                                        {t("Name")}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium ">
                                        {props.planName}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium "></td>
                                </tr>
                                <tr className="bg-white border-b border-slate-50 last:border-none hover:bg-gray-50">
                                    <td className="px-8 py-6 text-sm text-gray-400 font-medium ">
                                        {t("Expire Date")}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium ">
                                        {moment(props.user.will_expire).format(
                                            "LLL"
                                        )}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium "></td>
                                </tr>
                                <tr className="bg-white border-b border-slate-50 last:border-none hover:bg-gray-50">
                                    <td className="px-8 py-6 text-sm text-gray-400 font-medium ">
                                        {t("Status")}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium ">
                                        <span className=" bg-green-200 text-green-500 px-4 py-1.5 rounded-full border border-green-500 text-xs">
                                            {t("Active")}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-gray-500 font-medium ">
                                        <Link
                                            href="/user/plan"
                                            className="text-gradient"
                                        >
                                            {t("Upgrade & Plan Details")}
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 gap-5 px-5 mb-5">
                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-lg h-fit">
                        <div className=" bg-white rounded-lg p-7 px-7 h-fit">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className=" text-xl icon-color ">
                                        {t("Total Word Limit")}
                                    </h2>
                                    <div className=" flex items-center mt-5">
                                        <h5 className=" text-gray-700 font-medium text-3xl">
                                            {info.use_word_limit}{" "}
                                        </h5>
                                        <sub className=" text-sm text-slate-500">
                                            /{" "}
                                            {info.word_limit == -1
                                                ? t("Unlimited")
                                                : info.word_limit}
                                        </sub>
                                    </div>
                                </div>
                                <div className=" bg-violet-50 border text-slate-500 border-dashed  p-2.5 rounded-lg mr-2 h-fit">
                                    <UilFilePlusAlt size={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-lg h-fit">
                        <div className=" bg-white rounded-lg p-7 px-7 h-fit">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className=" text-xl icon-color ">
                                        {t("Total Image Limit")}
                                    </h2>
                                    <div className=" flex items-center mt-5">
                                        <h5 className=" text-gray-700 font-medium text-3xl">
                                            {info.use_image_limit}{" "}
                                        </h5>
                                        <sub className=" text-sm text-slate-500">
                                            /{" "}
                                            {info.image_limit == -1
                                                ? t("Unlimited")
                                                : info.image_limit}
                                        </sub>
                                    </div>
                                </div>
                                <div className=" bg-violet-50 border text-slate-500 border-dashed  p-2.5 rounded-lg mr-2 h-fit">
                                    <UilScenery size={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-lg h-fit">
                        <div className=" bg-white rounded-lg p-7 px-7 h-fit">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className=" text-xl icon-color ">
                                        {t("Total Speech To Text")}
                                    </h2>
                                    <div className=" flex items-center mt-5">
                                        <h5 className=" text-gray-700 font-medium text-3xl">
                                            {info.use_speech_to_text_limit}{" "}
                                        </h5>
                                        <sub className=" text-sm text-slate-500">
                                            /{" "}
                                            {info.speech_to_text_limit == -1
                                                ? t("Unlimited")
                                                : info.speech_to_text_limit}
                                        </sub>
                                    </div>
                                </div>
                                <div className=" bg-violet-50 border text-slate-500 border-dashed  p-2.5 rounded-lg mr-2 h-fit">
                                    <UilMicrophone size={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}
