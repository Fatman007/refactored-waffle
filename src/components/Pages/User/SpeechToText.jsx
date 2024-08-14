import { useEffect, useRef, useState } from "react";
import App from "./layouts/App";
import {
    UilCopy,
    UilTrashAlt,
    UilCheckCircle,
    UilImport,
    UilHtml5Alt,
    UilTimes,
    UilCloudUpload
} from "@iconscout/react-unicons";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../../../css/editor.css";
import Spinner from "@/Components/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function SpeechToText({ auth, logo }) {
    const [IsSubmit, setIsSubmit] = useState(false);
    const audioRef = useRef(null);
    const [audioName, setAudioName] = useState("");
    const [audio, setAudio] = useState();
    const [isDropDown, setIsDropDown] = useState(false);
    const [t] = useTranslation("global");

    const [error, setError] = useState({
        param: "",
        msg: ""
    });

    const [copied, setCopied] = useState(false);
    const [text, setText] = useState("");
    const [typingTimer, setTypingTimer] = useState(null);
    const [documentId, setDocumentId] = useState();
    const [isSaveMode, setIsSaveMode] = useState(false);

    const handleChange = (event) => {
        const inputText = event.target.value;
        setText(inputText);

        // Clear previous timer
        clearTimeout(typingTimer);

        // Set a new timer to detect typing end
        const newTypingTimer = setTimeout(() => {
            if (documentId) {
                setIsSaveMode(true);

                axios
                    .post("/user/document/rename", {
                        id: documentId,
                        title: inputText
                    })
                    .then((res) => {
                        setIsSaveMode(false);
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }, 1000); // Adjust the delay as needed (in milliseconds)

        setTypingTimer(newTypingTimer);
    };

    const quillRef = useRef(null);

    const [quill, setQuill] = useState(null);

    useEffect(() => {
        setQuill(quillRef.current.editor);
    }, []);

    const modules = {
        toolbar: {
            container: [
                [
                    { header: "1" },
                    { header: "2" },
                    { header: [] },
                    { font: [] }
                ],
                ["bold", "italic", "underline"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
                ["link", "image", "code-block"],
                ["clean"]
            ]
        }
    };

    const onDragEnter = () => audioRef.current.classList.add("dragover");
    const onDragLeave = () => audioRef.current.classList.remove("dragover");
    const onDrop = () => audioRef.current.classList.remove("dragover");

    const onFileDrop = (e) => {
        const file = e.target.files[0];
        const allowedExtensions = [
            ".mp3",
            ".mp4",
            ".mpeg",
            ".mpga",
            ".m4a",
            ".mav",
            ".webm"
        ];
        const maxFileSizeMB = 25;

        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (allowedExtensions.includes("." + fileExtension)) {
            if (file.size <= maxFileSizeMB * 1024 * 1024) {
                setAudioName(file.name);
                setAudio(e.target.files);
                setError(null); // Clear any previous errors
            } else {
                setAudioName(file.name);
                setError({
                    param: "file",
                    msg: "The File Size is Too Large. Maximum allowed size is 25MB."
                });
            }
        } else {
            setAudioName(file.name);
            setError({
                param: "file",
                msg: "The File Extension is Not Allowed."
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmit(true);

        if (!audio) {
            setIsSubmit(false);
            toast.error("The File Field is Required.");
            return;
        }

        const formData = new FormData();
        formData.append("file", audio[0]);

        axios
            .post("/user/ai/audio/generate", formData)
            .then((res) => {
                const contentDelta = [{ insert: "" }]; // Initialize with an empty insert

                const responseText = res.data.text;
                setDocumentId(res.data.documentId);
                const responseWords = responseText.split(" ");

                const typingDelay = 30; // Adjust this value for typing speed

                const typingAnimation = () => {
                    if (responseWords.length === 0) {
                        // Typing animation is complete
                        quill.setContents(contentDelta);
                        setIsSubmit(false);
                        return;
                    }

                    const word = responseWords.shift();
                    contentDelta[0].insert = `${contentDelta[0].insert}${word} `;

                    quill.setContents(contentDelta);

                    setTimeout(typingAnimation, typingDelay);
                };

                typingAnimation();

                setIsSubmit(false);
            })
            .catch((error) => {
                setIsSubmit(false);
                toast.error(error.response.data);
            });
    };

    const handleInputChange = (inputUniqueName, value) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [inputUniqueName]: value
        }));

        // Clear the validation error when user starts typing
        setValidationErrors((prevValidationErrors) => ({
            ...prevValidationErrors,
            [inputUniqueName]: ""
        }));
    };

    const copyContent = () => {
        if (quillRef.current) {
            const quillInstance = quillRef.current.getEditor();
            const length = quillInstance.getLength();

            // Select the entire content of the editor
            quillInstance.setSelection(0, length);

            // Focus on the editor
            quillInstance.focus();
        }

        const htmlContent = quill.root.innerHTML;

        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = htmlContent;
        document.body.appendChild(tempTextArea);
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);

        toast.success("Content copied to clipboard.");

        setTimeout(() => {
            setCopied(false);
        }, 4000);
    };

    const clickableAreaRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                clickableAreaRef.current &&
                !clickableAreaRef.current.contains(event.target) &&
                !event.target.classList.contains("ignore-click")
            ) {
                setIsDropDown(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const downloadHtml = () => {
        const htmlContent = quill.root.innerHTML;
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "document.html";
        a.click();
    };

    const downloadWord = () => {
        const htmlContent = quill.root.innerHTML;
        const sanitizedContent = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
        const blob = new Blob([sanitizedContent], {
            type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });

        // Create a link that downloads the blob object.
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "document.docx";

        // Add the link to the DOM.
        document.body.appendChild(link);

        // Click the link to download the file.
        link.click();
    };

    const handleQuillChange = () => {
        const content = quill.root.innerHTML;

        // Clear previous timer
        clearTimeout(typingTimer);

        // Set a new timer to detect typing end
        const newTypingTimer = setTimeout(() => {
            if (documentId) {
                setIsSaveMode(true);
                axios
                    .post("/user/document/update", {
                        id: documentId,
                        data: content
                    })
                    .then((res) => {
                        setIsSaveMode(false);
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }, 1000); // Adjust the delay as needed (in milliseconds)

        setTypingTimer(newTypingTimer);
    };

    const handleUndo = () => {
        const quillEditor = quillRef.current.getEditor();
        quillEditor.history.undo();
    };

    const handleRedo = () => {
        const quillEditor = quillRef.current.getEditor();
        quillEditor.history.redo();
    };

    const deleteContent = () => {
        if (window.confirm("Are you sure you want to delete this document?")) {
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
            <head>
                <title>{t("Speech To Text")}</title>
            </head>
            <App auth={auth.user} logo={logo}>
                <div className="flex items-center justify-between px-5 py-8">
                    <div className=" flex items-center justify-between w-full">
                        <h2 className=" font-medium text-3xl text-gray-700">
                            {t("Speech To Text")}
                        </h2>
                    </div>
                </div>
                <div className="flex md:flex xs:block mx-5 mb-5 space-x-5 md:space-x-5 xs:space-x-0">
                    <form
                        onSubmit={handleSubmit}
                        className=" w-2/5 xl:w-2/5 md:w-1/2 xs:w-full md:mb-0 xs:mb-5"
                    >
                        <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-fit">
                            <div className="bg-white rounded-xl px-8 py-8 h-full">
                                <div>
                                    <label className="text-base text-gray-500">
                                        {t("Upload Audio File")}{" "}
                                        <sup className=" text-red-500">*</sup>
                                    </label>
                                    <div
                                        ref={audioRef}
                                        onDragEnter={onDragEnter}
                                        onDragLeave={onDragLeave}
                                        onDrop={onDrop}
                                        className={`relative border-dashed border-2 rounded-md bg-white py-12 mt-1 px-5 ${error && error.param === "file" && "border-red-500"}`}
                                    >
                                        <div className="text-center">
                                            <div>
                                                <UilCloudUpload
                                                    className=" mx-auto mb-1 text-slate-500"
                                                    size={40}
                                                />
                                                <p className="font-normal text-slate-600">
                                                    {t(
                                                        "Click to Upload or drag & drop"
                                                    )}
                                                </p>
                                                {audioName ? (
                                                    <small className=" text-sm text-slate-400">
                                                        {audioName}
                                                    </small>
                                                ) : (
                                                    <>
                                                        <small className=" text-slate-500 font-light">
                                                            {t(
                                                                ".mp3, .mp4, .mpeg, .mpga, .m4a, .mav or .webm"
                                                            )}
                                                        </small>
                                                        <div className=" text-gray-400 text-xs mt-1">
                                                            ({t("Max: 25MB")})
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            onChange={onFileDrop}
                                            className="absolute top-0 left-0 right-0 bottom-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    {error && error.param === "file" && (
                                        <p className=" text-red-500 text-sm mt-1">
                                            {error.msg}
                                        </p>
                                    )}
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
                                        {t("Generate Content")}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                    <div className="bg-gradient-to-r w-3/5 xl:w-3/5 md:w-1/2 xs:w-full p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                        <div className=" bg-white rounded-xl  px-8 py-8 h-fit">
                            {copied && (
                                <div className=" absolute bottom-12 left-1/2 x-middle z-30 bg-violet-500 px-6 py-3.5 text-white rounded-lg copied-message animated-opacity">
                                    <p className=" text-sm flex items-center">
                                        <UilCheckCircle
                                            size={20}
                                            className="mr-1"
                                        />{" "}
                                        {t("Content copied to clipboard.")}
                                    </p>
                                </div>
                            )}
                            <div className=" flex justify-between space-x-5 border-b border-slate-100 pb-2 mb-4">
                                <div className=" flex items-center space-x-2">
                                    <div className=" flex items-center">
                                        <button
                                            onClick={handleUndo}
                                            className=" hover:bg-violet-50 p-2 rounded-lg"
                                        >
                                            <svg
                                                className=" fill-slate-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                version="1.1"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                xmlns:svgjs="http://svgjs.com/svgjs"
                                                width="20"
                                                height="20"
                                                x="0"
                                                y="0"
                                                viewBox="0 0 24 24"
                                                xml:space="preserve"
                                            >
                                                <g>
                                                    <path d="M7 16a1 1 0 0 0 .71-.3 1 1 0 0 0 0-1.41L4.38 11h10.13a4.49 4.49 0 0 1 0 9H12a1 1 0 0 0 0 2h2.51a6.49 6.49 0 0 0 0-13H4.37L7.7 5.71a1 1 0 0 0-1.4-1.42l-5.07 5a1 1 0 0 0-.29.71 1 1 0 0 0 .3.71l5.06 5A1 1 0 0 0 7 16z"></path>
                                                </g>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={handleRedo}
                                            className=" hover:bg-violet-50 p-2 rounded-lg"
                                        >
                                            <svg
                                                className=" fill-slate-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                version="1.1"
                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                xmlns:svgjs="http://svgjs.com/svgjs"
                                                width="20"
                                                height="20"
                                                x="0"
                                                y="0"
                                                viewBox="0 0 24 24"
                                                xml:space="preserve"
                                            >
                                                <g>
                                                    <path d="M17.64 4.29a1 1 0 0 0-1.41 1.42L19.57 9H9.43a6.49 6.49 0 0 0 0 13h2.51a1 1 0 0 0 0-2H9.43a4.49 4.49 0 1 1 0-9h10.13l-3.32 3.27a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.3 1 1 0 0 0 .7-.29l5.06-5A1 1 0 0 0 23 10a1 1 0 0 0-.3-.71z"></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </div>
                                    <button
                                        onClick={copyContent}
                                        className=" hover:bg-violet-50 p-2 rounded-lg"
                                    >
                                        <UilCopy
                                            className=" text-slate-500 text-sm"
                                            size={20}
                                        />
                                    </button>
                                    <div
                                        className=" relative"
                                        ref={clickableAreaRef}
                                    >
                                        <button
                                            onClick={() =>
                                                setIsDropDown(!isDropDown)
                                            }
                                            className={`hover:bg-violet-50 p-2 rounded-lg ${isDropDown ? "bg-violet-50" : ""}`}
                                        >
                                            <UilImport
                                                className=" text-slate-500 text-sm"
                                                size={20}
                                            />
                                        </button>
                                        {isDropDown && (
                                            <div class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-violet-100 z-30">
                                                <div class="py-1 px-1">
                                                    <button
                                                        onClick={downloadWord}
                                                        class="rounded-lg font-medium px-4 py-2 text-sm text-gray-700 hover:bg-violet-100 flex items-center w-full"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 50 50"
                                                            width="25"
                                                            height="25"
                                                            className="mr-1.5"
                                                        >
                                                            <path d="M 28.8125 0.03125 L 0.8125 5.34375 C 0.339844 5.433594 0 5.863281 0 6.34375 L 0 43.65625 C 0 44.136719 0.339844 44.566406 0.8125 44.65625 L 28.8125 49.96875 C 28.875 49.980469 28.9375 50 29 50 C 29.230469 50 29.445313 49.929688 29.625 49.78125 C 29.855469 49.589844 30 49.296875 30 49 L 30 1 C 30 0.703125 29.855469 0.410156 29.625 0.21875 C 29.394531 0.0273438 29.105469 -0.0234375 28.8125 0.03125 Z M 32 6 L 32 13 L 44 13 L 44 15 L 32 15 L 32 20 L 44 20 L 44 22 L 32 22 L 32 27 L 44 27 L 44 29 L 32 29 L 32 35 L 44 35 L 44 37 L 32 37 L 32 44 L 47 44 C 48.101563 44 49 43.101563 49 42 L 49 8 C 49 6.898438 48.101563 6 47 6 Z M 4.625 15.65625 L 8.1875 15.65625 L 10.21875 28.09375 C 10.308594 28.621094 10.367188 29.355469 10.40625 30.25 L 10.46875 30.25 C 10.496094 29.582031 10.613281 28.855469 10.78125 28.0625 L 13.40625 15.65625 L 16.90625 15.65625 L 19.28125 28.21875 C 19.367188 28.679688 19.433594 29.339844 19.5 30.21875 L 19.53125 30.21875 C 19.558594 29.53125 19.632813 28.828125 19.75 28.125 L 21.75 15.65625 L 25.0625 15.65625 L 21.21875 34.34375 L 17.59375 34.34375 L 15.1875 22.375 C 15.058594 21.75 14.996094 21.023438 14.96875 20.25 L 14.9375 20.25 C 14.875 21.101563 14.769531 21.824219 14.65625 22.375 L 12.1875 34.34375 L 8.4375 34.34375 Z" />
                                                        </svg>{" "}
                                                        <span>
                                                            {t("MS Word")}
                                                        </span>
                                                    </button>
                                                    <button
                                                        onClick={downloadHtml}
                                                        class="flex w-full font-medium text-slate-600 items-center rounded-lg px-4 py-2 text-sm hover:bg-violet-100 "
                                                    >
                                                        <UilHtml5Alt
                                                            className=" mr-1.5"
                                                            size={25}
                                                        />{" "}
                                                        <span>{t("HTML")}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {documentId && (
                                        <>
                                            <span className=" bg-slate-50 text-xs px-3 text-slate-500 rounded-md py-1.5 flex items-center space-x-1">
                                                {isSaveMode ? (
                                                    <>
                                                        <span>
                                                            {t("Saving...")}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <UilCheckCircle
                                                            size={14}
                                                        />{" "}
                                                        <span>
                                                            {t("Saved")}
                                                        </span>
                                                    </>
                                                )}
                                            </span>
                                            <button
                                                onClick={deleteContent}
                                                className="hover:bg-red-50 p-2 rounded-lg"
                                            >
                                                <UilTrashAlt
                                                    size={20}
                                                    className=" text-red-500 text-sm "
                                                />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            <input
                                type="text"
                                onChange={handleChange}
                                placeholder={t("Untitled Document...")}
                                className="p-0 w-full border-none placeholder:text-xl placeholder:text-slate-400 text-xl text-gray-700 font-medium placeholder:font-normal"
                                defaultValue={text}
                            />
                            <ReactQuill
                                theme="snow"
                                onChange={handleQuillChange}
                                ref={quillRef}
                                modules={modules}
                            />
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}
