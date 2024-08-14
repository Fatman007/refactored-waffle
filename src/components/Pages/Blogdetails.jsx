import FrontendApp from "@/Layouts/Frontentapp";
import moment from "moment";
import {
    FacebookShareButton,
    TwitterShareButton,
    PinterestShareButton,
    LinkedinShareButton
} from "react-share";
import { Link } from "@inertiajs/inertia-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { UilSearch, UilClock } from "@iconscout/react-unicons";

export default function BlogDetails({
    blog,
    url,
    hero,
    settings,
    menuitems,
    footer_first_menuitems,
    footer_second_menuitems,
    footer_third_menuitems,
    footer_four_menuitems,
    locate,
    recent_blogs,
    categories,
    allTags,
    blogTags,
    previousBlog,
    nextBlog
}) {
    const { t } = useTranslation("global");

    const [search, setSearch] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.visit("/blogs?search=" + search);
    };

    return (
        <>
            <title>{blog.name}</title>
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
                                        {t("Details")}
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
                                                    {t("Blog Details")}
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
                <div className=" relative pt-40">
                    <div className="container mx-auto">
                        <div className="flex lg:flex xs:block justify-between lg:space-x-5 space-x-5 xs:space-x-0">
                            <div className="w-2/3 lg:w-2/3 xs:w-full 2xl:text-left xl:text-left md:text-left sm:text-left xs:text-center lg:mb-0 xs:mb-20">
                                <div className=" flex items-center mb-3 sm:justify-start xs:justify-center">
                                    {blog.categories.map((category, index) => (
                                        <Link
                                            href={`/blogs?category=${category.id}`}
                                            className="bg-gradient text-white px-4 py-2 rounded-full relative"
                                        >
                                            <h2 className="text-xs font-medium mx-2.5">
                                                {category.name}
                                            </h2>
                                        </Link>
                                    ))}
                                </div>
                                <h2 className=" font-semibold font-sans text-slate-200 2xl:text-5xl xl:text-5xl lg:text-5xl md:text-5xl sm:text-5xl xs:text-4xl blog-leading-custom">
                                    {blog.name}
                                </h2>
                                <div className=" mt-4 flex items-center 2xl:justify-start xl:justify-start lg:justify-start md:justify-start sm:justify-start xs:justify-center mb-10 text-slate-400 text-base font-medium font-mono">
                                    <UilClock className="text-xl mr-1" />{" "}
                                    <span>
                                        {" "}
                                        {moment(blog.created_at).format("LL")}
                                    </span>
                                </div>
                                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl">
                                    <div className="p-2 rounded-2xl secondary-bg">
                                        <img
                                            className=" w-full h-450 object-cover  rounded-2xl"
                                            src={
                                                JSON.parse(blog.blogmeta.value)
                                                    .preview
                                            }
                                            alt=""
                                        />
                                    </div>
                                </div>
                                <div className=" border-b border-slate-700 mb-5 pb-8 whitespace-pre-line">
                                    <p className="mt-5 font-medium text-slate-300 leading-loose  text-base py-2 mb-4">
                                        {
                                            JSON.parse(blog.blogmeta.value)
                                                .short_content
                                        }
                                    </p>
                                    <p className="mt-5 font-medium text-slate-300 leading-loose  text-base py-2 mb-4">
                                        {
                                            JSON.parse(blog.blogmeta.value)
                                                .description
                                        }
                                    </p>
                                </div>
                                <div className="flex sm:flex xs:block justify-between">
                                    <div className=" flex items-center space-x-5 sm:mb-0 xs:mb-5">
                                        <h2 className=" text-white font-medium text-lg">
                                            {t("Tags")}:
                                        </h2>
                                        <ul>
                                            {blogTags.split(", ").map(
                                                (tag, index) =>
                                                    tag && (
                                                        <li className=" inline-block border border-slate-700 rounded-full text-slate-300 mr-3 text-sm">
                                                            <Link
                                                                className="block px-6 py-2"
                                                                href={`/blogs?=${tag}`}
                                                            >
                                                                {tag}
                                                            </Link>
                                                        </li>
                                                    )
                                            )}
                                        </ul>
                                    </div>
                                    <div>
                                        <div className=" flex items-center space-x-2">
                                            <h2 className="text-white font-medium text-lg">
                                                {t("Share")}:{" "}
                                            </h2>
                                            <div className=" flex items-center justify-end">
                                                <FacebookShareButton
                                                    url={
                                                        url +
                                                        "blog/" +
                                                        blog.slug
                                                    }
                                                >
                                                    <a
                                                        href="#"
                                                        className=" bg-gradient rounded-full px-3.5 py-2.5 flex items-center ml-3 text-white"
                                                    >
                                                        <i className=" text-base ri-facebook-fill text-white"></i>
                                                    </a>
                                                </FacebookShareButton>
                                                <TwitterShareButton
                                                    url={
                                                        url +
                                                        "blog/" +
                                                        blog.slug
                                                    }
                                                >
                                                    <a
                                                        href="#"
                                                        className=" bg-gradient rounded-full px-3.5 py-2.5 flex items-center ml-3 text-white"
                                                    >
                                                        <i className=" text-base ri-twitter-fill text-white"></i>
                                                    </a>
                                                </TwitterShareButton>
                                                <LinkedinShareButton
                                                    url={
                                                        url +
                                                        "blog/" +
                                                        blog.slug
                                                    }
                                                    title={blog.name}
                                                    summary={
                                                        JSON.parse(
                                                            blog.blogmeta.value
                                                        ).short_content
                                                    }
                                                    source={
                                                        url +
                                                        "blog/" +
                                                        blog.slug
                                                    }
                                                >
                                                    <a
                                                        href="#"
                                                        className=" bg-gradient rounded-full px-3.5 py-2.5 flex items-center ml-3 text-white text-base "
                                                    >
                                                        <i className="ri-linkedin-box-fill"></i>
                                                    </a>
                                                </LinkedinShareButton>
                                                <PinterestShareButton
                                                    url={
                                                        url +
                                                        "blog/" +
                                                        blog.slug
                                                    }
                                                    media={
                                                        url +
                                                        "storage/blog/" +
                                                        JSON.parse(
                                                            blog.blogmeta.value
                                                        ).preview
                                                    }
                                                    description={
                                                        JSON.parse(
                                                            blog.blogmeta.value
                                                        ).short_content
                                                    }
                                                >
                                                    <a
                                                        href="#"
                                                        className=" bg-gradient rounded-full px-3.5 py-2.5 flex items-center ml-3 text-white"
                                                    >
                                                        <i className=" text-base ri-pinterest-fill text-white"></i>
                                                    </a>
                                                </PinterestShareButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex sm:flex xs:block items-center justify-between mt-12">
                                    <div className="flex items-center justify-start space-x-4">
                                        {previousBlog && (
                                            <Link
                                                href={`/blog/${previousBlog.slug}`}
                                                className="border border-slate-600 inline-block p-3 rounded-full"
                                            >
                                                <svg
                                                    width={20}
                                                    height={20}
                                                    className="fill-slate-600"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path>
                                                </svg>
                                            </Link>
                                        )}
                                        {previousBlog && (
                                            <Link
                                                href={`/blog/${previousBlog.slug}`}
                                            >
                                                <div>
                                                    <small className="text-slate-400 font-medium text-left">
                                                        {t("PREVIOUS")}
                                                    </small>
                                                </div>
                                                <div>
                                                    <h2 className="text-slate-200 font-medium text-lg text-left">
                                                        {previousBlog.name}
                                                    </h2>
                                                </div>
                                            </Link>
                                        )}
                                    </div>
                                    {previousBlog && nextBlog ? (
                                        <div className="border-l border-slate-700 h-10"></div>
                                    ) : (
                                        ""
                                    )}
                                    <div className="flex items-center justify-end space-x-4">
                                        {nextBlog && (
                                            <Link
                                                href={`/blog/${nextBlog.slug}`}
                                            >
                                                <div>
                                                    <small className="text-slate-400 font-medium float-right">
                                                        {t("NEXT")}
                                                    </small>
                                                </div>
                                                <div>
                                                    <h2 className="text-slate-200 font-medium text-lg text-right float-right">
                                                        {nextBlog.name}
                                                    </h2>
                                                </div>
                                            </Link>
                                        )}
                                        {nextBlog && (
                                            <Link
                                                href={`/blog/${nextBlog.slug}`}
                                                className="border border-slate-600 inline-block p-3 rounded-full"
                                            >
                                                <svg
                                                    width={20}
                                                    height={20}
                                                    className="fill-slate-600"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                                                </svg>
                                            </Link>
                                        )}
                                    </div>
                                </div>
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
                                                        setSearch(
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className=" homepage-bg text-white  w-full py-4 rounded-full placeholder:text-base placeholder:text-slate-500 pl-6 border-none text-base font-medium placeholder:font-normal"
                                                    placeholder="Search..."
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
                                                                    blog
                                                                        .blogmeta
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
                </div>
            </FrontendApp>
        </>
    );
}
