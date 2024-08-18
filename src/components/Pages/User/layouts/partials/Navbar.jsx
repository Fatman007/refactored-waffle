import Spinner from "../../../../Components/Spinner";
import {
    UilSearch,
    UilPlus,
    UilSetting,
    UilSignOutAlt,
    UilEstate,
    UilBars,
    UilInbox,
    UilDatabase,
    UilRobot,
    UilTagAlt,
    UilEditAlt,
    UilBookAlt,
    UilTransaction,
    UilImport
} from "@iconscout/react-unicons";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import gridIcon from "../../../../../assets/frontend/img/grid-menu.png";
import editorIcon from "../../../../../assets/frontend/img/grid-editor.png";
import chatbotIcon from "../../../../../assets/frontend/img/grid-chatbot.png";
import broadcastIcon from "../../../../../assets/frontend/img/grid-broadcast.png";
import helpIcon from "../../../../../assets/frontend/img/grid-help.png";
import accountIcon from "../../../../../assets/frontend/img/grid-account.png";
import profilePng from "../../../../../assets/frontend/img/profile1.png";

// Create a mapping object for the icons
const iconMapping = {
    UilEstate: UilEstate,
    UilInbox: UilInbox,
    UilDatabase: UilDatabase,
    UilRobot: UilRobot,
    UilTagAlt: UilTagAlt,
    UilEditAlt: UilEditAlt,
    UilImport: UilImport,
    UilSetting: UilSetting,
    UilBookAlt: UilBookAlt,
    UilTransaction: UilTransaction
};

