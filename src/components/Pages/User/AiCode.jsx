import { Head } from "@inertiajs/inertia-react";
import App from "./layouts/App";
import { UilCopy, UilTrashAlt, UilCheckCircle } from "@iconscout/react-unicons";
import { useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-hot-toast";
import showdown from "showdown";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "../../../css/code.css";
import { useTranslation } from "react-i18next";

export default function AiCode({ auth, logo }) {
    const [prompt, setPrompt] = useState("");
    const [language, setLanguage] = useState("Javascript");
    const [level, setLevel] = useState("Noob");
    const [content, setContent] = useState("");
    const [IsSubmit, setIsSubmit] = useState(false);
    const [copied, setCopied] = useState(false);
    const [documentId, setDocumentId] = useState(null);
    const codeRef = useRef(null);
    const [t] = useTranslation("global");
    const [error, setError] = useState({
        param: "",
        msg: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmit(true);

        if (!prompt) {
            setIsSubmit(false);
            return setError({
                param: "prompt",
                msg: "The Code Description Field Is Required"
            });
        }

        if (!language) {
            setIsSubmit(false);
            return setError({
                param: "language",
                msg: "The Language Field Is Required"
            });
        }

        const encodedPrompt = encodeURIComponent(prompt);

        const eventSource = new EventSource(
            `/user/ai/code/generate?prompt=${encodedPrompt}&language=${language}&level=${level}`
        );

        let responseData = "";
        eventSource.addEventListener("message", function (event) {
            if (event.data === "[DONE]") {
                eventSource.close();

                const content = responseData;

                const formData = new FormData();
                formData.append("type", "aiCode");
                formData.append("content", content);

                axios
                    .post("/user/ai/document/store", formData)
                    .then((res) => {
                        setDocumentId(res.data.documentId);
                        setIsSubmit(false);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                return;
            }

            responseData += event.data;
            let new_data = "";
            new_data = responseData.replace(/\\n/g, "\n");
            let code_block_count = (new_data.match(/```/g) || []).length;
            if (code_block_count % 2 !== 0) {
                new_data += "\n```";
            }
            const converter = new showdown.Converter();
            converter.setOption("simplifiedAutoLink", true);
            const htmlContent = converter.makeHtml(new_data);
            const parsedContent = parseAndHighlightCode(htmlContent);
            setContent(parsedContent);
        });

        eventSource.addEventListener("stop", function (event) {
            eventSource.close();
            setIsSubmit(false);
            toast.error(event.data);
        });
    };

    const parseAndHighlightCode = (htmlContent) => {
        const parser = new DOMParser();
        const parsedDocument = parser.parseFromString(htmlContent, "text/html");

        // Get all <code> elements and apply syntax highlighting
        const codeElements = parsedDocument.querySelectorAll("code");
        codeElements.forEach((codeElement) => {
            hljs.highlightBlock(codeElement);
        });

        return parsedDocument.body.innerHTML;
    };

    const copyContent = () => {
        const htmlContent = content;

        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = htmlContent;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();

        try {
            const successful = document.execCommand("copy");
            if (successful) {
                toast.success("Content copied to clipboard.");
                setTimeout(() => {
                    setCopied(false);
                }, 4000);
            } else {
                console.error("Copying to clipboard failed");
            }
        } catch (error) {
            console.error("Copying to clipboard failed:", error);
        } finally {
            document.body.removeChild(tempTextArea);
        }
    };

    const deleteCode = () => {
        if (window.confirm("Are you sure to want delete the code document?")) {
            axios
                .post("/user/document/delete", {
                    id: documentId
                })
                .then((res) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <>
            <Head>
                <title>{t("AI Code")}</title>
            </Head>
            <App auth={auth.user} logo={logo} className="relative">
                {copied && (
                    <div className=" absolute bottom-12 left-1/2 x-middle z-30 bg-violet-500 px-6 py-3.5 text-white rounded-lg copied-message animated-opacity">
                        <p className=" text-sm flex items-center">
                            <UilCheckCircle size={20} className="mr-1" />{" "}
                            {t("Content copied to clipboard.")}
                        </p>
                    </div>
                )}
                <div className="flex items-center justify-between px-5 py-8">
                    <div className=" flex items-center justify-between w-full">
                        <h2 className=" font-medium text-3xl text-gray-700">
                            {t("AI Code Generator")}
                        </h2>
                    </div>
                </div>
                <div className="flex md:flex xs:block mx-5 space-x-5 md:space-x-5 xs:space-x-0">
                    <form
                        onSubmit={handleSubmit}
                        className=" w-2/5 xl:w-2/5 md:w-1/2 xs:w-full md:mb-0 xs:mb-5 h-fit"
                    >
                        <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                            <div className=" bg-white rounded-xl  px-8 py-8 h-full">
                                <div>
                                    <label className="text-base text-gray-500">
                                        {t("Code Description")}{" "}
                                        <sup className=" text-red-500">*</sup>
                                    </label>
                                    <textarea
                                        onChange={(e) =>
                                            setPrompt(e.target.value)
                                        }
                                        defaultValue={prompt}
                                        cols="30"
                                        rows="8"
                                        className={`mt-1.5 py-3 px-5 placeholder:text-slate-300 placeholder:text-sm bg-white border rounded-lg w-full ${error && error.param === "prompt" ? "border-custom-red" : "border-slate-100"}`}
                                        placeholder={t(
                                            "Briefly write down the description of the problem you want to solve.."
                                        )}
                                    ></textarea>
                                    {error && error.param === "prompt" && (
                                        <p className=" text-sm text-red-500">
                                            {error.msg}
                                        </p>
                                    )}
                                </div>
                                <div className="flex sm:flex xs:block mt-5 space-x-5 sm:space-x-5 xs:space-x-0">
                                    <div className=" w-1/2 sm:w-1/2 xs:w-full sm:mb-0 xs:mb-5">
                                        <label className="text-base text-gray-500">
                                            {t("Coding Language")}
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                setLanguage(e.target.value)
                                            }
                                            type="text"
                                            className={`mt-1.5 py-3 px-5 placeholder:text-slate-300 placeholder:text-sm bg-white border rounded-lg w-full ${error && error.param === "language" ? "border-red-500" : "border-slate-100"}`}
                                            placeholder={t(
                                                "Example: PHP, JAVA etc"
                                            )}
                                        />
                                        {error &&
                                            error.param === "language" && (
                                                <p className=" text-sm text-red-500 mt-0.5">
                                                    {error.msg}
                                                </p>
                                            )}
                                    </div>
                                    <div className=" w-1/2 sm:w-1/2 xs:w-full">
                                        <label className="text-base text-gray-500">
                                            {t("Code Level")}
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setLevel(e.target.value)
                                            }
                                            className=" mt-1.5 text-gray-500 bg-white w-full rounded-lg py-3 px-5 border border-slate-100 cursor-pointer"
                                        >
                                            <option value={t("Noob")}>
                                                {t("Noob")}
                                            </option>
                                            <option value={t("Moderate")}>
                                                {t("Moderate")}
                                            </option>
                                            <option value={t("High")}>
                                                {t("High")}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {IsSubmit ? (
                                    <button
                                        disabled
                                        className=" bg-gradient opacity-40 text-white rounded-lg w-full py-3.5 mt-5 cursor-not-allowed"
                                    >
                                        {t("Please Wait...")}
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" bg-gradient text-white rounded-lg w-full py-3.5 mt-5"
                                    >
                                        {t("Write My Code")}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="bg-gradient-to-r  w-3/5 xl:w-3/5 md:w-1/2 xs:w-full  p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                        <div className=" bg-white rounded-xl px-8 py-8 h-full">
                            <div className=" border-b border-slate-100 pb-2 mb-2">
                                <button
                                    onClick={copyContent}
                                    className="mr-1 hover:bg-violet-50 p-2 rounded-lg"
                                >
                                    <UilCopy className=" text-gray-500" />
                                </button>
                                {documentId && (
                                    <button
                                        type="button"
                                        onClick={deleteCode}
                                        className="hover:bg-red-50 p-2 rounded-lg"
                                    >
                                        <UilTrashAlt className=" text-red-500" />
                                    </button>
                                )}
                            </div>
                            <div className=" mt-5">
                                <div
                                    className="ai-code"
                                    ref={codeRef}
                                    dangerouslySetInnerHTML={{
                                        __html: content
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}
