import moment from "moment";
import App from "./layouts/App";
import { UilMessage } from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { Head } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";

export default function SupportView(props) {
    const [textMessage, setTextMessage] = useState("");
    const [Message, setMessage] = useState([]);
    const containerRef = useRef(null);
    const [t] = useTranslation("global");

    useEffect(() => {
        if (props.messages.data.length > 0) {
            // Sort the messages array based on their 'id' property in ascending order
            const sortedMessages = props.messages.data.sort(
                (a, b) => a.id - b.id
            );
            setMessage(sortedMessages);
            scrollToBottom();
        }
    }, [props.messages.data]);

    useEffect(() => {
        scrollToBottom();
    }, []);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        scrollToBottom();
        await axios
            .post("/user/support/message/send", {
                id: props.support.id,
                message: textMessage
            })
            .then((res) => {
                scrollToBottom();
                setTextMessage("");
                Inertia.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Head>
                <title>{t("Support Messages")}</title>
            </Head>
            <App auth={props.auth.user} logo={props.logo}>
                <div className="2xl:w-1/2 xl:w-1/2 lg:w-1/2 border-b border-l border-r border-slate-100 m-auto mt-5">
                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                        <div className="bg-white rounded-xl">
                            <div className=" py-5 mx-5 border-b border-slate-50">
                                <div className=" relative flex items-center justify-between ">
                                    <div className=" flex items-center">
                                        <h2 className=" text-gray-600 font-medium text-base py-2">
                                            <strong>{t("Ticket No")}:</strong>{" "}
                                            {props.support.ticket_no}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow flex-col p-5 ">
                                <div
                                    ref={containerRef}
                                    className="h-600 overflow-y-scroll"
                                >
                                    {Message.map((value, index) => {
                                        if (value.type === "owner") {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex space-x-3 mb-5"
                                                >
                                                    <svg
                                                        className=" inline-block mb-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        version="1.1"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        xmlns:svgjs="http://svgjs.com/svgjs"
                                                        width="32"
                                                        height="32"
                                                        x="0"
                                                        y="0"
                                                        viewBox="0 0 53 53"
                                                        xmlSpace="preserve"
                                                    >
                                                        <g>
                                                            <path
                                                                d="m18.613 41.552-7.907 4.313a7.106 7.106 0 0 0-1.269.903A26.377 26.377 0 0 0 26.5 53c6.454 0 12.367-2.31 16.964-6.144a7.015 7.015 0 0 0-1.394-.934l-8.467-4.233a3.229 3.229 0 0 1-1.785-2.888v-3.322c.238-.271.51-.619.801-1.03a19.482 19.482 0 0 0 2.632-5.304c1.086-.335 1.886-1.338 1.886-2.53v-3.546c0-.78-.347-1.477-.886-1.965v-5.126s1.053-7.977-9.75-7.977-9.75 7.977-9.75 7.977v5.126a2.644 2.644 0 0 0-.886 1.965v3.546c0 .934.491 1.756 1.226 2.231.886 3.857 3.206 6.633 3.206 6.633v3.24a3.232 3.232 0 0 1-1.684 2.833z"
                                                                fill="#9ca3af"
                                                                data-original="#e7eced"
                                                            ></path>
                                                            <path
                                                                d="M26.953.004C12.32-.246.254 11.414.004 26.047-.138 34.344 3.56 41.801 9.448 46.76a7.041 7.041 0 0 1 1.257-.894l7.907-4.313a3.23 3.23 0 0 0 1.683-2.835v-3.24s-2.321-2.776-3.206-6.633a2.66 2.66 0 0 1-1.226-2.231v-3.546c0-.78.347-1.477.886-1.965v-5.126S15.696 8 26.499 8s9.75 7.977 9.75 7.977v5.126c.54.488.886 1.185.886 1.965v3.546c0 1.192-.8 2.195-1.886 2.53a19.482 19.482 0 0 1-2.632 5.304c-.291.411-.563.759-.801 1.03V38.8c0 1.223.691 2.342 1.785 2.888l8.467 4.233a7.05 7.05 0 0 1 1.39.932c5.71-4.762 9.399-11.882 9.536-19.9C53.246 12.32 41.587.254 26.953.004z"
                                                                fill="#e5e7eb"
                                                                data-original="#556080"
                                                            ></path>
                                                        </g>
                                                    </svg>

                                                    <div>
                                                        <div className="text-white bg-color rounded-3xl rounded-tl-none px-5 py-3">
                                                            {value.message}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        if (value.type === "user") {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex space-x-3 items-end justify-end mb-5"
                                                >
                                                    <div>
                                                        <p className="text-black border border-slate-200 rounded-3xl rounded-br-none px-5 py-3">
                                                            {value.message}
                                                        </p>
                                                        <span className="text-xs text-gray-400 float-right mt-1">
                                                            {moment(
                                                                value.created_at
                                                            ).format("hh:mm A")}
                                                        </span>
                                                    </div>
                                                    <img
                                                        className=" w-10 h-10 inline-block rounded-full"
                                                        src={
                                                            props.auth.user
                                                                .profile
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                                <div className=" relative">
                                    <form onSubmit={handleSubmit}>
                                        <textarea
                                            value={textMessage}
                                            onChange={(e) =>
                                                setTextMessage(e.target.value)
                                            }
                                            className=" w-full border-none bg-slate-50 m-0 overflow-hidden p-5 rounded-lg placeholder:text-sm placeholder:text-slate-400"
                                            rows="4"
                                            placeholder="Write Here ..."
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className=" absolute right-5 bottom-5 bg-gradient text-white px-4 py-2 rounded-lg"
                                        >
                                            <UilMessage size={18} />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}
