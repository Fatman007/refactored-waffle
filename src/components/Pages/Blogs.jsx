import FrontendApp from "@/Layouts/Frontentapp";
import { Head, Link } from "@inertiajs/inertia-react";
import moment from "moment";
import { UilAngleRight } from "@iconscout/react-unicons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import { Inertia } from "@inertiajs/inertia";

export default function Blogs({
    blogs,
    hero,
    settings,
    menuitems,
    footer_first_menuitems,
    footer_second_menuitems,
    footer_third_menuitems,
    footer_four_menuitems,
    seo_blog,
    categories,
    allTags,
    recent_blogs,
    locate
}) {
    const [search, setSearch] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.visit("/blogs?search=" + search);
    };

    const wordLimit = (str, limit) => {
        var words = str.split(" ");
        if (words.length > limit) {
            return words.slice(0, limit).join(" ") + "...";
        } else {
            return str;
        }
    };

    const [t] = useTranslation("global");

    return (
        <>
            <Head>
                <title>{seo_blog.name}</title>
                <meta
                    name="description"
                    content={
                        JSON.parse(seo_blog.seometa.value).meta_description
                    }
                />
                <meta
                    name="keywords"
                    content={JSON.parse(seo_blog.seometa.value).meta_tag}
                />
                <meta
                    name="twitter:title"
                    content={JSON.parse(seo_blog.seometa.value).twitter_title}
                ></meta>
            </Head>
            <FrontendApp
                locate={locate}
                settings={settings}
                menuitems={menuitems}
                hero={hero}
                footer_first_menuitems={footer_first_menuitems}
                footer_second_menuitems={footer_second_menuitems}
                footer_third_menuitems={footer_third_menuitems}
                footer_four_menuitems={footer_four_menuitems}
            >
                {/* breadcrumb area start */}
                <div className=" py-12 secondary-bg">
                    <div className="text-left container mx-auto relative">
                        <img
                            className="absolute -top-40 blur-3xl -right-0 z-1 sm:block xs:hidden"
                            src="/frontend/img/header/hello1.png"
                            alt=""
                        />
                        <div className=" flex sm:flex xs:block items-center sm:justify-between xs:justify-center">
                            <div className=" sm:text-left xs:text-center">
                                <h2 className=" 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl xs:text-4xl font-bold text-white">
                                    {t("Blog")}{" "}
                                    <span className="text-gradient">
                                        {t("Lists")}
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
                                                    {t("Blog Lists")}
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
                {/* blog lists area start */}
                <div className="container mx-auto mt-36">
                    <div className=" flex space-x-5 lg:space-x-5 xs:space-x-0 lg:flex xs:block justify-between">
                        <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-5 w-2/3 lg:w-2/3 xs:w-full h-fit relative z-30 lg:mb-0 xs:mb-5">
                            {blogs.data.length > 0 ? (
                                blogs.data.map((value, index) => (
                                    <div key={index}>
                                        <div className="rounded-2xl secondary-bg p-4 xl:p-4 lg:p-2 h-full">
                                            <Link
                                                href={"/blog/" + value.slug}
                                                className="overflow-hidden secondary-bg w-full h-72"
                                            >
                                                <img
                                                    className="rounded-2xl h-72 object-cover w-full transition delay-75 hover:scale-100"
                                                    src={
                                                        JSON.parse(
                                                            value.blogmeta.value
                                                        ).preview
                                                    }
                                                    alt=""
                                                />
                                            </Link>
                                            <div className=" px-5 xl:px-5 lg:px-4 py-8 xl:py-8 lg:py-5 pt-5">
                                                <div className=" flex items-center mb-2 text-slate-400 font-mono">
                                                    <i className="ri-calendar-line mr-1 text-xl"></i>{" "}
                                                    <span>
                                                        {" "}
                                                        {moment(
                                                            value.created_at
                                                        ).format("LL")}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={"/blog/" + value.slug}
                                                >
                                                    <h2 className=" font-bold text-slate-200 text-2xl">
                                                        {value.name}
                                                    </h2>
                                                </Link>
                                                <p className=" font-medium text-slate-400 text-sm leading-normal py-2 mb-3">
                                                    {wordLimit(
                                                        JSON.parse(
                                                            value.blogmeta.value
                                                        ).short_content,
                                                        18
                                                    )}
                                                </p>
                                                <Link
                                                    href={"/blog/" + value.slug}
                                                    className="text-slate-200 font-medium text-base flex items-center space-x-3"
                                                >
                                                    <span>Read More</span>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="25"
                                                        height="25"
                                                        fill="currentColor"
                                                        class="bi bi-arrow-right"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className=" text-center col-span-3 text-slate-300 font-medium text-2xl mb-10">
                                    {t("No Data Found.")}
                                </p>
                            )}
                        </div>
                        <div className=" w-1/3 lg:w-1/3 xs:w-full">
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl mb-8">
                                <div className="secondary-bg px-8 py-10 rounded-2xl">
                                    <div className="custom-title-badge relative">
                                        <h2 className=" text-white font-medium text-2xl ml-4">
                                            {t("Recent Blogs")}
                                        </h2>
                                    </div>
                                    <div className="relative mt-4">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                onChange={(e) =>
                                                    setSearch(e.target.value)
                                                }
                                                type="text"
                                                className=" homepage-bg text-white  w-full py-4 rounded-full placeholder:text-base placeholder:text-slate-500 pl-6 border-none text-base font-medium placeholder:font-normal"
                                                placeholder={t("Search...")}
                                            />
                                            <button className=" bg-gradient text-white p-2.5 text-lg rounded-full absolute top-1/2  y-middle right-2">
                                                <UilSearch size={18} />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl">
                                <div className="secondary-bg px-8 py-10 rounded-2xl">
                                    <div className="custom-title-badge relative">
                                        <h2 className=" text-white font-medium text-2xl ml-4">
                                            {t("Categories")}
                                        </h2>
                                    </div>
                                    <div className="">
                                        <ol className="mt-8">
                                            {categories.map(
                                                (category, index) => (
                                                    <li
                                                        key={index}
                                                        className="text-slate-300 font-medium my-7 text-base last:mb-0"
                                                    >
                                                        <Link
                                                            href={`/blogs?category=${category.id}`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <span>
                                                                    {
                                                                        category.name
                                                                    }
                                                                </span>
                                                                <span>
                                                                    (
                                                                    {
                                                                        category
                                                                            .blogs
                                                                            .length
                                                                    }
                                                                    )
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl mt-8">
                                <div className="secondary-bg px-8 py-10 rounded-2xl">
                                    <div className="custom-title-badge relative">
                                        <h2 className=" text-white font-medium text-2xl ml-4">
                                            {t("Recent Blogs")}
                                        </h2>
                                    </div>
                                    <div className=" mt-5">
                                        {recent_blogs.map((blog, index) => (
                                            <Link
                                                href={"/blog/" + blog.slug}
                                                className="flex items-center space-x-3 mb-5 last:mb-0"
                                            >
                                                <div className="">
                                                    <img
                                                        className=" h-24 w-40 rounded-lg object-cover"
                                                        src={
                                                            JSON.parse(
                                                                blog.blogmeta
                                                                    .value
                                                            ).preview
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div className=" w-full">
                                                    <h2 className=" text-slate-200 text-lg font-medium">
                                                        {blog.name}
                                                    </h2>
                                                    <div className="flex items-center text-slate-400 font-mono">
                                                        <i className="ri-calendar-line text-2xl mr-1 text-slate-400"></i>{" "}
                                                        <span>
                                                            {" "}
                                                            {moment(
                                                                blog.created_at
                                                            ).format("LL")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl mt-8">
                                <div className="secondary-bg px-8 py-10 rounded-2xl">
                                    <div className="custom-title-badge relative">
                                        <h2 className=" text-white font-medium text-2xl ml-4">
                                            {t("Tags")}
                                        </h2>
                                    </div>
                                    <div className="relative mt-7">
                                        <ul>
                                            {allTags.map(
                                                (tag, index) =>
                                                    tag && (
                                                        <li
                                                            key={index}
                                                            className="inline-block mr-2 mb-7"
                                                        >
                                                            <Link
                                                                href={`/blogs?tags=${tag}`}
                                                                className="border border-slate-700 text-slate-300 px-8 font-normal py-3 rounded-full"
                                                            >
                                                                {tag}
                                                            </Link>
                                                        </li>
                                                    )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* blog lists area end */}
            </FrontendApp>
        </>
    );
}
