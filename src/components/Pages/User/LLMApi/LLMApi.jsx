import { useState, useEffect } from "react";
import App from "../layouts/App";
import {
    UilAngleLeft,
    UilEdit,
    UilAngleRight,
    UilBookmark,
    UilTrashAltm,
    UilAngleRightB,
    UilAngleLeftB,
    UilTrashAlt,
    UilSetting,
    UilChat,
    UilSearch,
    UilPlus
} from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import StepIndicator from "./StepIndicator";
import CharacterResponseOption from "./CharacterResponseOption";
import BottomButton from "./BottomButton";
import Tooltip from "../../../Components/Tooltip";
import UploadArea from "./UploadArea";
import UrlInput from "./UrlInput";
import SummaryChatBot from "./SummaryChatBot";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { ModalDelete, ModalRefreshApi, ModalChatbot } from "../ModalDashboard";

import infoIcon from "../../../../assets/frontend/img/info.svg";
import iconDownload from "../../../../assets/frontend/img/download.png";
import iconCopy from "../../../../assets/frontend/img/copy.png";
import iconRefresh from "../../../../assets/frontend/img/refresh.png";
import iconEye from "../../../../assets/frontend/img/eye.png";
import iconFile from "../../../../assets/frontend/img/file.svg";
import iconLink from "../../../../assets/frontend/img/link.svg";
import iconTrash from "../../../../assets/frontend/img/trash.svg";
import iconKey from "../../../../assets/frontend/img/key.svg";

// Helper function to find the full path to a category
const findCategoryPath = (categories, targetId) => {
    for (const category of categories) {
        if (category.id === targetId) {
            return [category];
        }
        if (category.categories && category.categories.length > 0) {
            const childPath = findCategoryPath(category.categories, targetId);
            if (childPath) {
                // Include all categories up to and including the found child
                const index = category.categories.findIndex(
                    (c) => c.id === targetId
                );
                return [category, ...category.categories.slice(0, index + 1)];
            }
        }
    }
    return null;
};