export default function Navbar(props) {
    const { profile } = props?.auth || {};
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDownGrid, setShowDropDownGrid] = useState(false);
    const [inputValue, setInputValue] = useState();
    const inputRef = useRef(null);
    const [showResult, setShowResult] = useState(false);
    const [allLists, setAllLists] = useState([]);

    const { t } = useTranslation("global");

    const [searchLists, setSearchLists] = useState([]);

    const [lists, setLists] = useState([]);
    const [activeLang, setActiveLang] = useState("en");

    useEffect(() => {
        // axios.get('/lang/lists')
        //     .then(res => {
        //         setLists(res.data)
        //     })

        const lang = localStorage.getItem("lang") || "en";
        setActiveLang(lang);
    }, []);

    const handleLangChange = (e) => {
        const value = e.target.value;
        localStorage.setItem("lang", value);
        // location.reload()
    };

    useEffect(() => {
        // axios.get('/user/templates/data/all')
        //     .then(res => {
        //         setSearchLists(res.data)
        //     }).catch(error => {
        //         console.log(error)
        //     })
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
            // Check if Cmd (Mac) or Ctrl (Windows) key is pressed
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault(); // Prevent default browser behavior (e.g., opening browser search)

                inputRef.current.focus();
            }
        };

        // Attach the event listener to the document
        document.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleChange = (e) => {
        setShowResult(true);
        setInputValue(e.target.value);

        // Filter the searchLists based on the input value
        const filteredLists = searchLists.filter((item) =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase())
        );

        // Update allLists with the filtered results
        setAllLists(filteredLists);

        if (e.target.value.length <= 0) {
            setShowResult(false);
        }
    };

    const mobileButton = () => {
        props.mobileAction(true);
    };

    const clickableAreaRef = useRef(null);
    const clickableAreaGridRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                clickableAreaRef.current &&
                !clickableAreaRef.current.contains(event.target) &&
                !event.target.classList.contains("ignore-click")
            ) {
                setShowDropDown(false);
            }
            if (
                clickableAreaGridRef.current &&
                !clickableAreaGridRef.current.contains(event.target) &&
                !event.target.classList.contains("ignore-click")
            ) {
                setShowDropDownGrid(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const clickableInputAreaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                clickableInputAreaRef.current &&
                !clickableInputAreaRef.current.contains(event.target) &&
                !event.target.classList.contains("ignore-click")
            ) {
                setShowResult(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className=" flex items-center border-b border-slate-100 py-4 sticky top-0 bg-white z-20">
                <div className="2xl:w-70p xl:w-70p lg:w-1/2 md:w-1/2 sm:w-1/3 xs:w-1/5 pl-5 flex items-center">
                    <button
                        onClick={mobileButton}
                        className="mr-5 border border-slate-100 rounded-lg p-2 2xl:hidden xl:hidden lg:hidden md:block"
                    >
                        <UilBars size={30} />
                    </button>
                    {/* <div className=" relative w-full sm:block xs:hidden">
                        <div className="relative">
                            <UilSearch
                                className="absolute top-1/2 left-4 y-middle icon-color"
                                size={20}
                            />
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-full">
                                <input
                                    ref={inputRef}
                                    onChange={handleChange}
                                    type="text"
                                    className=" w-full bg-slate-50 h-12 rounded-full px-12 border-none placeholder:text-gray-300"
                                    placeholder={t("Search for Templates...")}
                                />
                            </div>
                            <div
                                className={`absolute top-1/2 y-middle right-4 bg-gradient text-white flex items-center rounded-full ${allLists.length > 0 ? "px-1" : "px-4"} py-1`}
                            >
                                <span className="text-sm">⌘</span>
                                <UilPlus size={13} className="mr-1" />
                                <span className="text-sm">{t("K")}</span>
                            </div>
                        </div>
                        <div ref={clickableInputAreaRef}>
                            {showResult && (
                                <div className="mt-2 shadow-lg rounded-lg px-5 py-5 pt-3 absolute bg-white left-0 right-0 z-50">
                                    <h2 className=" border-b border-slate-100 pb-2 font-medium text-gray-600 text-lg">
                                        {t("Search results")}
                                    </h2>
                                    {allLists.length > 0 ? (
                                        <ul>
                                            {allLists.map((value, index) => {
                                                const info = JSON.parse(
                                                    value.data
                                                );
                                                return (
                                                    <li
                                                        key={index}
                                                        className=" icon-color text-lg py-2 border-b border-slate-50 last:border-none last:pb-0"
                                                    >
                                                        <Link
                                                            href={
                                                                "/user/templates/" +
                                                                value.slug
                                                            }
                                                            className=" flex items-center justify-between"
                                                        >
                                                            <div className=" flex items-center">
                                                                <img
                                                                    className=" h-9 mr-3 rounded-full"
                                                                    src={
                                                                        info.image
                                                                    }
                                                                    alt=""
                                                                />
                                                                <div className=" mt-1.5">
                                                                    {
                                                                        value.title
                                                                    }
                                                                </div>
                                                            </div>
                                                            <span className=" text-sm features-bg px-4 py-1 rounded-full">
                                                                {t("templates")}
                                                            </span>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    ) : (
                                        <div className=" h-32 w-full flex items-center justify-center">
                                            <div className=" text-center">
                                                <h4 className=" text-xl text-gray-700 font-medium mb-1">
                                                    {t("No results.")}
                                                </h4>
                                                <p className="  text-gray-400 text-base">
                                                    {t(
                                                        "Please Try With another work"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div> */}
                </div>
                <div class="2xl:w-2/5 xl:w-2/5 lg:w-1/2 md:w-9/12 sm:w-2/3 xs:w-4/5 flex items-center justify-end pr-5">
                    {/* <div class="flex items-center mr-4">
                        <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-lg">
                            <select
                                onChange={handleLangChange}
                                className="bg-white border-none w-full text-slate-500 font-normal  cursor-pointer rounded-lg py-2.5 px-5 z-20 appearance-none lang-select-custom-w relative"
                            >
                                {lists.map((value, index) => (
                                    <option
                                        selected={activeLang === value.code}
                                        className="text-gradient"
                                        key={index}
                                        value={value.code}
                                    >
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div> */}
                    <div
                        class="flex items-center mr-8 relative"
                        ref={clickableAreaGridRef}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            setShowDropDownGrid(!showDropDownGrid);
                        }}
                    >
                        <img
                            src={gridIcon}
                            alt=""
                            className="object-contain aspect-square w-[25px]"
                        />
                        {showDropDownGrid && (
                            <div class="absolute p-1 top-8 right-0 mt-0.5 w-48 bg-white rounded-md custom-shadow z-50">
                                <div className="flex gap-2">
                                    <ImageCard
                                        src={accountIcon}
                                        onClick={() => {
                                            window.location.href =
                                                "http://stackoverflow.com";
                                        }}
                                    />
                                    <ImageCard
                                        src={helpIcon}
                                        onClick={() => {}}
                                    />
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <ImageCard
                                        src={broadcastIcon}
                                        onClick={() => {}}
                                    />
                                    <ImageCard
                                        src={chatbotIcon}
                                        onClick={() => {}}
                                    />
                                </div>
                                <ImageCard
                                    className="mt-4"
                                    src={editorIcon}
                                    onClick={() => {}}
                                />
                            </div>
                        )}
                    </div>
                    <div class="flex flex-col items-start mr-8">
                        <p
                            style={{ maxWidth: 140 }}
                            className="font-bold text-xs text-gray-500 truncate"
                        >
                            Sarah Batrisyia
                        </p>
                        <p
                            style={{ maxWidth: 140 }}
                            className="flex flex-row items-center justify-center font-light text-xs text-gray-500 truncate"
                        >
                            <div
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    backgroundColor: "green",
                                    marginRight: 3
                                }}
                            />
                            Online
                        </p>
                    </div>
                    <div class=" contents" ref={clickableAreaRef}>
                        <div className="relative flex">
                            <button
                                type="button"
                                onClick={() => {
                                    // setShowDropDown(!showDropDown);
                                }}
                            >
                                <img
                                    style={{
                                        borderRadius: 16,
                                        width: 32,
                                        height: 32
                                    }}
                                    src={profilePng}
                                    alt=""
                                />
                            </button>
                            {/* {showDropDown && (
                                <div class="absolute top-14 right-0 mt-0.5 w-48 bg-white rounded-md custom-shadow z-50">
                                    <ul class="py-3">
                                        <li className=" border-b border-slate-50">
                                            <Link
                                                href="/user/settings"
                                                class="block px-6 py-2 icon-color hover:bg-gray-100"
                                            >
                                                <UilSetting className=" inline-block icon-color" />{" "}
                                                {t("Settings")}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/logout"
                                                class="block px-6 py-2 icon-color hover:bg-gray-100"
                                            >
                                                <UilSignOutAlt className=" inline-block icon-color" />{" "}
                                                {t("Logout")}
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const ImageCard = ({ src, onClick, className = "" }) => {
    return (
        <img
            onClick={onClick}
            src={src}
            style={{ cursor: "pointer" }}
            alt=""
            className={`object-contain shrink-0 max-w-full rounded-xl aspect-[1.08] w-[88px] ${className}`}
        />
    );
};
