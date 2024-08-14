import { Head, Link } from "@inertiajs/inertia-react";
import App from "./layouts/App";
import {
    UilSearch,
    UilFavorite,
    UilAngleRightB,
    UilAngleLeftB
} from "@iconscout/react-unicons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { template } from "lodash";
import { useTranslation } from "react-i18next";

export default function Templates({ auth, logo, categories }) {
    const [Templates, setTemplates] = useState([]);
    const [ManageTemplates, setManageTemplates] = useState([]);
    const [categoryId, setCategoryId] = useState("all");
    const [isFavorite, setIsFavorite] = useState(0);
    const [AllCategories, setAllCategories] = useState(categories);
    const [t] = useTranslation("global");

    useEffect(() => {
        const info = JSON.parse(auth.user.data);
        let AllTemplates = [];

        if (info.templates_limit === -1) {
            AllTemplates = categories.reduce((accumulator, category) => {
                return accumulator.concat(category.templates);
            }, []);
        } else {
            const first20Templates = categories
                .slice(0, info.templates_limit)
                .map((category) => category.templates);
            AllTemplates = [].concat(...first20Templates);
        }

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
        const info = JSON.parse(auth.user.data);
        if (categoryId === "all") {
            if (info.templates_limit == -1) {
                var allTemplates = AllCategories.reduce(
                    (accumulator, category) => {
                        return accumulator.concat(category.templates);
                    },
                    []
                );
                setTemplates(allTemplates);
            } else {
                const first20Templates = categories
                    .slice(0, info.templates_limit)
                    .map((category) => category.templates);
                var allTemplates = [].concat(...first20Templates);

                const uniqueTemplates = allTemplates.reduce(
                    (accumulator, template) => {
                        if (!accumulator.some((t) => t.id === template.id)) {
                            accumulator.push(template);
                        }
                        return accumulator;
                    },
                    []
                );
                setTemplates(uniqueTemplates);
            }
        } else {
            const selectedCategory = AllCategories.find(
                (category) => category.id === categoryId
            );
            if (selectedCategory) {
                if (info.templates_limit == -1) {
                    setTemplates(selectedCategory.templates);
                } else {
                    const categoriesTemplates = selectedCategory.templates;

                    const newTemplates = categoriesTemplates.filter(
                        (template) => ManageTemplates.includes(template)
                    );

                    setTemplates(newTemplates);
                }
            }
        }
    };

    const searchTemplates = (searchValue) => {
        // Convert the searchValue to lowercase (or uppercase)
        const lowerSearchValue = searchValue.toLowerCase(); // You can also use .toUpperCase()
        const info = JSON.parse(auth.user.data);
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

    const handleFavorite = (e, id) => {
        e.preventDefault();
        axios
            .post("/user/template/favorite", {
                id: id
            })
            .then((res) => {
                // Assuming the API response contains the updated favorite status
                const updatedTemplates = Templates.map((template) => {
                    if (template.id === id) {
                        // Toggle the is_favorite status
                        return {
                            ...template,
                            is_favorite: !template.is_favorite
                        };
                    }
                    return template;
                });
                // Update the Templates state with the updated array
                setTemplates(updatedTemplates);

                // Now, update the AllCategories state
                const updatedCategories = AllCategories.map((category) => {
                    // Find the category that contains the template with the given id
                    const updatedTemplates = category.templates.map(
                        (template) => {
                            if (template.id === id) {
                                // Toggle the is_favorite status
                                return {
                                    ...template,
                                    is_favorite: !template.is_favorite
                                };
                            }
                            return template;
                        }
                    );

                    // Update the templates array in this category
                    return { ...category, templates: updatedTemplates };
                });
                // Update the AllCategories state with the updated array
                setAllCategories(updatedCategories);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleAllFavorites = () => {
        if (isFavorite) {
            if (categoryId != "all") {
                const selectedCategory = AllCategories.find(
                    (category) => category.id === categoryId
                );
                if (selectedCategory) {
                    const uniqueTemplates = selectedCategory.templates.reduce(
                        (accumulator, template) => {
                            if (
                                !accumulator.some((t) => t.id === template.id)
                            ) {
                                accumulator.push(template);
                            }
                            return accumulator;
                        },
                        []
                    );
                    setTemplates(uniqueTemplates);
                }
            } else {
                const allTemplates = AllCategories.reduce(
                    (accumulator, category) => {
                        return accumulator.concat(category.templates);
                    },
                    []
                );

                const uniqueTemplates = allTemplates.reduce(
                    (accumulator, template) => {
                        if (!accumulator.some((t) => t.id === template.id)) {
                            accumulator.push(template);
                        }
                        return accumulator;
                    },
                    []
                );
                setTemplates(uniqueTemplates);
            }

            setIsFavorite(false);
        } else {
            const favoriteTemplates = Templates.filter(
                (template) => template.is_favorite
            );
            setTemplates(favoriteTemplates);
            setIsFavorite(true);
        }
    };

    return (
        <>
            <Head>
                <title>{t("Templates")}</title>
            </Head>
            <App auth={auth.user} logo={logo}>
                <div className=" bg-violet-50 pb-5">
                    <div className="">
                        <div className="flex items-center justify-between px-5 py-8">
                            <div className=" flex items-center justify-between w-full">
                                <h2 className=" font-medium text-3xl text-gray-700">
                                    {t("Templates")}
                                </h2>
                                <button
                                    onClick={handleAllFavorites}
                                    className="flex items-center space-x-1"
                                >
                                    {isFavorite ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className=" fill-violet-600 group-hover:fill-violet-600 transition delay-75 -mt-1"
                                            width="17"
                                            height="17"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                    ) : (
                                        <UilFavorite
                                            size={20}
                                            className="text-slate-600 -mt-1 group-hover:text-slate-200 transition delay-75"
                                        />
                                    )}
                                    <div className=" text-slate-600 text-base font-medium">
                                        {t("Favorites")}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:flex xs:block items-center justify-between px-5 space-x-5 md:space-x-5 xs:space-x-0">
                        <div className="w-2/3 lg:w-2/3 md:w-2/3 xs:w-full md:mb-0 xs:mb-3 flex items-center overflow-hidden relative">
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
                                    <button onClick={handleScrollLeft}>
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
                                    <li
                                        onClick={() =>
                                            showCategoryWiseTemplate("all")
                                        }
                                        className="inline-block"
                                    >
                                        <button
                                            className={`${categoryId === "all" ? "bg-gradient text-white" : "text-gray-500"} px-7 py-2.5 rounded-lg`}
                                        >
                                            {t("All Templates")}
                                        </button>
                                    </li>
                                    {categories.map((value, index) => (
                                        <li
                                            key={index}
                                            onClick={() =>
                                                showCategoryWiseTemplate(
                                                    value.id
                                                )
                                            }
                                            className="inline-block"
                                        >
                                            <button
                                                className={`${categoryId === value.id ? "bg-gradient text-white" : "text-gray-500"} px-7 py-2.5 rounded-lg`}
                                            >
                                                {value.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="w-1/3 lg:w-1/3 md:w-2/3 xs:w-full">
                            <div className="relative">
                                <UilSearch
                                    className=" absolute top-1/2 y-middle left-4 text-slate-400"
                                    size={23}
                                />
                                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-lg h-auto">
                                    <input
                                        type="text"
                                        onChange={(e) =>
                                            searchTemplates(e.target.value)
                                        }
                                        className=" w-full placeholder:text-base placeholder:text-gray-400 bg-white border px-5 pl-12 border-slate-100 rounded-lg py-3.5"
                                        placeholder={t("Search Templates")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {Templates.length > 0 ? (
                        <div className=" grid grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-5 m-5">
                            {Templates.map((value, index) => (
                                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-xl h-full">
                                    <div className="bg-white  px-8 py-12 rounded-xl relative transition-all delay-75 group hover:bg-gradient cursor-pointer h-full">
                                        <Link
                                            key={index}
                                            href={`/user/templates/${value.slug}`}
                                        >
                                            <div>
                                                <button
                                                    onClick={(e) =>
                                                        handleFavorite(
                                                            e,
                                                            value.id
                                                        )
                                                    }
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
                                                    className=" h-12 mb-5"
                                                    src={
                                                        JSON.parse(value.data)
                                                            .image
                                                    }
                                                    alt=""
                                                />
                                                <h2 className=" font-medium text-xl text-slate-800 mb-2 group-hover:text-white">
                                                    {value.title}
                                                </h2>
                                                <p className=" text-gray-400 text-sm group-hover:text-slate-300">
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
                    ) : (
                        <div className="px-5 custom-h-template flex items-center justify-center">
                            <p className="font-normal text-lg text-slate-400">
                                {t("No Templates Found.")}
                            </p>
                        </div>
                    )}
                </div>
            </App>
        </>
    );
}
