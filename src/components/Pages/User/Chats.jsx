import { Link } from "react-router-dom";
import App from "./layouts/App";
import { UilHipchat } from "@iconscout/react-unicons";
import { useTranslation } from "react-i18next";

export default function Chats({ auth, logo, aiChats }) {
    const [t] = useTranslation("global");

    return (
        <>
            <App auth={auth?.user} logo={logo}>
                <div className="flex items-center justify-between px-5 py-8">
                    <div className=" flex items-center justify-between w-full">
                        <h2 className=" font-medium text-3xl text-gray-700">
                            {t("AI ChatBots")}
                        </h2>
                    </div>
                </div>
                <div className=" grid grid-cols-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5 mx-5">
                    {aiChats?.data?.map((chat, index) => {
                        const info = JSON.parse(chat.data);
                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl h-fit"
                            >
                                <div className=" bg-white rounded-2xl text-center px-5 py-12">
                                    <img
                                        className="m-auto h-32 w-32 rounded-full border-dashed border-2 p-1 border-slate-100"
                                        src={info.profile}
                                        alt=""
                                    />
                                    <h2 className=" mt-4 font-medium text-2xl text-gray-600">
                                        {chat.title}
                                    </h2>
                                    <p className=" text-slate-300 text-base mt-1">
                                        {info.role}
                                    </p>
                                    <Link
                                        to={`/user/ai/chat/${chat.slug}`}
                                        className=" mt-5 bg-gradient text-white rounded-lg px-8 mx-5 py-2.5 flex items-center justify-center m-auto"
                                    >
                                        <UilHipchat className="mr-1" />{" "}
                                        <span>{t("View Chat")}</span>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </App>
        </>
    );
}
