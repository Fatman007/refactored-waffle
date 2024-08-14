import { useEffect, useState } from "react";
import {
    UilAngleRightB,
    UilAngleLeftB,
    UilFavorite,
    UilAngleDoubleDown,
    UilAngleDoubleUp
} from "@iconscout/react-unicons";
import { Link } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";

export default function Templates({ title, categories }) {
    const [t] = useTranslation("global");
    const [Templates, setTemplates] = useState([]);
    const [ManageTemplates, setManageTemplates] = useState([]);
    const [categoryId, setCategoryId] = useState("all");
    const [AllCategories, setAllCategories] = useState(categories);
    const [isShowMore, setIsShowMore] = useState(false);
    const [maxScrollPosition, setMaxScrollPosition] = useState();

    useEffect(() => {
        let AllTemplates = [];

        AllTemplates = categories.reduce((accumulator, category) => {
            return accumulator.concat(category.templates);
        }, []);

        // Remove duplicates based on the 'id' property
        const uniqueTemplates = AllTemplates.reduce((accumulator, template) => {
            if (!accumulator.some((t) => t.id === template.id)) {
                accumulator.push(template);
            }
            return accumulator;
        }, []);

        setTemplates(uniqueTemplates);
        setManageTemplates(AllTemplates);
    }, []);

    const showCategoryWiseTemplate = (categoryId) => {
        setCategoryId(categoryId);

        if (categoryId === "all") {
            var allTemplates = AllCategories.reduce((accumulator, category) => {
                return accumulator.concat(category.templates);
            }, []);
            setTemplates(allTemplates);
        } else {
            const selectedCategory = AllCategories.find(
                (category) => category.id === categoryId
            );
            if (selectedCategory) {
                setTemplates(selectedCategory.templates);
            }
        }
    };

    const searchTemplates = (searchValue) => {
        // Convert the searchValue to lowercase (or uppercase)
        const lowerSearchValue = searchValue.toLowerCase(); // You can also use .toUpperCase()
        // const info = JSON.parse(auth.user.data)
        const info = {};
        if (categoryId === "all") {
            if (info.templates_limit == -1) {
                var allTemplates = AllCategories.reduce(
                    (accumulator, category) => {
                        return accumulator.concat(category.templates);
                    },
                    []
                );
            } else {
                const first20Templates = categories
                    .slice(0, info.templates_limit)
                    .map((category) => category.templates);
                var allTemplates = [].concat(...first20Templates);
            }

            const uniqueTemplates = allTemplates.reduce(
                (accumulator, template) => {
                    if (!accumulator.some((t) => t.id === template.id)) {
                        accumulator.push(template);
                    }
                    return accumulator;
                },
                []
            );

            // Perform the case-insensitive search based on the lowercased searchValue
            const filteredTemplates = uniqueTemplates.filter((template) => {
                // Convert the template title to lowercase (or uppercase) before comparison
                const lowerTitle = template.title.toLowerCase(); // You can also use .toUpperCase()
                return lowerTitle.includes(lowerSearchValue);
            });

            // Update the state with the filteredTemplates
            setTemplates(filteredTemplates);
        } else {
            const selectedCategory = AllCategories.find(
                (category) => category.id === categoryId
            );
            if (selectedCategory) {
                if (info.templates_limit == -1) {
                    var allTemplates = selectedCategory.templates;
                } else {
                    const categoriesTemplates = selectedCategory.templates;

                    var allTemplates = categoriesTemplates.filter((template) =>
                        ManageTemplates.includes(template)
                    );
                }

                const uniqueTemplates = allTemplates.reduce(
                    (accumulator, template) => {
                        if (!accumulator.some((t) => t.id === template.id)) {
                            accumulator.push(template);
                        }
                        return accumulator;
                    },
                    []
                );

                const filteredTemplates = uniqueTemplates.filter((template) => {
                    // Convert the template title to lowercase (or uppercase) before comparison
                    const lowerTitle = template.title.toLowerCase(); // You can also use .toUpperCase()
                    return lowerTitle.includes(lowerSearchValue);
                });

                setTemplates(filteredTemplates);
            }
        }
    };

    const [scrollPosition, setScrollPosition] = useState(0);

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

    const getFirstLastTwoWithPreviousWord = (text) => {
        const words = text.split(" ");

        let lastTwoWord = "";
        let firstWord = "";
        let middleWord = "";

        if (words.length > 2) {
            lastTwoWord = words.slice(-2).join(" ");
            firstWord = words.slice(0, 1).join(" ");
            middleWord = words.slice(1, -2).join(" ");
        } else {
            firstWord = text;
        }

        const result = {
            lastTwoWord: lastTwoWord,
            firstWord: firstWord,
            middleWord: middleWord
        };

        return result;
    };

    const templateTitle = getFirstLastTwoWithPreviousWord(title);

    useEffect(() => {
        const container = document.querySelector(".scroll-container");
        const maxScrollPosition = container.scrollWidth - container.clientWidth;
        setMaxScrollPosition(maxScrollPosition);
    }, []);

    return (
        <div className="pb-150" id="templates">
            <div className="container text-center mx-auto 2xl:w-1/3 xl:w-2/5 lg:w-1/2 md:w-8/12 mb-7">
                <h2 className="text-white text-5xl sm:text-5xl xs:text-4xl mb-4 font-hiragino leading-tight">
                    <span className="text-gradient">{t("60+")}</span>{" "}
                    {t("Build-In Templates")}
                    <span className="text-gradient"> {t("to Use")}</span>
                </h2>
            </div>
            <div className=" container mx-auto">
                <div className="w-9/12 lg:w-9/12 md:w-9/12 xs:w-full mx-auto md:mb-0 xs:mb-3 flex items-center overflow-hidden relative">
                    <div
                        onClick={handleScrollRight}
                        className={`cursor-pointer absolute home-right-1px top-0 bottom-0 secondary-bg flex items-center justify-center my-0.5 rounded-r-full z-0 ${scrollPosition >= maxScrollPosition ? "hidden" : ""}`}
                    >
                        <button>
                            <UilAngleRightB
                                size={18}
                                className=" text-slate-400"
                            />
                        </button>
                    </div>
                    {scrollPosition > 0 && (
                        <div
                            onClick={handleScrollLeft}
                            className=" cursor-pointer absolute home-left-1px top-0 bottom-0 secondary-bg flex items-center justify-center my-0.5 rounded-l-full"
                        >
                            <button>
                                <UilAngleLeftB
                                    size={18}
                                    className=" text-slate-400"
                                />
                            </button>
                        </div>
                    )}
                    <div
                        className="scroll-custom-container bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-full h-auto"
                        onScroll={handleScroll}
                    >
                        <ul
                            className="scroll-container px-1.5 py-2 rounded-full secondary-bg w-full whitespace-nowrap overflow-x-auto min-w-full hide-scrollbar"
                            onScroll={handleScroll}
                        >
                            <li
                                onClick={() => showCategoryWiseTemplate("all")}
                                className="inline-block"
                            >
                                <button
                                    className={`${categoryId === "all" ? "bg-gradient text-white" : "text-gray-300"} px-7 py-3.5 text-lg rounded-full`}
                                >
                                    {t("All Templates")}
                                </button>
                            </li>
                            {categories.map((value, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        showCategoryWiseTemplate(value.id)
                                    }
                                    className="inline-block"
                                >
                                    <button
                                        className={`${categoryId === value.id ? "bg-gradient text-white" : "text-gray-300"} text-lg px-7 py-3.5 rounded-full`}
                                    >
                                        {value.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className=" container mx-auto">
                <div
                    className={`${isShowMore ? "" : "overflow-hidden max-h-custom"} relative`}
                >
                    <div className=" grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-5 mt-5">
                        {Templates.map((value, index) => (
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                                <div className=" secondary-bg  px-8 py-14 rounded-xl relative transition-all delay-75 group hover:bg-gradient cursor-pointer h-full">
                                    <Link
                                        key={index}
                                        href={`/user/templates/${value.slug}`}
                                        className=" flex items-center"
                                    >
                                        <div>
                                            <button
                                                onClick={(e) => {
                                                    // handleFavorite(e, value.id)
                                                }}
                                                className=" absolute top-5 right-5"
                                            >
                                                {value.is_favorite ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="fill-yellow-300 group-hover:fill-yellow-300 mt-0.5 mr-0.5"
                                                        width="19.5"
                                                        height="19.5"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                    </svg>
                                                ) : (
                                                    <UilFavorite className="text-slate-400 group-hover:text-slate-200" />
                                                )}
                                            </button>
                                            <img
                                                className=" h-52 mb-5"
                                                src={
                                                    JSON.parse(value.data).image
                                                }
                                                alt=""
                                            />
                                            <h2 className=" font-medium text-22px text-white mb-2 group-hover:text-white">
                                                {value.title}
                                            </h2>
                                            <p className=" text-gray-400 text-base group-hover:text-slate-300">
                                                {
                                                    JSON.parse(value.data)
                                                        .description
                                                }
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="show-more-button">
                        {isShowMore ? (
                            <button
                                onClick={() => setIsShowMore(false)}
                                className=" bg-gradient text-white px-10 py-3.5 text-base rounded-full flex items-center justify-center mx-auto"
                            >
                                <span className=" font-medium">
                                    {t("Show Less")}
                                </span>{" "}
                                <UilAngleDoubleUp
                                    className="inline-block"
                                    size={25}
                                />
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsShowMore(true)}
                                className=" bg-gradient text-white px-10 py-3.5 text-base rounded-full flex items-center justify-center mx-auto"
                            >
                                <span className=" font-medium">
                                    {t("Show More")}
                                </span>{" "}
                                <UilAngleDoubleDown
                                    className="inline-block"
                                    size={25}
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
