import {
    UilQuestionCircle,
    UilEstate,
    UilBookAlt,
    UilTransaction,
    UilSetting
} from "@iconscout/react-unicons";
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Menubar() {
    const [dataTypes, setDataTypes] = useState("overview");
    const { t } = useTranslation("global");

    return (
        <>
            <div className="">
                <div className="flex items-center justify-between px-5 py-8">
                    <div className=" flex items-center justify-between w-full">
                        <h2 className=" font-medium text-3xl text-gray-700">
                            {t("Settings")}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r mx-5 p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                <div className=" bg-white rounded-xl px-3 py-3 border-b border-slate-100  2xl:flex xl:flex lg:flex md:flex items-center 2xl:space-x-5 xl:space-x-5 lg:space-x-5 md:space-x-5">
                    <Link
                        href="/user/settings"
                        onClick={() => setDataTypes("overview")}
                        className={`flex items-center hover:border-color group transition 2xl:mb-initial xl:mb-initial lg:mb-initial md:mb-initial sm:mb-initial px-8 xl:px-8 lg:px-5 md:px-5 xs:px-5 py-2.5 xs:mb-0 ${route().current() === "user.settings" ? "bg-gradient text-white rounded-lg" : "text-gray-500"}`}
                    >
                        <UilEstate size={21} className=" mr-1" />
                        <span className=" font-medium">{t("Overview")}</span>
                    </Link>
                    <Link
                        href="/user/plan"
                        onClick={() => setDataTypes("subscription")}
                        className={`flex items-center hover:border-color group transition 2xl:mb-initial xl:mb-initial lg:mb-initial md:mb-initial sm:mb-initial px-8 xl:px-8 lg:px-5 md:px-5 xs:px-5 py-2.5 xs:mb-0 ${route().current() === "user.plan.index" ? "bg-gradient text-white rounded-lg" : "text-gray-500"}`}
                    >
                        <UilBookAlt size={21} className=" mr-1" />
                        <span className=" font-medium">
                            {t("Subscription")}
                        </span>
                    </Link>
                    <Link
                        href="/user/payment/history"
                        onClick={() => setDataTypes("payment_history")}
                        className={`flex items-center hover:border-color group transition 2xl:mb-initial xl:mb-initial lg:mb-initial md:mb-initial sm:mb-initial px-8 xl:px-8 lg:px-5 md:px-5 xs:px-5 py-2.5 xs:mb-0 ${route().current() === "user.payment.history" ? "bg-gradient text-white rounded-lg" : "text-gray-500"}`}
                    >
                        <UilTransaction size={21} className=" mr-1" />
                        <span className=" font-medium">
                            {t("Payment History")}
                        </span>
                    </Link>
                    <Link
                        href="/user/settings/information"
                        onClick={() => setDataTypes("settings")}
                        className={`flex items-center hover:border-color group transition 2xl:mb-initial xl:mb-initial lg:mb-initial md:mb-initial sm:mb-initial px-8 xl:px-8 lg:px-5 md:px-5 xs:px-5 py-2.5 xs:mb-0 ${route().current() === "user.settings.information" ? "bg-gradient text-white rounded-lg" : "text-gray-500"}`}
                    >
                        <UilSetting size={21} className=" mr-1" />
                        <span className=" font-medium">{t("Settings")}</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
