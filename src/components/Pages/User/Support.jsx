import { Head, Link } from "@inertiajs/inertia-react";
import { UilTimesCircle, UilBullseye, UilPlus } from "@iconscout/react-unicons";
import { useEffect, useState } from "react";

import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import App from "./layouts/App";
import ShareModal from "./demo/components/appearance/shareModal";
import Open from "./demo/components/support/Open";
import { useTranslation } from "react-i18next";

export default function Support(props) {
    const [dataTypes, setDataTypes] = useState("open");
    const [isShowModal, setIsShowModal] = useState(false);
    const [status, setStatus] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [t] = useTranslation("global");
    const [error, setError] = useState({
        param: "",
        msg: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError({
            param: "",
            msg: ""
        });

        if (!title) {
            return setError({
                param: "title",
                msg: "The Title Field is Required"
            });
        }

        if (!description) {
            return setError({
                param: "description",
                msg: "The Description Field is Required"
            });
        }

        await axios
            .post("/user/support/store", {
                title: title,
                description: description
            })
            .then((res) => {
                setIsShowModal(false);
                Inertia.reload();
            })
            .catch((error) => {
                setError({
                    param: "title",
                    msg: error.response.data.msg
                });
            });
    };

    return (
        <>
            <Head>
                <title>{t("Support")}</title>
            </Head>
            <App auth={props.auth.user} logo={props.logo}>
                <div className="">
                    <div className="2xl:flex xl:flex lg:flex md:flex sm:flex xs:block items-center justify-between xs:text-center px-5 py-8">
                        <div className=" 2xl:flex xl:flex lg:flex md:flex sm:flex xs:block justify-between w-full">
                            <h2 className=" font-medium text-3xl text-gray-700">
                                {t("Support Messages")}
                            </h2>
                            <div>
                                <div className=" flex xs:justify-center 2xl:mt-initial xl:mt-initial lg:mt-initial md:mt-initial sm:mt-initial xs:mt-4 items-center">
                                    <button
                                        onClick={() => setIsShowModal(true)}
                                        className=" bg-gradient text-white px-6 py-2.5 rounded-lg flex items-center"
                                    >
                                        <UilPlus
                                            className="inline-block"
                                            size={21}
                                        />
                                        <h6 className=" ml-1 mt-2px">
                                            {t("Create Support Request")}
                                        </h6>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-r mx-5 p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                    <div className=" bg-white px-3 py-3 rounded-xl flex items-center space-x-5 h-full">
                        <button
                            onClick={() => setDataTypes("open")}
                            className={`flex items-center group transition px-5 py-2 rounded-lg ${dataTypes === "open" ? "bg-gradient text-white" : "text-gray-500"}`}
                        >
                            <UilBullseye size={21} className=" mr-1.5" />
                            <span className=" font-medium">{t("Open")}</span>
                        </button>
                        <button
                            onClick={() => setDataTypes("close")}
                            className={`flex items-center group transition px-5 py-2 rounded-lg ${dataTypes === "close" ? "bg-gradient text-white" : "text-gray-500"}`}
                        >
                            <UilTimesCircle size={21} className=" mr-1.5" />
                            <span className=" font-medium">{t("Close")}</span>
                        </button>
                    </div>
                </div>
                <div className=" mb-10">
                    {dataTypes === "open" && (
                        <Open
                            openSupports={props.openSupports.data}
                            pagination={props.openPagination}
                        />
                    )}
                    {dataTypes === "close" && (
                        <Open
                            openSupports={props.closeSupports.data}
                            pagination={props.closePagination}
                        />
                    )}
                </div>
                {isShowModal && (
                    <ShareModal
                        size={"2xl:w-1/3 xl:w-1/3 lg:w-1/2"}
                        close={() => setIsShowModal(false)}
                        heading={t("Create Support Request")}
                        description={t(
                            "Here you can create support request for your problem."
                        )}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="w-full mt-5">
                                <div className="w-full">
                                    <label className=" block text-slate-500 text-base font-medium mb-1">
                                        {t("Title")}
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        type="text"
                                        className="w-full rounded-md border border-slate-100 bg-white h-12 px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                    />
                                    {error && error.param === "title" && (
                                        <p className=" text-sm text-red-500 mt-1">
                                            {error.msg}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full mt-4">
                                    <label className=" block text-slate-500 text-base font-medium mb-1">
                                        {t("Message")}
                                    </label>
                                    <textarea
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        type="text"
                                        className="w-full rounded-md border border-slate-100 bg-white px-6 placeholder:text-slate-300 placeholder:text-sm placeholder:font-normal text-slate-700 font-medium"
                                        rows={6}
                                    ></textarea>
                                    {error && error.param === "description" && (
                                        <p className=" text-sm text-red-500 mt-1">
                                            {error.msg}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-gradient text-white px-8 py-2.5 float-right rounded-lg mt-5"
                            >
                                {t("Create Support Request")}
                            </button>
                        </form>
                    </ShareModal>
                )}
            </App>
        </>
    );
}
