import { Link } from "@inertiajs/inertia-react";
import Locate from "../Locate";
import { useTranslation } from "react-i18next";

export default function Features({ features, title, description, locate }) {
    const [t, i18n] = useTranslation("global");
    const getLastTwoWordsWithPrevious = (title) => {
        const words = title?.split(" ");

        let lastTwoWord = "";
        let previousWord = "";

        if (words?.length > 2) {
            lastTwoWord = words?.slice(-2)?.join(" ");

            previousWord = words?.slice(0, -2)?.join(" ");
        } else {
            lastTwoWord = "";
            previousWord = title;
        }

        const result = {
            lastTwoWord: lastTwoWord,
            previousWord: previousWord
        };

        return result;
    };

    const { lastTwoWord, previousWord } = getLastTwoWordsWithPrevious(title);

    return (
        <>
            <div className="container mx-auto pb-150">
                <div className=" text-center mx-auto 2xl:w-3/5 xl:w-3/5 lg:w-9/12 md:w-11/12">
                    <h2 className="text-white text-5xl md:text-5xl sm:text-5xl xs:text-4xl  mb-4 font-hiragino">
                        {t("Why")}{" "}
                        <span className="text-gradient">
                            {t("Choose ToolsAi")}
                        </span>
                    </h2>
                    <p className="text-E3E3E3 text-xl md:text-xl sm:text-lg xs:text-base">
                        {t("why_choose_des")}
                    </p>
                </div>
                <div className=" mt-10 grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-5">
                    {features?.map((value, index) => {
                        const data = JSON.parse(value.feature_meta.value);
                        return (
                            <div
                                key={index}
                                className="rounded-20 w-full bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] h-fit"
                                data-aos="zoom-in"
                            >
                                <div className="secondary-bg rounded-20 px-38 py-50 text-center">
                                    <img
                                        className="w-90 h-90 mx-auto mb-9"
                                        src={data.image}
                                        alt=""
                                    />
                                    <h2 className="text-3xl font-bold text-white mb-custom-14">
                                        {value.name}
                                    </h2>
                                    <p className=" text-E3E3E3 text-xl mb-custom-14 leading-tight">
                                        {data.description}
                                    </p>

                                    <svg
                                        className="mx-auto"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="53"
                                        height="53"
                                        viewBox="0 0 53 53"
                                        fill="none"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M36.9234 17.0483C37.2339 16.7382 37.6549 16.564 38.0938 16.564C38.5327 16.564 38.9536 16.7382 39.2642 17.0483L47.5454 25.3296C47.8556 25.6401 48.0298 26.0611 48.0298 26.5C48.0298 26.9389 47.8556 27.3599 47.5454 27.6704L39.2642 35.9517C39.1126 36.1144 38.9297 36.2449 38.7265 36.3354C38.5234 36.426 38.3041 36.4746 38.0817 36.4786C37.8593 36.4825 37.6384 36.4416 37.4322 36.3583C37.2259 36.275 37.0386 36.151 36.8813 35.9937C36.724 35.8364 36.6 35.6491 36.5167 35.4429C36.4334 35.2366 36.3925 35.0157 36.3965 34.7934C36.4004 34.571 36.4491 34.3517 36.5396 34.1485C36.6301 33.9453 36.7606 33.7625 36.9234 33.6108L42.3779 28.1563H6.625C6.18574 28.1563 5.76446 27.9818 5.45385 27.6712C5.14325 27.3605 4.96875 26.9393 4.96875 26.5C4.96875 26.0607 5.14325 25.6395 5.45385 25.3289C5.76446 25.0183 6.18574 24.8438 6.625 24.8438H42.3779L36.9234 19.3892C36.6132 19.0786 36.439 18.6577 36.439 18.2188C36.439 17.7798 36.6132 17.3589 36.9234 17.0483Z"
                                            fill="url(#paint0_linear_55_877)"
                                        />
                                        <defs>
                                            <linearGradient
                                                id="paint0_linear_55_877"
                                                x1="5.71486"
                                                y1="26.7167"
                                                x2="48.6693"
                                                y2="26.7167"
                                                gradientUnits="userSpaceOnUse"
                                            >
                                                <stop stop-color="#885CF6" />
                                                <stop
                                                    offset="1"
                                                    stop-color="#7EF3E5"
                                                    stop-opacity="0.97"
                                                />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