export default function LLMApi({ auth, logo, documents, pagination }) {
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

    let categories = [
        {
            id: 1,
            name: "Chatbot Management",
            categories: [
                {
                    id: 5,
                    name: "Create Bot"
                },
                {
                    id: 6,
                    name: "Add Document"
                },
                {
                    id: 7,
                    name: "Summary"
                }
            ]
        },
        {
            id: 2,
            name: "Documents Management",
            categories: [
                {
                    id: 8,
                    name: "Add New Document"
                }
            ]
        }
        // {
        //     id: 3,
        //     name: "API Key",
        //     categories: []
        // }
        // {
        //     id: 4,
        //     name: "Crawler Management",
        //     categories: []
        // }
    ];

    const [t] = useTranslation("global");

    const [scrollPosition, setScrollPosition] = useState(0);
    const [categoryId, setCategoryId] = useState(1);

    // Find the path for the selected category ID
    const path = findCategoryPath(categories, categoryId);

    const renderContentById = (categoryId) => {
        switch (categoryId) {
            case 1:
                return <ChatbotList setCategoryId={setCategoryId} />;
            case 3:
                return (
                    <ApiKeyComponent
                        apiKeyInitial=""
                        setCategoryId={setCategoryId}
                    />
                );
            case 5:
                return <ChatbotCreation setCategoryId={setCategoryId} />;
            case 6:
                return <DocumentUpload setCategoryId={setCategoryId} />;
            case 7:
                return <SummaryChatBot setCategoryId={setCategoryId} />;
            default:
                return null;
        }
    };

    const renderExtraFieldById = () => {
        switch (categoryId) {
            case 1:
                return (
                    <div className="flex flex-row self-end">
                        {/* <form className="text-base text-gray-700 relative max-w-[200px] rounded-md bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)]">
                            <UilSearch
                                className="absolute top-1/2 left-2 y-middle icon-color"
                                size={15}
                            />
                            <input
                                id="searchInput"
                                type="search"
                                placeholder={"search"}
                                className="px-7 w-full bg-white rounded-md border-none"
                                aria-label="Search"
                                style={{ height: 30 }}
                            />
                        </form> */}
                        <button
                            style={{
                                height: 35,
                                color: "var(--gradient-green-color-1)",
                                textOverflow: "ellipsis",
                                fontSize: 12,
                                minWidth: 120
                            }}
                            onClick={() => setCategoryId(5)}
                            className="subscribe-button transition duration-300 ml-5 flex flex-row items-center"
                        >
                            <div
                                style={{
                                    height: 15,
                                    width: 15,
                                    borderRadius: 7.5,
                                    borderColor:
                                        "var(--gradient-green-color-1)",
                                    borderStyle: "solid",
                                    borderWidth: 1,
                                    marginRight: 3
                                }}
                            >
                                <UilPlus className="" size={13} />
                            </div>
                            ADD NEW BOT
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-row justify-center items-center">
                        <div>
                            <p className="text-sm font-semibold text-334155">
                                Active Date & Time
                            </p>
                            <p className="text-sm text-334155">
                                22/07/2024 19:30:00
                            </p>
                        </div>
                        <button
                            onClick={() => {}}
                            className="unsubscribe-button transition duration-300 ml-10"
                        >
                            UNSUBSCRIBE
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleScrollRight = () => {
        const container = document.querySelector(".scroll-container");
        if (container) {
            const newPosition = scrollPosition + 250;
            container.scrollTo({
                left: newPosition,
                behavior: "smooth" // This enables smooth scrolling
            });
            setScrollPosition(newPosition);
        }
    };

    const handleScrollLeft = () => {
        const container = document.querySelector(".scroll-container");
        if (container) {
            const newPosition = scrollPosition - 250;
            container.scrollTo({
                left: newPosition,
                behavior: "smooth" // This enables smooth scrolling
            });
            setScrollPosition(newPosition);
        }
    };

    const handleScroll = (e) => {
        const container = e.target;
        const newPosition = container.scrollLeft;
        setScrollPosition(newPosition);
    };

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

    const bookmark = () => {};

    return (
        <>
            <App auth={auth?.user} logo={logo}>
                <div className="p-8 flex flex-col">
                    {[1, 2].map((num) => {
                        if (num === categoryId) {
                            return (
                                <div
                                    key={num}
                                    className="flex md:flex xs:block items-center justify-between space-x-5 md:space-x-5 xs:space-x-0"
                                >
                                    <div className="w-2/5 lg:w-2/5 md:w-2/5 xs:w-4/5 md:mb-0 xs:mb-3 flex items-center overflow-hidden relative">
                                        <div className=" absolute right-1px top-0 bottom-0 bg-white flex items-center justify-center my-0.5 rounded-r-xl px-1.5">
                                            <button onClick={handleScrollRight}>
                                                <UilAngleRightB
                                                    size={18}
                                                    className=" text-slate-400"
                                                />
                                            </button>
                                        </div>
                                        {scrollPosition > 0 && (
                                            <div className=" absolute left-1px top-0 bottom-0 bg-white flex items-center justify-center my-0.5 rounded-l-xl px-1.5">
                                                <button
                                                    onClick={handleScrollLeft}
                                                >
                                                    <UilAngleLeftB
                                                        size={18}
                                                        className=" text-slate-400"
                                                    />
                                                </button>
                                            </div>
                                        )}
                                        <div
                                            className="scroll-custom-container bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto"
                                            onScroll={handleScroll}
                                        >
                                            <ul
                                                className="scroll-container px-1.5 py-1.5 rounded-xl bg-white w-full whitespace-nowrap overflow-x-auto min-w-full hide-scrollbar"
                                                onScroll={handleScroll}
                                            >
                                                {categories.map(
                                                    (value, index) => (
                                                        <li
                                                            key={index}
                                                            onClick={() =>
                                                                setCategoryId(
                                                                    value.id
                                                                )
                                                            }
                                                            className="inline-block"
                                                        >
                                                            <button
                                                                className={`${path?.[0]?.id === value.id ? "bg-gradient text-white" : "text-gray-500"} px-6 py-1.5 rounded-lg`}
                                                            >
                                                                {value.name}
                                                            </button>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}

                    <div className="flex justify-between items-center pb-4 pt-10">
                        <div>
                            <h1 className="text-xl font-semibold text-334155">
                                {path?.[path?.length - 1]?.name}
                            </h1>
                            <p
                                style={{ cursor: "pointer" }}
                                className="text-[color:var(--primary-green-color)]"
                            >
                                <span>LLM</span>
                                {path.map((crumb, index) => (
                                    <span
                                        key={crumb.id}
                                        onClick={() => setCategoryId(crumb.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {" > "}
                                        {crumb.name}
                                    </span>
                                ))}
                            </p>
                        </div>
                        {renderExtraFieldById()}
                    </div>
                    {renderContentById(categoryId)}
                </div>
            </App>
        </>
    );
}

const ApiKeyComponent = ({ apiKeyInitial, setCategoryId }) => {
    const [apiKey, setApiKey] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleShowDelete = () => setShowModalDelete(true);
    const handleCloseDelete = () => setShowModalDelete(false);

    const handleOnShowDelete = () => {
        console.log("Modal is now shown");
        // Additional logic when the modal is shown
    };

    const handleOnCloseDelete = () => {
        console.log("Modal is now hidden");
        // Additional logic when the modal is hidden
    };

    useEffect(() => {
        setApiKey(apiKeyInitial);
    }, [apiKeyInitial]);

    const onRefreshApiKey = () => {
        setShowModalDelete(true);
    };

    const onCopy = () => {
        navigator.clipboard.writeText(apiKey);
    };

    return (
        <section className="flex flex-col mt-8 w-full rounded-none bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl">
            <div className="flex flex-wrap gap-5 justify-between px-3 py-5 w-full bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                <div className="flex flex-col">
                    <h2 className="self-start text-base font-semibold text-slate-700">
                        API Key
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Use this API Key in order to access the LLM API
                    </p>
                </div>
                <div className="flex gap-4 items-center my-auto">
                    <div className="flex flex-col justify-center items-center self-stretch px-1.5 bg-teal-600 rounded-full h-[31px] w-[31px]">
                        <img
                            onClick={onRefreshApiKey}
                            src={iconRefresh}
                            className="object-contain aspect-[0.95] w-[18px]"
                            alt="Refresh API key"
                        />
                    </div>
                    <span className="flex-auto self-stretch my-auto text-sm text-slate-950">
                        {isVisible ? apiKey : "******************"}
                    </span>
                    <img
                        onClick={() => setIsVisible(!isVisible)}
                        src={iconEye}
                        className="object-contain shrink-0 self-stretch my-auto aspect-[0.94] w-[15px]"
                        alt="visibility"
                    />
                    <img
                        onClick={onCopy}
                        src={iconCopy}
                        className="object-contain shrink-0 self-stretch my-auto aspect-[0.95] w-[19px]"
                        alt="Copy API key"
                    />
                </div>
            </div>
            <ModalRefreshApi
                showModal={showModalDelete}
                handleClose={handleCloseDelete}
                title=""
                onShow={handleOnShowDelete}
                onClose={handleOnCloseDelete}
                onContinue={() => {}}
            >
                <section className="flex flex-col items-center pt-6 pb-12 bg-white rounded-xl max-md:px-5">
                    <img
                        src={iconKey}
                        className="object-contain mt-16 aspect-[0.88] w-[66px] max-md:mt-10"
                    />
                    <h2 className="mt-6 text-2xl font-semibold text-center text-slate-700">
                        Generate a New API Key
                    </h2>
                    <p className="mt-10 text-lg font-medium leading-8 text-center text-gray-500">
                        This will generate a new API key and deactivate the
                        existing key. Do you wish to continue?
                    </p>
                </section>
            </ModalRefreshApi>
        </section>
    );
};

const ChatbotModalContent = () => {
    let categories = [
        {
            id: 1,
            name: "Edit Details",
            categories: []
        },
        {
            id: 2,
            name: "My Documents",
            categories: []
        },
        {
            id: 3,
            name: "API Key",
            categories: []
        }
    ];
    const [categoryId, setCategoryId] = useState(1);

    const renderContentById = (categoryId) => {
        switch (categoryId) {
            case 1:
                return null;

            case 2:
                return null;
            case 3:
                return (
                    <ApiKeyComponent
                        apiKeyInitial="12345678s"
                        setCategoryId={setCategoryId}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="w-1/2 lg:w-1/2 md:w-1/2 xs:w-full md:mb-0 xs:mb-3 flex items-center overflow-hidden relative">
                <div className="scroll-custom-container bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto">
                    <ul className="scroll-container px-1.5 py-1.5 rounded-xl bg-white w-full whitespace-nowrap overflow-x-auto min-w-full hide-scrollbar">
                        {categories.map((value, index) => (
                            <li
                                key={index}
                                onClick={() => setCategoryId(value.id)}
                                className="inline-block"
                            >
                                <button
                                    className={`${categoryId === value.id ? "bg-gradient text-white" : "text-gray-500"} px-6 py-1.5 rounded-lg`}
                                >
                                    {value.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {renderContentById(categoryId)}
        </>
    );
};

const ChatInterface = () => {
    const messages = [
        { content: "Halo! Ini dengan siapa?", time: "9. 41 AM", isUser: true },
        {
            content:
                "Halo, Kenalin aku Jatinea, asisten yang siap membantu kamu di layanan pelanggan BJTSA. Apakah ada yang ingin kamu tanyakan tentang produk dan layanan kami?",
            time: "11.14 AM",
            isUser: false
        },
        {
            content: "Buat remaja ada apa aja ya?",
            time: "9. 41 AM",
            isUser: true
        },
        {
            content:
                "Produk tabungan khusus untuk remaja yang ditawarkan oleh BJTSA adalah BJTSA Savings Remaja. Ini dirancang untuk anak muda Indonesia mulai dari usia 12 tahun hingga 17 tahun.",
            time: "11.14 AM",
            isUser: false
        }
    ];

    return (
        <div
            className="flex flex-col rounded-xl max-w-[320px] xs:self-center md:self-start"
            style={{
                height: "60vh",
                overflowY: "scroll"
            }}
        >
            <div className="flex flex-col justify-center p-px w-full bg-white rounded-xl">
                <div className="flex relative flex-col pb-5 w-full rounded-xl aspect-[0.573]">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcf7caae906fa63565976a08c0e5d438ecc538b559763f5eee17a71e88ae8348?placeholderIfAbsent=true&apiKey=c894d7e13beb4ddfbb27cd6a29f48e4d"
                        className="object-cover absolute inset-0 size-full"
                        alt="Chat background"
                    />
                    <ChatHeader />
                    <div className="flex relative flex-col items-start px-4 pt-48 mt-5">
                        <div className="shrink-0 mt-48 max-w-full h-px border border-solid border-zinc-100 w-[282px]" />
                        <div className="flex z-10 shrink-0 h-px bg-white bg-opacity-0 w-[7px]" />
                        <div className="flex flex-col self-stretch -mt-48">
                            {messages.map((message, index) => (
                                <ChatMessage key={index} {...message} />
                            ))}
                        </div>
                        <div className="z-10 shrink-0 max-w-full h-px border border-solid border-zinc-100 w-[282px]" />
                        <div className="flex flex-col self-stretch w-full text-xs leading-loose text-neutral-200">
                            <div className="flex shrink-0 h-px bg-white bg-opacity-0 w-[7px]" />
                            <ChatInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChatbotList = ({ pagination, setCategoryId }) => {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalSetting, setShowModalSetting] = useState(false);

    const handleShowDelete = () => setShowModalDelete(true);
    const handleCloseDelete = () => setShowModalDelete(false);
    const handleShowSetting = () => setShowModalSetting(true);
    const handleCloseSetting = () => setShowModalSetting(false);

    const handleOnShowDelete = () => {
        console.log("Modal is now shown");
        // Additional logic when the modal is shown
    };

    const handleOnCloseDelete = () => {
        console.log("Modal is now hidden");
        // Additional logic when the modal is hidden
    };

    const handleOnShowSetting = () => {
        console.log("Modal is now shown");
        // Additional logic when the modal is shown
    };

    const handleOnCloseSetting = () => {
        console.log("Modal is now hidden");
        // Additional logic when the modal is hidden
    };

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

    const chatbotData = [
        {
            id: 1,
            chatbotId: "34s9af5e6",
            chatbotName: "PT Transformasi Digital Sukses Bot",
            model: "NgobrolLLM",
            status: "Inactive"
        },
        {
            id: 2,
            chatbotId: "25ar423pd",
            chatbotName: "JTSMobile Bot",
            model: "NgobrolLLM",
            status: "Active"
        }
    ];

    return (
        <div className="flex flex-col md:flex-row w-full gap-10">
            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                <div
                    style={{ height: "60vh", overflowY: "scroll" }}
                    className="overflow-x-auto border bg-white border-slate-100 rounded-xl"
                >
                    <table className="text-left">
                        <thead className="text-slate-700 font-normal table-bg ">
                            <tr className=" font-medium">
                                <td className="px-3 py-3"></td>
                                <td className="px-3 py-3">ID</td>
                                <td className="px-3 py-3">Name</td>
                                <td className="px-3 py-3">Model</td>
                                <td className="px-3 py-3">Training Status</td>
                                <td className="px-3 py-3">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {chatbotData.length > 0 ? (
                                chatbotData?.map((value, index) => {
                                    return (
                                        <tr className="bg-white border-b border-slate-50 last:border-none hover:bg-gray-50 ">
                                            <td className="px-4 py-4">
                                                <h5 className="font-base cursor-pointer justify-center text-gray-500 flex items-center space-x-1">
                                                    {value.id}
                                                </h5>
                                            </td>
                                            <td className="px-2 py-4">
                                                <h5 className="font-base justify-center text-base text-gray-500 flex items-center space-x-1">
                                                    {value.chatbotId}
                                                </h5>
                                            </td>
                                            <td className="px-2 py-4 justify-center text-base text-gray-500 font-normal">
                                                {value.chatbotName}
                                            </td>
                                            <td className="px-2 py-4 justify-center text-base text-gray-500 font-normal">
                                                {value.model}
                                            </td>
                                            <td
                                                className={`px-2 py-4 justify-center text-base text-${value.status === "Active" ? "green" : "red"}-500 font-normal`}
                                            >
                                                {value.status}
                                            </td>
                                            <td className="px-2 py-4 text-gray-600 font-medium">
                                                <div className=" flex items-center space-x-3 justify-center">
                                                    <button
                                                        onClick={
                                                            handleShowSetting
                                                        }
                                                    >
                                                        <UilSetting size={17} />
                                                    </button>
                                                    <button
                                                        onClick={
                                                            handleShowDelete
                                                        }
                                                    >
                                                        <UilTrashAlt
                                                            size={17}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-8 py-6 text-slate-400 text-center"
                                    >
                                        You have no chatbots yet. Chatbots can
                                        be created using the “Add New Bot”
                                        button.
                                    </td>
                                </tr>
                            )}
                            {chatbotData.length > 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-8 py-5 table-bg text-right text-sm"
                                    >
                                        <div className=" flex items-center justify-end space-x-6">
                                            <div>
                                                <span className=" text-gray-500 mr-1">
                                                    Rows per page:
                                                </span>{" "}
                                                <span className=" text-gray-500">
                                                    {per_page}
                                                </span>
                                            </div>
                                            <div className=" text-gray-500 mr-5">
                                                {form} - {to} of {total}
                                            </div>
                                            <div className=" flex items-center">
                                                {currentPage > 1 ? (
                                                    <Link
                                                        href={
                                                            "/user/documents?page=" +
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
                                                            "/user/documents?page=" +
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
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ModalDelete
                    showModal={showModalDelete}
                    handleClose={handleCloseDelete}
                    title=""
                    onShow={handleOnShowDelete}
                    onClose={handleOnCloseDelete}
                    onDelete={() => {}}
                >
                    <section className="flex flex-col items-center pt-6 pb-12 bg-white rounded-xl max-md:px-5">
                        <img
                            src={iconTrash}
                            className="object-contain mt-16 aspect-[0.88] w-[66px] max-md:mt-10"
                        />
                        <h2 className="mt-6 text-2xl font-semibold text-center text-slate-700">
                            Delete BJTSA Bot
                        </h2>
                        <p className="mt-10 text-lg font-medium leading-8 text-center text-gray-500">
                            Are you sure you want to delete this bot? This
                            action cannot be undone.
                        </p>
                    </section>
                </ModalDelete>
                <ModalChatbot
                    showModal={showModalSetting}
                    handleClose={handleCloseSetting}
                    title="BJTSA Bot"
                    onShow={handleOnShowSetting}
                    onClose={handleOnCloseSetting}
                >
                    <div className="px-8 flex overflow-scroll flex-col items-center pt-6 pb-12 bg-white rounded-xl max-md:px-5">
                        <ChatbotModalContent />
                    </div>
                </ModalChatbot>
            </div>
            <ChatInterface />
        </div>
    );
};

const ChatbotCreation = ({ setCategoryId }) => {
    const [name, setName] = useState("");
    const [model, setModel] = useState("NgobrolLLM");
    const [response, setResponse] = useState("Formal and Professional");
    const [instruction, setInstruction] = useState("");

    const onNameChange = (event) => {
        setName(event?.target?.value);
    };

    const onModelChange = (data) => {
        setModel(data);
    };

    const onResponseChange = (data) => {
        setResponse(data);
    };

    const onInstructionChange = (event) => {
        setInstruction(event?.target?.value);
    };

    const onPressContinue = () => {
        if (name?.length === 0) {
            toast("Please add chatbot name first", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else if (model?.length === 0) {
            toast("Please choose chatbot model first", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else if (response?.length === 0) {
            toast("Please choose chatbot response first", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else if (instruction?.length === 0) {
            toast("Please add chatbot instruction first", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else {
            setCategoryId(6);
            window?.scrollTo(0, 0);
        }
    };

    const onPressBack = () => {
        setCategoryId(1);
        window?.scrollTo(0, 0);
    };

    const onPressCancel = () => {
        setCategoryId(1);
        window?.scrollTo(0, 0);
    };

    const modelOptions = [
        {
            label: "NgobrolLLM",
            isSelected: true
        }
    ];

    const characterOptions = [
        {
            label: "Formal and Professional",
            isSelected: true,
            toolTipText:
                "e.g. “Good afternoon, regarding the problem you are experiencing, we will help you find a solution.”"
        },
        {
            label: "Casual and Conversational",
            isSelected: false,
            toolTipText: "e.g. “Hi, how can I help you today?”"
        },
        {
            label: "Direct and Instructive",
            isSelected: false,
            toolTipText: "e.g. “For this issue, you can follow these steps.”"
        },
        {
            label: "Friendly and Empathetic",
            isSelected: false,
            toolTipText:
                "e.g. “I understand the problem you are facing, let me try to help you find a solution.”"
        },
        {
            label: "Fun and Playful",
            isSelected: false,
            toolTipText:
                "e.g. “Wow, that's a great question! Let me try to help you so you don't have to worry about it.”"
        }
    ];

    return (
        <main className="flex flex-col justify-center">
            <section className="flex z-10 flex-wrap items-start self-center mt-8 w-70 ">
                <StepIndicator
                    label="Create Bot"
                    isActive={true}
                    isFirst={true}
                />
                <StepIndicator label="Add Document" isActive={false} />
                <StepIndicator label="Summary" isActive={false} isLast={true} />
            </section>
            <section className="flex flex-col px-10 items-start mt-12 w-full max-md:mt-10 max-md:max-w-full">
                <h2 className="text-lg font-medium text-gray-700">
                    Chatbot Name<span className="text-red-500">*</span>
                </h2>
                <div className="flex flex-col mt-5 w-full text-base bg-white rounded-xl text-slate-950 max-md:max-w-full">
                    <div className="flex border border-green-700 flex-col items-start py-6 pr-20 pl-6 bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                        <label htmlFor="chatbotName" className="sr-only">
                            Enter your chatbot name
                        </label>
                        <input
                            id="chatbotName"
                            type="text"
                            placeholder="Enter your chatbot name"
                            className="w-full bg-transparent border-none focus:outline-none"
                            aria-label="Enter your chatbot name"
                            defaultValue={name}
                            onChange={onNameChange}
                        />
                    </div>
                </div>
                <h2 className="mt-8 text-lg font-medium text-gray-700">
                    Model Used
                </h2>
                <div className="flex flex-col items-start mb-4 max-w-full w-[230px] max-md:ml-2.5">
                    {modelOptions.map((option, index) => (
                        <CharacterResponseOption
                            key={index}
                            label={option.label}
                            isSelected={option.label === model}
                            toolTipText={option.toolTipText}
                            onChange={onModelChange}
                        />
                    ))}
                </div>
                <h2 className="mt-3.5 text-lg font-medium text-gray-700">
                    Character Response<span className="text-red-500">*</span>
                </h2>
                <p className="mt-2 text-sm leading-none text-gray-500 max-md:max-w-full">
                    Choose and select the character that represents your brand
                    and business personality:
                </p>
                <div className="flex flex-col items-start mt-4 max-w-full w-[230px] max-md:ml-2.5">
                    {characterOptions.map((option, index) => (
                        <CharacterResponseOption
                            key={index}
                            label={option.label}
                            isSelected={option.label === response}
                            toolTipText={option.toolTipText}
                            onChange={onResponseChange}
                        />
                    ))}
                </div>
                <div className="flex gap-2 mt-8 max-md:mt-10">
                    <h2 className="grow text-lg font-medium text-gray-700">
                        Chatbot Instructions
                        <span className="text-red-500">*</span>
                    </h2>
                    <Tooltip
                        text={
                            "e.g. “Your primary goal is to assist customers with their banking needs in a professional, secure, and helpful manner. You must provide accurate information and guide users through banking processes.”"
                        }
                    >
                        <div className="flex flex-col self-start mt-1.5">
                            <img
                                alt=""
                                src={infoIcon}
                                className="object-contain w-3.5 aspect-[1.08] fill-slate-500"
                            />
                        </div>
                    </Tooltip>
                </div>
                <div className="flex flex-col items-start px-6 pt-5 pb-5 mt-5 max-w-full text-base bg-white border border-green-700 rounded-xl text-slate-950 max-md:px-5 max-md:pb-24 w-full">
                    <textarea
                        id="chatbotInstructions"
                        placeholder="Enter instructions to your chatbot"
                        className="w-full h-full bg-transparent border-none resize-none focus:outline-none"
                        aria-label="Enter instructions to your chatbot"
                        style={{ height: 150 }}
                        defaultValue={instruction}
                        onChange={onInstructionChange}
                    ></textarea>
                </div>
                <div className="flex gap-2 items-start self-end mt-14 text-sm font-medium leading-none text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                    <BottomButton
                        onPress={onPressCancel}
                        disabled={false}
                        variant="text"
                        label="Cancel"
                    />
                    <BottomButton
                        onPress={onPressBack}
                        disabled={false}
                        variant="outline"
                        label="Back"
                    />
                    <BottomButton
                        onPress={onPressContinue}
                        disabled={false}
                        variant="primary"
                        label="Continue"
                    />
                </div>
            </section>
        </main>
    );
};

const DocumentUpload = ({ pagination, setCategoryId }) => {
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

    const [documentData, setDocumentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmptyDocs, setIsEmptyDocs] = useState(true);
    // const [selectedDocument, setSelectedDocument] = useState(["1234as342"]);

    const onPressContinue = () => {
        if (isEmptyDocs) {
            toast("Please upload the file first", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else if (isLoading) {
            toast("Upload still in progress", {
                type: toast.TYPE.ERROR,
                hideProgressBar: true
            });
        } else {
            setCategoryId(7);
            window?.scrollTo(0, 0);
        }
    };

    const onPressBack = () => {
        setCategoryId(5);
        window?.scrollTo(0, 0);
    };

    const onPressCancel = () => {
        setCategoryId(1);
        window?.scrollTo(0, 0);
    };

    useEffect(() => {
        setDocumentData([
            {
                id: "1234as342",
                name: "Bank Jatis Financ...",
                type: "file",
                date: "01/08/2024 01:02:03",
                insertedBy: "Chantu"
            },
            {
                id: "71rt62j49",
                name: "produk.com/jtms",
                type: "url",
                date: "02/08/2024 11:22:33",
                insertedBy: "Abdil"
            }
        ]);
    }, []);

    const handleCheckboxChange = (id) => {
        setDocumentData((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        );
    };

    return (
        <section className="flex flex-col justify-center w-full">
            <section className="flex z-10 flex-wrap items-start self-center mt-8 w-70 ">
                <StepIndicator
                    label="Create Bot"
                    isActive={true}
                    isFirst={true}
                />
                <StepIndicator label="Add Document" isActive={true} />
                <StepIndicator label="Summary" isActive={false} isLast={true} />
            </section>
            <div className="px-10">
                <h2 className="z-10 mt-12 text-lg font-medium leading-none text-gray-700">
                    Upload New Documents<span className="text-red-500">*</span>
                </h2>
                <UploadArea
                    setIsEmptyDocs={setIsEmptyDocs}
                    setIsLoading={setIsLoading}
                />
                <UrlInput />
                <h2 className="z-10 mt-14 text-lg font-medium leading-none text-gray-700">
                    Link to Existing Documents
                </h2>
                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-auto mb-8 mt-4">
                    <div className="overflow-x-auto border bg-white border-slate-100 rounded-xl">
                        <table className="w-full text-left">
                            <thead className="text-slate-700 font-normal table-bg ">
                                <tr className=" font-medium">
                                    <td className="px-8 py-6"></td>
                                    <td className="px-3 py-6">ID</td>
                                    <td className="px-3 py-6">Name</td>
                                    <td className="px-3 py-6">Type</td>
                                    <td className="px-3 py-6">
                                        Insert Date & Time
                                    </td>
                                    <td className="px-3 py-6">Insert By</td>
                                </tr>
                            </thead>
                            <tbody>
                                {documentData.length > 0 ? (
                                    documentData?.map((value, index) => {
                                        return (
                                            <tr className="bg-white border-b border-slate-50 last:border-none   hover:bg-gray-50 ">
                                                <td className="flex px-2 py-4 justify-center items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={value?.checked}
                                                        onChange={() =>
                                                            handleCheckboxChange(
                                                                value.id
                                                            )
                                                        }
                                                    />
                                                </td>
                                                <td className="px-2 py-4 text-base text-gray-500 font-normal">
                                                    {value.id}
                                                </td>
                                                <td className="px-2 py-4 text-base text-gray-500 font-normal">
                                                    {value.name}
                                                </td>
                                                <td className="px-2 py-4 text-base flex justify-center items-centerl">
                                                    {value.type === "file" ? (
                                                        <img
                                                            src={iconFile}
                                                            alt=""
                                                            className="object-contain w-5 aspect-square"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={iconLink}
                                                            alt=""
                                                            className="object-contain w-5 aspect-square"
                                                        />
                                                    )}
                                                </td>
                                                <td className="px-2 py-4 text-base text-gray-500 font-normal">
                                                    {value.date}
                                                </td>
                                                <td className="px-2 py-4 text-base text-gray-500 font-normal">
                                                    {value.insertedBy}
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td
                                            colSpan="2"
                                            className="px-8 py-6 text-slate-400 text-center"
                                        >
                                            You have no documents yet. Please
                                            upload documents using the
                                            “Document” tab first.
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )}
                                {documentData.length > 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-8 py-5 table-bg text-right text-sm"
                                        >
                                            <div className=" flex items-center justify-end space-x-6">
                                                <div>
                                                    <span className=" text-gray-500 mr-1">
                                                        Rows per page:
                                                    </span>{" "}
                                                    <span className=" text-gray-500">
                                                        {per_page}
                                                    </span>
                                                </div>
                                                <div className=" text-gray-500 mr-5">
                                                    {form} - {to} of {total}
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
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 px-10 items-start self-end mt-14 text-sm font-medium leading-none text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <BottomButton
                    onPress={onPressCancel}
                    disabled={false}
                    variant="text"
                    label="Cancel"
                />
                <BottomButton
                    onPress={onPressBack}
                    disabled={false}
                    variant="outline"
                    label="Back"
                />
                <BottomButton
                    onPress={onPressContinue}
                    disabled={false}
                    variant="primary"
                    label="Continue"
                />
            </div>
        </section>
    );
};
