import { Link, useHistory } from "react-router-dom";
import {
    UilEstate,
    UilPlusCircle,
    UilLink,
    UilPlus,
    UilUserPlus,
    UilImage,
    UilAngleUp,
    UilAngleDown
} from "@iconscout/react-unicons";
import {
    UilFilePlusAlt,
    UilLayerGroup,
    UilRobot,
    UilMultiply,
    UilAnalytics,
    UilComment,
    UilBracketsCurly,
    UilFileAlt,
    UilMicrophone,
    UilQuestionCircle,
    UilMegaphone,
    UilSetting,
    UilCreditCard,
    UilMusic,
    UilDocumentInfo,
    UilVideo
} from "@iconscout/react-unicons";
import { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useTranslation } from "react-i18next";

export default function Sidebar({ auth, logo, mobileMenu, mobileClose }) {
    const history = useHistory();

    const info = JSON.parse(auth?.data ?? '{"test":1}');

    const expireDate = new Date(auth?.will_expire);

    const calculateDaysLeft = () => {
        const now = new Date();
        const diffInMs = expireDate - now;
        const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
        return Math.max(diffInDays, 0);
    };

    const calculateUsedPercentage = () => {
        if (info?.word_limit == -1) {
            return 0;
        } else {
            return (info?.use_word_limit / info?.word_limit) * 100;
        }
    };

    function converter(num) {
        if (num > 1000) {
            const x = Math.round(num);
            const xNumberFormat = x.toLocaleString();
            const xArray = xNumberFormat.split(",");
            const xParts = ["k+", "m+", "b+", "t+"];
            const xCountParts = xArray.length - 1;
            let xDisplay = x;
            xDisplay =
                xArray[0] +
                (parseInt(xArray[1][0]) !== 0 ? "." + xArray[1][0] : "");
            xDisplay += xParts[xCountParts - 1];

            return xDisplay;
        }

        return num;
    }

    const [daysLeft, setDaysLeft] = useState(calculateDaysLeft());

    const { t } = useTranslation("global");

    useEffect(() => {
        const interval = setInterval(() => {
            setDaysLeft(calculateDaysLeft());
        }, 1000); // Update every second (you can adjust this if needed)

        return () => clearInterval(interval);
    }, []);

    const clickableAreaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                clickableAreaRef.current &&
                !clickableAreaRef.current.contains(event.target) &&
                !event.target.classList.contains("ignore-click")
            ) {
                //   setBotStatus(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div
                style={{ display: "flex", flexDirection: "column" }}
                className={`bg-white 2xl:sidebar xl:w-1/5 lg:w-22p md:w-2/6 sm:w-2/5 xs:w-full md:p-3 2xl:left-0 xl:left-0 lg:left-0 md:transition md:delay-150 2xl:p-0 xl:p-0 lg:p-0 sm:p-5 xs:p-5 md:fixed md:bottom-0 sm:fixed sm:bottom-0 sm:top-0 sm:h-full xs:fixed xs:top-0 xs:bottom-0 xs:h-full z-40 2xl:fixed xl:fixed lg:fixed h-screen overflow-y-scroll hide-scrollbar ${mobileMenu ? "md:-left-0 sm:left-0 xs:left-0" : "md:-left-96 sm:-left-500 xs:left-150p"}`}
            >
                <button
                    onClick={() => mobileClose(false)}
                    className=" 2xl:hidden xl:hidden lg:hidden md:block absolute top-1 border border-slate-100 rounded-full p-2 right-1 z-20"
                >
                    <UilMultiply size={22} className=" text-slate-500" />
                </button>
                <div className="mt-5 pb-5 border-b border-slate-50 mx-5  2xl:block xl:block lg:block relative">
                    <Link to="/user/insight">
                        <img className="h-10" src={logo} alt="" />
                    </Link>
                </div>
                <div className="mt-3.5 2xl:px-3 xl:px-3 lg:px-2 2xl:block xl:block lg:block">
                    <ul>
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/insight" ? " bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/insight"
                            >
                                <UilEstate
                                    className={` inline-block ${history?.location?.pathname === "/user/insight" ? " text-white" : ""}`}
                                />{" "}
                                <div
                                    className={`font-normal ${history?.location?.pathname === "/user/insight" ? " text-white" : ""} 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2`}
                                >
                                    {"Insight"}
                                </div>
                            </Link>
                        </li>
                        {/* <li className={`hover:bg-gradient hover:text-white rounded-xl  group ${"route().current()" === 'user.document.index' ? 'bg-gradient text-white' : 'icon-color'}`}>
                            <Link className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4" to='/user/documents' ><UilFileAlt className=' inline-block' /> <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2">{t('My Documents')}</div></Link>
                        </li> */}
                        <h5 className="2xl:ml-5 xl:ml-5 lg:ml-2 md:ml-2 text-slate-400 text-sm mb-2 mt-5 xl:pl-0 lg:pl-1 md:pl-2 sm:pl-4 xs:pl-4">
                            Services
                        </h5>
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/llm" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/llm"
                            >
                                <UilLayerGroup
                                    className={` inline-block ${history?.location?.pathname === "/user/llm" ? "text-white" : ""}`}
                                />{" "}
                                <div
                                    className={`font-normal ${history?.location?.pathname === "/user/llm" ? "text-white" : ""} 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2`}
                                >
                                    LLM
                                </div>
                            </Link>
                        </li>
                        {/* {
                            info?.ai_images === 1 && (
                            <li className={`hover:bg-gradient hover:text-white rounded-xl  group ${"route().current()" === 'user.ai.images' ? 'bg-gradient text-white' : 'icon-color'}`}>
                                <Link className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4" href='/user/ai/images' ><UilImage className=' inline-block' /> <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2">{t('AI Images')}</div></Link>
                            </li>
                            )
                        } */}
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/stt" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/stt"
                            >
                                <UilMusic
                                    className={` inline-block ${history?.location?.pathname === "/user/stt" ? " text-white" : ""}`}
                                />{" "}
                                <div
                                    className={`font-normal ${history?.location?.pathname === "/user/stt" ? " text-white" : ""} 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center`}
                                >
                                    STT
                                </div>
                            </Link>
                        </li>
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/tts" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/tts"
                            >
                                <UilFileAlt
                                    className={` inline-block ${history?.location?.pathname === "/user/tts" ? " text-white" : ""}`}
                                />{" "}
                                <div
                                    className={`font-normal ${history?.location?.pathname === "/user/tts" ? " text-white" : ""} 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center`}
                                >
                                    TTS
                                </div>
                            </Link>
                        </li>
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/vtt" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/vtt"
                            >
                                <UilVideo
                                    className={` inline-block ${history?.location?.pathname === "/user/vtt" ? " text-white" : ""}`}
                                />{" "}
                                <div
                                    className={`font-normal ${history?.location?.pathname === "/user/vtt" ? " text-white" : ""} 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center`}
                                >
                                    VTT
                                </div>
                            </Link>
                        </li>
                        {/* <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/ai/chats" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/ai/chats"
                            >
                                <UilComment
                                    className={` inline-block ${history?.location?.pathname === "/user/ai/chats" ? " text-white" : ""}`}
                                />{" "}
                                <div
                                    className={`font-normal ${history?.location?.pathname === "/user/ai/chats" ? " text-white" : ""} 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center`}
                                >
                                    {t("AI Chat")}{" "}
                                </div>
                            </Link>
                        </li> */}
                        {/* {
                            info.ai_code === 1 && (
                            <li className={`hover:bg-gradient hover:text-white rounded-xl  group ${"route().current()" === 'user.ai.code' ? 'bg-gradient text-white' : 'icon-color'}`}>
                                <Link className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4" href='/user/ai/code' >
                                    <UilBracketsCurly className=' inline-block' /> <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center">{t('AI Code')} </div>
                                </Link>
                            </li>
                            )
                        } */}
                        {/* {
                            info.ai_speech_to_text === 1 && (
                                <li className={`hover:bg-gradient hover:text-white rounded-xl  group ${"route().current()" === 'user.ai.speech.text' ? 'bg-gradient text-white' : 'icon-color'}`}>
                                    <Link className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4" href='/user/ai/speech/text' >
                                        <UilMicrophone className=' inline-block' /> <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center">{t('Speech To Text')}</div>
                                    </Link>
                                </li>
                            )
                        } */}
                        <h5 className="2xl:ml-5 xl:ml-5 lg:ml-2 md:ml-2 text-slate-400 text-sm mb-2 mt-5 xl:pl-0 lg:pl-1 md:pl-2 sm:pl-4 xs:pl-4">
                            {t("Support & Settings")}
                        </h5>
                        {/* <li className={`hover:bg-gradient hover:text-white rounded-xl  group ${"route().current()" === 'user.support' ? 'bg-gradient text-white' : 'icon-color'}`}>
                            <Link className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4" to='/user/support' >
                                <UilQuestionCircle className=' inline-block' /> <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center">{t('Help Center')}</div>
                            </Link>
                        </li> */}
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/settings" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/settings"
                            >
                                <UilSetting className=" inline-block" />{" "}
                                <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center">
                                    {t("Settings")}
                                </div>
                            </Link>
                        </li>
                        <li
                            className={`hover:bg-gradient hover:text-white rounded-xl  group ${history?.location?.pathname === "/user/report" ? "bg-gradient text-white" : "icon-color"}`}
                        >
                            <Link
                                className="flex items-center py-1.5 2xl:px-5 xl:px-5 lg:px-3.5 md:px-4 xs:px-4"
                                to="/user/report"
                            >
                                <UilCreditCard className=" inline-block" />{" "}
                                <div className="font-normal 2xl:text-lg xl:text-lg lg:text-base mt-1 ml-2 flex items-center">
                                    Report
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div className="mt-16 mb-5 2xl:px-3 xl:px-3 lg:px-3 2xl:block xl:block lg:block">
                    <div className=" text-center relative">
                        <div className=" absolute left-1/2 xy-middle top-0 bg-gradient inline-block p-4 rounded-full border-4 border-white">
                            <svg
                                className=" mx-auto fill-white"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xmlnsSvgjs="http://svgjs.com/svgjs"
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                viewBox="0 0 511.998 511.998"
                                xmlSpace="preserve"
                            >
                                <g>
                                    <path
                                        d="M255.999 145.152c-32.954 0-59.763 26.796-59.763 59.733 0 32.938 26.808 59.733 59.763 59.733 32.954 0 59.763-26.796 59.763-59.733s-26.809-59.733-59.763-59.733zm0 102.4c-23.542 0-42.696-19.142-42.696-42.667 0-23.525 19.154-42.667 42.696-42.667 23.542 0 42.696 19.142 42.696 42.667 0 23.525-19.154 42.667-42.696 42.667z"
                                        data-original="#000000"
                                    ></path>
                                    <path
                                        d="M358.259 256.145c.025-1.824.14-3.638.14-5.464 0-97.529-35.142-188.008-96.417-248.237a8.548 8.548 0 0 0-11.967 0c-61.275 60.229-96.417 150.708-96.417 248.237 0 1.826.115 3.64.14 5.464-41.117 21.393-68.406 78.569-68.406 144.915a8.533 8.533 0 0 0 8.533 8.533h99.471c.01 0 .019.004.029.004h4.744l-17.831 29.704a8.527 8.527 0 0 0-.108 8.596 8.53 8.53 0 0 0 7.425 4.329h136.562a8.53 8.53 0 0 0 7.425-4.329 8.527 8.527 0 0 0-.108-8.596l-17.834-29.704h4.992c.01 0 .019-.004.029-.004h99.471a8.533 8.533 0 0 0 8.533-8.533c.001-66.345-27.288-123.522-68.406-144.915zM255.999 20.69c18.028 18.906 33.422 40.755 46.032 64.725h-92.065c12.611-23.971 28.005-45.82 46.033-64.725zM102.566 392.527c2.033-51.552 22.373-96.79 51.906-116.986 2.572 40.837 11.461 80.647 26.116 116.986h-78.022zM202.67 435.16l15.345-25.563h75.718l15.349 25.563H202.67zm110.383-42.629H198.945c-18.512-43.25-28.279-92.167-28.279-141.85 0-53.042 10.907-103.771 30.983-148.2h108.7c20.077 44.429 30.983 95.158 30.983 148.2 0 49.684-9.766 98.6-28.279 141.85zm18.357-.004c14.655-36.339 23.544-76.149 26.116-116.986 29.533 20.196 49.873 65.434 51.906 116.986H331.41zM255.999 460.806a8.533 8.533 0 0 0-8.533 8.533v34.125a8.533 8.533 0 0 0 17.066 0V469.34a8.533 8.533 0 0 0-8.533-8.534zM213.287 460.806a8.533 8.533 0 0 0-8.533 8.533v17.05a8.533 8.533 0 0 0 17.066 0v-17.05a8.534 8.534 0 0 0-8.533-8.533zM298.712 460.806a8.533 8.533 0 0 0-8.533 8.533v17.05a8.533 8.533 0 0 0 17.066 0v-17.05a8.534 8.534 0 0 0-8.533-8.533z"
                                        data-original="#000000"
                                        class=""
                                    ></path>
                                </g>
                            </svg>
                        </div>
                        <div
                            style={{ backgroundColor: "#1a202c" }}
                            className=" text-white 2xl:p-7 xl:p-7 lg:p-5 md:p-7 xs:p-7 2xl:pt-12 xl:pt-12 lg:pt-12 md:pt-12 xs:pt-14 rounded-2xl pt-14"
                        >
                            <h2 className=" text-white text-xl font-medium mb-3">
                                {t("Upgrade")}
                            </h2>
                            {info?.word_limit == -1 ? (
                                <p className=" mb-2 text-sm text-gray-300">
                                    {info?.use_word_limit ?? 0}/{t("Unlimited")}{" "}
                                    {t("Word Credits Used")}
                                </p>
                            ) : (
                                <p className=" mb-2 text-sm text-gray-300">
                                    {info?.use_word_limit ?? 0}/
                                    {converter(info?.word_limit) ?? 0}{" "}
                                    {t("Word Credits Used")}
                                </p>
                            )}
                            <div className="w-full bg-gray-600 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient h-2 rounded-full"
                                    style={{
                                        width: calculateUsedPercentage() + "%"
                                    }}
                                ></div>
                            </div>
                            {info?.accept_trail == 1 ? (
                                <p className=" mt-3 mb-5 text-sm text-gray-300">
                                    {daysLeft} {t("days trial left")}
                                </p>
                            ) : (
                                <div className=" mt-5"></div>
                            )}
                            <Link
                                className="bg-gradient text-white w-full block rounded-lg py-3"
                                to="/user/plan"
                            >
                                {t("Upgrade")}
                            </Link>
                        </div>
                    </div>
                </div> */}
                <div className="mt-auto">
                    <UserCard initials="JM" name="Jatis Mobile" />
                </div>
            </div>
        </>
    );
}

const UserCard = ({ initials, name }) => (
    <div className="flex flex-col font-semibold rounded-none">
        <div className="flex gap-3 px-3 py-2 rounded-md bg-neutral-100">
            <UserAvatar initials={initials} />
            <div className="grow shrink my-auto text-xs text-black">{name}</div>
        </div>
    </div>
);

const UserAvatar = ({ initials }) => (
    <div className="px-2.5 text-lg text-white whitespace-nowrap rounded-full bg-zinc-300 h-[41px] w-[41px] flex items-center justify-center">
        {initials}
    </div>
);
