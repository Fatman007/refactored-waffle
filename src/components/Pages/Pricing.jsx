import React, { useRef, useState } from "react";
import { Head, Link } from "@inertiajs/inertia-react";
import FrontendApp from "@/Layouts/Frontentapp";
import { useTranslation } from "react-i18next";

const Pricing = (props) => {
    const [planType, setPlanType] = useState("monthly");
    const { t } = useTranslation("global");

    function convertNumber(num) {
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

    return (
        <>
            <Head>
                <title>{props.seo_pricing.name}</title>
                <meta
                    name="tags"
                    content={
                        JSON.parse(props.seo_pricing.seometa.value).meta_tag
                    }
                />
                <meta
                    name="keywords"
                    content={
                        JSON.parse(props.seo_pricing.seometa.value)
                            .meta_description
                    }
                />
                <meta
                    name="twitter:title"
                    content={
                        JSON.parse(props.seo_pricing.seometa.value)
                            .twitter_title
                    }
                />
            </Head>
            <FrontendApp
                locate={props.locate}
                settings={props.settings}
                menuitems={props.menuitems}
                hero={props.hero}
                footer_first_menuitems={props.footer_first_menuitems}
                footer_second_menuitems={props.footer_second_menuitems}
                footer_third_menuitems={props.footer_third_menuitems}
                footer_four_menuitems={props.footer_four_menuitems}
            >
                {/* breadcrumb area start */}
                <div className=" py-12 secondary-bg ">
                    <div className="text-left container mx-auto relative">
                        <img
                            className="absolute -top-40 blur-3xl -right-0 z-1 sm:block xs:hidden"
                            src="/frontend/img/header/hello1.png"
                            alt=""
                        />
                        <div className=" flex sm:flex xs:block items-center sm:justify-between xs:justify-center">
                            <div className=" sm:text-left xs:text-center">
                                <h2 className=" 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl xs:text-4xl font-bold text-white">
                                    {t("Pricing")}{" "}
                                    <span className="text-gradient">
                                        {t("Plans")}
                                    </span>
                                </h2>
                                <nav
                                    className="flex sm:justify-start xs:justify-center py-3 text-gray-700 rounded-lg"
                                    aria-label="Breadcrumb"
                                >
                                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                        <li>
                                            <div className="flex items-center">
                                                <Link
                                                    href="/"
                                                    className="ml-1 text-lg font-normal text-slate-200 md:ml-2"
                                                >
                                                    {t("Home")}
                                                </Link>
                                            </div>
                                        </li>
                                        <li aria-current="page">
                                            <div className="flex items-center">
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-6 h-6 text-slate-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <span className="ml-1 text-lg font-normal text-slate-400 md:ml-2">
                                                    {t("Pricing Plans")}
                                                </span>
                                            </div>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="sm:block xs:hidden">
                                <img
                                    className="h-56 right-10"
                                    src="/frontend/img/custom-shape1.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* breadcrumb area end */}
                <div className="mt-40 container mx-auto">
                    <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-full 2xl:w-28p xl:w-28p lg:w-1/3 md:w-1/2 sm:w-3/5 mx-auto mt-8 relative">
                        <div className="secondary-bg flex items-center justify-between p-2 rounded-full">
                            <button
                                onClick={() => setPlanType("monthly")}
                                className={`${planType === "monthly" ? "bg-gradient" : ""} text-white px-12 py-3 rounded-full text-lg font-medium`}
                            >
                                {t("Monthly")}
                            </button>
                            <button
                                onClick={() => setPlanType("yearly")}
                                className={`${planType === "yearly" ? "bg-gradient" : ""} text-white px-12 py-3 rounded-full text-lg font-medium`}
                            >
                                {t("Yearly")}
                            </button>
                        </div>
                    </div>
                    <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 xs:md:grid-cols-1 gap-5 mt-12">
                        {planType &&
                            planType === "monthly" &&
                            props.monthlyPlans.map((value, index) => {
                                const info = JSON.parse(value.data);
                                return (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl h-fit"
                                    >
                                        <div className="secondary-bg px-9 py-11 rounded-2xl h-full">
                                            <div className=" border-b border-color-2D3956 mb-7 pb-7">
                                                <h4 className=" text-white text-2xl mb-6">
                                                    {value.name}
                                                </h4>
                                                <div className=" flex items-center">
                                                    {value.price === 0 ? (
                                                        <h1 className=" text-white text-6xl sm:text-6xl xs:text-5xl font-bold">
                                                            {t("Free")}
                                                        </h1>
                                                    ) : (
                                                        <>
                                                            <h1 className=" text-white text-6xl sm:text-6xl xs:text-5xl font-bold">
                                                                {props.currency}
                                                                {value.price}
                                                            </h1>
                                                            <sub className=" text-E0DDDD text-xl ml-2">
                                                                /{t("monthly")}
                                                            </sub>
                                                        </>
                                                    )}
                                                </div>
                                                {value.accept_trail === 1 ? (
                                                    <p className="mt-2 text-gray-400">
                                                        {t("Get your")}{" "}
                                                        {info.trail_days}{" "}
                                                        {t("days free trial.")}
                                                    </p>
                                                ) : (
                                                    <p className="mt-2 text-gray-400">
                                                        {info.short_content}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <ul>
                                                    <li className=" flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="33"
                                                            height="33"
                                                            viewBox="0 0 31 31"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                fill="#4ECB71"
                                                            />
                                                        </svg>{" "}
                                                        <span>
                                                            <strong>
                                                                {info.word_limit ==
                                                                -1
                                                                    ? "Unlimited"
                                                                    : convertNumber(
                                                                          info.word_limit
                                                                      )}
                                                            </strong>{" "}
                                                            {t(
                                                                "Monthly Word Limit"
                                                            )}
                                                        </span>
                                                    </li>
                                                    {info.ai_templates ===
                                                        1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                <strong>
                                                                    {info.templates_limit ==
                                                                    -1
                                                                        ? "All"
                                                                        : info.templates_limit +
                                                                          "+"}
                                                                </strong>{" "}
                                                                {t(
                                                                    "AI Templates"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_images === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                <strong>
                                                                    {info.image_limit ==
                                                                    -1
                                                                        ? "Unlimited"
                                                                        : info.image_limit}
                                                                </strong>{" "}
                                                                {t(
                                                                    "Images Per Month"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_chatbot === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                <strong>
                                                                    {info.chatbot_limit ==
                                                                    -1
                                                                        ? "Unlimited"
                                                                        : info.chatbot_limit}
                                                                </strong>{" "}
                                                                {t(
                                                                    "Chatbot Per Month"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_speech_to_text ===
                                                        1 && (
                                                        <>
                                                            <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="33"
                                                                    height="33"
                                                                    viewBox="0 0 31 31"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                        fill="#4ECB71"
                                                                    />
                                                                </svg>{" "}
                                                                <span>
                                                                    <strong>
                                                                        {info.speech_to_text_limit ==
                                                                        -1
                                                                            ? "Unlimited"
                                                                            : info.speech_to_text_limit}
                                                                    </strong>{" "}
                                                                    {t(
                                                                        "Speech To Text Per Month"
                                                                    )}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="33"
                                                                    height="33"
                                                                    viewBox="0 0 31 31"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                        fill="#4ECB71"
                                                                    />
                                                                </svg>{" "}
                                                                <span>
                                                                    <strong>
                                                                        {
                                                                            info.audio_file_size
                                                                        }
                                                                        {t(
                                                                            "MB"
                                                                        )}
                                                                    </strong>{" "}
                                                                    {t(
                                                                        "Audio file size limit"
                                                                    )}
                                                                </span>
                                                            </li>
                                                        </>
                                                    )}
                                                    {info.access_to_gpt3 ===
                                                        1 && (
                                                        <li className=" flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {t(
                                                                    "GPT-3.5 Access"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.accept_to_gpt4 ===
                                                        1 && (
                                                        <li className=" flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {t(
                                                                    "GPT-4 Access"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_templates ===
                                                        1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Templates"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_chatbot === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Chatbot"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_images === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t("Ai Images")}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_code === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Code Generator"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_speech_to_text ===
                                                        1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Speech To Text"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="border-color-2D3956 border-t mt-7 pt-7">
                                                <Link
                                                    href="/user/plan"
                                                    className=" bg-gradient text-white w-full py-3.5 rounded-full font-medium text-lg block text-center"
                                                >
                                                    {t("Subscribe Now")}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        {planType &&
                            planType === "yearly" &&
                            props.yearlyPlans.map((value, index) => {
                                const info = JSON.parse(value.data);
                                return (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl h-fit"
                                    >
                                        <div className="secondary-bg px-9 py-11 rounded-2xl h-full">
                                            <div className=" border-b border-color-2D3956 mb-7 pb-7">
                                                <h4 className=" text-white text-2xl mb-6">
                                                    {value.name}
                                                </h4>
                                                <div className=" flex items-center">
                                                    {value.price === 0 ? (
                                                        <h1 className=" text-white text-6xl sm:text-6xl xs:text-5xl font-bold">
                                                            {t("Free")}
                                                        </h1>
                                                    ) : (
                                                        <>
                                                            <h1 className=" text-white text-6xl sm:text-6xl xs:text-5xl font-bold">
                                                                {props.currency}
                                                                {value.price}
                                                            </h1>
                                                            <sub className=" text-E0DDDD text-xl ml-2">
                                                                /{t("yearly")}
                                                            </sub>
                                                        </>
                                                    )}
                                                </div>
                                                {value.accept_trail === 1 ? (
                                                    <p className="mt-2 text-gray-400">
                                                        {t("Get your")}{" "}
                                                        {info.trail_days}{" "}
                                                        {t("days free trial.")}
                                                    </p>
                                                ) : (
                                                    <p className="mt-2 text-gray-400">
                                                        {info.short_content}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <ul>
                                                    <li className=" flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="33"
                                                            height="33"
                                                            viewBox="0 0 31 31"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fill-rule="evenodd"
                                                                clip-rule="evenodd"
                                                                d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                fill="#4ECB71"
                                                            />
                                                        </svg>{" "}
                                                        <span>
                                                            <strong>
                                                                {info.word_limit ==
                                                                -1
                                                                    ? "Unlimited"
                                                                    : convertNumber(
                                                                          info.word_limit
                                                                      )}
                                                            </strong>{" "}
                                                            {t(
                                                                "Monthly Word Limit"
                                                            )}
                                                        </span>
                                                    </li>
                                                    {info.ai_templates ===
                                                        1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                <strong>
                                                                    {info.templates_limit ==
                                                                    -1
                                                                        ? "All"
                                                                        : info.templates_limit +
                                                                          "+"}
                                                                </strong>{" "}
                                                                {t(
                                                                    "AI Templates"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_images === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                <strong>
                                                                    {info.image_limit ==
                                                                    -1
                                                                        ? "Unlimited"
                                                                        : info.image_limit}
                                                                </strong>{" "}
                                                                {t(
                                                                    "Images Per Month"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_chatbot === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                <strong>
                                                                    {info.chatbot_limit ==
                                                                    -1
                                                                        ? "Unlimited"
                                                                        : info.chatbot_limit}
                                                                </strong>{" "}
                                                                {t(
                                                                    "Chatbot Per Month"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_speech_to_text ===
                                                        1 && (
                                                        <>
                                                            <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="33"
                                                                    height="33"
                                                                    viewBox="0 0 31 31"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                        fill="#4ECB71"
                                                                    />
                                                                </svg>{" "}
                                                                <span>
                                                                    <strong>
                                                                        {info.speech_to_text_limit ==
                                                                        -1
                                                                            ? "Unlimited"
                                                                            : info.speech_to_text_limit}
                                                                    </strong>{" "}
                                                                    {t(
                                                                        "Speech To Text Per Month"
                                                                    )}
                                                                </span>
                                                            </li>
                                                            <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    width="33"
                                                                    height="33"
                                                                    viewBox="0 0 31 31"
                                                                    fill="none"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        clip-rule="evenodd"
                                                                        d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                        fill="#4ECB71"
                                                                    />
                                                                </svg>{" "}
                                                                <span>
                                                                    <strong>
                                                                        {
                                                                            info.audio_file_size
                                                                        }
                                                                        MB
                                                                    </strong>{" "}
                                                                    {t(
                                                                        "Audio file size limit"
                                                                    )}
                                                                </span>
                                                            </li>
                                                        </>
                                                    )}
                                                    {info.access_to_gpt3 ===
                                                        1 && (
                                                        <li className=" flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {t(
                                                                    "GPT-3.5 Access"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.accept_to_gpt4 ===
                                                        1 && (
                                                        <li className=" flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {t(
                                                                    "GPT-4 Access"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_templates ===
                                                        1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Templates"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_chatbot === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Chatbot"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_images === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t("Ai Images")}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_code === 1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Code Generator"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                    {info.ai_speech_to_text ===
                                                        1 && (
                                                        <li className="flex items-center text-lg text-EDEBEB space-x-2 mb-4">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="33"
                                                                height="33"
                                                                viewBox="0 0 31 31"
                                                                fill="none"
                                                            >
                                                                <path
                                                                    fill-rule="evenodd"
                                                                    clip-rule="evenodd"
                                                                    d="M23.2887 10.2945C23.4701 10.4762 23.572 10.7224 23.572 10.9791C23.572 11.2358 23.4701 11.4821 23.2887 11.6637L14.247 20.7054C14.0654 20.8868 13.8191 20.9887 13.5624 20.9887C13.3057 20.9887 13.0595 20.8868 12.8778 20.7054L7.71116 15.5387C7.61598 15.45 7.53964 15.3431 7.4867 15.2242C7.43375 15.1054 7.40528 14.9771 7.40298 14.8471C7.40069 14.717 7.42462 14.5878 7.47334 14.4671C7.52206 14.3465 7.59458 14.2369 7.68657 14.145C7.77856 14.053 7.88814 13.9804 8.00877 13.9317C8.12939 13.883 8.2586 13.8591 8.38867 13.8614C8.51875 13.8637 8.64703 13.8921 8.76586 13.9451C8.88469 13.998 8.99164 14.0744 9.08033 14.1695L13.5624 18.6516L21.9195 10.2945C22.1011 10.1131 22.3474 10.0112 22.6041 10.0112C22.8608 10.0112 23.107 10.1131 23.2887 10.2945Z"
                                                                    fill="#4ECB71"
                                                                />
                                                            </svg>{" "}
                                                            <span>
                                                                {" "}
                                                                {t(
                                                                    "Ai Speech To Text"
                                                                )}
                                                            </span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="border-color-2D3956 border-t mt-7 pt-7">
                                                <Link
                                                    href="/user/plan"
                                                    className=" bg-gradient text-white w-full py-3.5 rounded-full font-medium text-lg block text-center"
                                                >
                                                    {t("Subscribe Now")}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </FrontendApp>
        </>
    );
};

export default Pricing;
