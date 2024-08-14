import { useState } from "react";
import App from "./layouts/App";
import {
    UilQuestionCircle,
    UilImport,
    UilTrashAlt
} from "@iconscout/react-unicons";
import axios from "axios";
import Spinner from "@/Components/Spinner";
import { toast } from "react-hot-toast";
import { Head } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";

export default function AiImages({ auth, logo, images }) {
    const [text, setText] = useState("");
    const [showAdditional, setShowAdditional] = useState(false);
    const [imageStyle, setImageStyle] = useState("");
    const [mood, setMood] = useState("");
    const [resolution, setResolution] = useState("256x256");
    const [count, setCount] = useState(1);
    const [isSubmit, setIsSubmit] = useState(false);
    const [Images, setImages] = useState(images.data);
    const [t] = useTranslation("global");

    const handleSubmit = (e) => {
        setIsSubmit(true);
        e.preventDefault();

        axios
            .post("/user/ai/image/generate", {
                prompt: text,
                imageStyle: imageStyle,
                mood: mood,
                resolution: resolution,
                count: count
            })
            .then((res) => {
                setIsSubmit(false);
                setText("");
                // Assuming res.data is an array and you want to remove an array from it
                const modifiedData = res.data.map((item) => {
                    // Modify 'item' if needed
                    return item; // Or modify and return the modified item
                });

                setImages((prevImages) => [
                    ...modifiedData.reverse(),
                    ...prevImages
                ]);
            })
            .catch((error) => {
                setIsSubmit(false);
                console.log(error);
                toast.error(error.response.data);
            });
    };

    const createSlug = (title) => {
        const cleanedTitle = title.toLowerCase().replace(/[^\w\s-]/g, "");
        const slug = cleanedTitle.replace(/\s+/g, "-");
        return slug;
    };

    const downloadImage = (imageUrl, title) => {
        const link = document.createElement("a");
        link.href = imageUrl;
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        const parts = filename.split(".");
        const imageExtension = parts[parts.length - 1];
        link.download = createSlug(title) + "." + imageExtension;
        link.click();
    };

    const deleteImage = (id) => {
        // Filter out the object with the specified id
        const updatedImages = Images.filter((image) => image.id !== id);

        // Update the state with the new array
        setImages(updatedImages);

        axios
            .post("/user/image/delete", {
                id: id
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Head>
                <title>{t("AiImages")}</title>
            </Head>
            <App auth={auth.user} logo={logo}>
                <div className="flex items-center justify-between px-5 py-8">
                    <div className=" flex items-center justify-between w-full">
                        <h2 className=" font-medium text-3xl text-gray-700">
                            {t("Image Generator")}
                        </h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className=" bg-gradient custom-vector-bg relative mx-5 rounded-2xl h-fit py-20 flex items-center justify-center">
                        <div className=" w-3/4">
                            <button
                                onClick={() =>
                                    setShowAdditional(!showAdditional)
                                }
                                type="button"
                                className="mb-1 z-10 relative text-slate-300 flex items-center"
                            >
                                <UilQuestionCircle className=" inline-block mr-1" />{" "}
                                <div className=" font-medium mt-0.5">
                                    {t("Advanced Options")}
                                </div>{" "}
                            </button>
                            <div
                                className={`bg-white w-full mb-3 relative z-10 rounded-xl p-4 transition-all delay-150 ${showAdditional ? "additional-section" : "hide"}`}
                            >
                                <div className="w-full flex md:flex xs:block items-center md:space-x-3 overflow-hidden">
                                    <div className=" w-full md:mb-0 xs:mb-3">
                                        <label className=" text-slate-500 text-sm">
                                            {t("Image Style")}
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setImageStyle(e.target.value)
                                            }
                                            className=" w-full border px-4 text-sm border-slate-100 rounded-lg mt-0.5 h-12 cursor-pointer text-slate-500"
                                        >
                                            <option value="">
                                                {t("None")}
                                            </option>
                                            <option value={t("Abstract")}>
                                                {t("Abstract")}
                                            </option>
                                            <option value={t("Realstic")}>
                                                {t("Realstic")}
                                            </option>
                                            <option value={t("Cartoon")}>
                                                {t("Cartoon")}
                                            </option>
                                            <option value={t("Digital Art")}>
                                                {t("Digital Art")}
                                            </option>
                                            <option value={t("Illustration")}>
                                                {t("Illustration")}
                                            </option>
                                            <option value={t("Photography")}>
                                                {t("Photography")}
                                            </option>
                                            <option value={t("3D Render")}>
                                                {t("3D Render")}
                                            </option>
                                            <option value={t("Pencil Drawing")}>
                                                {t("Pencil Drawing")}
                                            </option>
                                        </select>
                                    </div>
                                    <div className=" w-full md:mb-0 xs:mb-3">
                                        <label className=" text-slate-500 text-sm">
                                            {t("Mood")}
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setMood(e.target.value)
                                            }
                                            className=" w-full border px-4 text-sm border-slate-100 rounded-lg mt-0.5 h-12 cursor-pointer text-slate-500"
                                        >
                                            <option value="">
                                                {t("None")}
                                            </option>
                                            <option value={t("Angry")}>
                                                {t("Angry")}
                                            </option>
                                            <option value={t("Agressive")}>
                                                {t("Agressive")}
                                            </option>
                                            <option value={t("Calm")}>
                                                {t("Calm")}
                                            </option>
                                            <option value={t("Cheerful")}>
                                                {t("Cheerful")}
                                            </option>
                                            <option value={t("Chilling")}>
                                                {t("Chilling")}
                                            </option>
                                            <option value={t("Dark")}>
                                                {t("Dark")}
                                            </option>
                                            <option value={t("Happy")}>
                                                {t("Happy")}
                                            </option>
                                            <option value={t("Sad")}>
                                                {t("Sad")}
                                            </option>
                                        </select>
                                    </div>
                                    <div className=" w-full md:mb-0 xs:mb-3">
                                        <label className=" text-slate-500 text-sm">
                                            {t("Image Resolution")}
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setResolution(e.target.value)
                                            }
                                            className=" w-full border px-4 text-sm border-slate-100 rounded-lg mt-0.5 h-12 cursor-pointer text-slate-500"
                                        >
                                            <option value="256x256">
                                                {t("Small [256 x 256]")}
                                            </option>
                                            <option value="512x512">
                                                {t("Medium [512 x 512]")}
                                            </option>
                                            <option value="1024x1024">
                                                {t("Large [1024 x 1024]")}
                                            </option>
                                        </select>
                                    </div>
                                    <div className=" w-full md:mb-0 xs:mb-3">
                                        <label className=" text-slate-500 text-sm">
                                            {t("Number of Results")}
                                        </label>
                                        <select
                                            onChange={(e) =>
                                                setCount(e.target.value)
                                            }
                                            className=" w-full border px-4 text-sm border-slate-100 rounded-lg mt-0.5 h-12 cursor-pointer text-slate-500"
                                        >
                                            <option value="1">{t("1")}</option>
                                            <option value="2">{t("2")}</option>
                                            <option value="3">{t("3")}</option>
                                            <option value="4">{t("4")}</option>
                                            <option value="5">{t("5")}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="relative z-10">
                                <input
                                    onChange={(e) => setText(e.target.value)}
                                    value={text}
                                    type="text"
                                    className=" w-full border-none py-4 sm:py-4 xs:py-3.5 px-8 rounded-full placeholder:text-slate-200 text-black font-medium placeholder:font-normal"
                                    placeholder={t(
                                        "Example: Kangaroo carrying a corgi in cartoon style"
                                    )}
                                />
                                {isSubmit ? (
                                    <button
                                        disabled
                                        className=" absolute sm:absolute xs:relative top-1/2 sm:top-1/2 xs:top-8 right-1.5 sm:right-1.5 xs:right-0 sm:w-auto xs:w-full bg-gradient sm:border-none xs:border xs:border-white opacity-40 text-white px-10 py-2.5 y-middle rounded-full cursor-not-allowed"
                                    >
                                        {t("Please Wait ...")}
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className=" absolute sm:absolute xs:relative top-1/2 sm:top-1/2 xs:top-8 right-1.5 sm:right-1.5 xs:right-0 sm:w-auto xs:w-full bg-gradient sm:border-none xs:border xs:border-white text-white px-10 py-2.5 y-middle rounded-full"
                                    >
                                        {t("Generate Image")}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
                <div className="mt-5 m-5">
                    <div className=" bg-white rounded-xl p-8">
                        <h2 className=" text-xl font-medium mb-4 text-slate-700">
                            {t("Generated Image Result")}
                        </h2>
                        <div className=" grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-5">
                            {isSubmit &&
                                (() => {
                                    const elements = [];
                                    for (let i = 1; i <= count; i++) {
                                        elements.push(
                                            <div
                                                key={i}
                                                className="border border-slate-100 rounded-lg p-3 flex items-center justify-center h-177"
                                            >
                                                <Spinner
                                                    strokeColor={
                                                        "stroke-slate-300"
                                                    }
                                                    size={25}
                                                />
                                            </div>
                                        );
                                    }
                                    return elements;
                                })()}
                            {Images.map((image, index) => {
                                const info = JSON.parse(image.data ?? "");
                                return (
                                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-lg h-fit">
                                        <div
                                            key={index}
                                            className=" bg-white rounded-lg p-3 relative transition-all delay-75 group"
                                        >
                                            <img
                                                className=" w-full object-cover rounded-lg mb-5 h-177"
                                                src={info.image}
                                                alt=""
                                            />
                                            <h5 className=" mt-2 text-gray-500 text-base font-medium">
                                                {image.title.length > 20
                                                    ? `${image.title.substring(0, 20)}...`
                                                    : image.title}
                                            </h5>
                                            <p className=" text-sm text-gray-300">
                                                {t("Size")}: {info.size}
                                            </p>
                                            <div className=" absolute bottom-16 left-1/2 x-middle group-hover:bottom-24 transition-all delay-75 invisible group-hover:visible">
                                                <button
                                                    onClick={() =>
                                                        downloadImage(
                                                            info.image,
                                                            image.title
                                                        )
                                                    }
                                                    className=" bg-white shadow p-2 rounded-full mr-4"
                                                >
                                                    <UilImport size={22} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        deleteImage(image.id)
                                                    }
                                                    className="bg-white shadow p-2 rounded-full"
                                                >
                                                    <UilTrashAlt size={22} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </App>
        </>
    );
}
