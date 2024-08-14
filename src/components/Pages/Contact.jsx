import FrontendApp from "@/Layouts/Frontentapp";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "@inertiajs/inertia-react";
import FaQ from "@/Components/frontend/FaQ";
import { useTranslation } from "react-i18next";

export default function Contact(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();
    const [status, setStatus] = useState(false);
    const [t, i18n] = useTranslation("global");

    var Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
    });

    const onSubmit = (data) => {
        Inertia.visit("/contact", {
            method: "post",
            data: data,
            onBefore: (visit) => {
                setStatus(true);
            },
            onSuccess: () => {
                Toast.fire({
                    icon: "success",
                    title: "Message Successfully Sent!"
                });
                setStatus(false);
            }
        });
    };

    return (
        <>
            <Head>
                <title>{props.seo_contact.name}</title>
                <meta
                    name="description"
                    content={
                        JSON.parse(props.seo_contact.seometa.value)
                            .meta_description
                    }
                />
                <meta
                    name="keywords"
                    content={
                        JSON.parse(props.seo_contact.seometa.value).meta_tag
                    }
                />

                <meta
                    name="twitter:title"
                    content={
                        JSON.parse(props.seo_contact.seometa.value)
                            .twitter_title
                    }
                ></meta>
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
                                    {t("Contact")}{" "}
                                    <span className="text-gradient">
                                        {t("Us")}
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
                                                    {t("Contact Us")}
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
                {/* contact area start */}
                <div className=" my-36 container mx-auto">
                    <div className=" flex lg:flex xs:block space-x-20 xl:space-x-20 lg:space-x-5 xs:space-x-0 items-center">
                        <div className=" 2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full lg:mb-0 xs:mb-20 rounded-3xl bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] h-fit">
                            <div className=" secondary-bg rounded-3xl px-16 sm:px-16 py-16 sm:py-16 xs:px-12 xs:py-12">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="2xl:flex xl:flex lg:flex md:flex sm:flex xs:block 2xl:space-x-5 xl:space-x-5 lg:space-x-5 md:space-x-5 sm:space-x-5 xs:space-x-0 mb-5">
                                        <div className="w-full 2xl:mb-0 xl:mb-0 lg:mb-0 md:mb-0 sm:mb-0 xs:mb-5">
                                            <label
                                                htmlFor="name"
                                                className="block text-slate-200 font-normal text-lg mb-1"
                                            >
                                                {t("Name")}
                                            </label>
                                            <input
                                                type="text"
                                                {...register("name", {
                                                    required: true
                                                })}
                                                className="w-full text-white homepage-bg  px-5 h-14 rounded-xl border-none placeholder:text-base placeholder:text-gray-500"
                                                placeholder={t(
                                                    "Enter Your Name"
                                                )}
                                            />
                                            {errors.name && (
                                                <span className=" font-light text-sm text-red-500">
                                                    {t(
                                                        "The name field is required"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                        <div className=" w-full">
                                            <label
                                                htmlFor="email"
                                                className="block text-slate-200 font-normal text-lg mb-1"
                                            >
                                                {t("Email")}
                                            </label>

                                            <input
                                                type="email"
                                                {...register("email", {
                                                    required: true
                                                })}
                                                className="w-full homepage-bg  text-white px-5 h-14 border-none rounded-xl placeholder:text-base placeholder:text-gray-500"
                                                placeholder={t(
                                                    "Enter Your Email"
                                                )}
                                            />

                                            {errors.email && (
                                                <span className=" font-light text-sm text-red-500">
                                                    {t(
                                                        "The email field is required"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            htmlFor="subject"
                                            className="block text-slate-200 font-normal text-lg mb-1"
                                        >
                                            {t("Subject")}
                                        </label>

                                        <input
                                            type="text"
                                            {...register("subject", {
                                                required: true
                                            })}
                                            className="w-full text-white  homepage-bg  px-5 h-14 border-none rounded-xl placeholder:text-base placeholder:text-gray-500"
                                            placeholder={t(
                                                "Enter Your Subject"
                                            )}
                                        />

                                        {errors.subject && (
                                            <span className=" font-light text-sm text-red-500">
                                                {t(
                                                    "The subject field is required"
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-slate-200 font-normal text-lg mb-1"
                                        >
                                            {t("Message")}
                                        </label>

                                        <textarea
                                            {...register("message", {
                                                required: true
                                            })}
                                            placeholder={t("Write here...")}
                                            rows={5}
                                            className="w-full inline-table h-fit text-white border-none  homepage-bg  px-5 py-4 rounded-xl placeholder:text-base placeholder:text-gray-500"
                                        />

                                        {errors.message && (
                                            <span className=" font-light text-sm text-red-500">
                                                {t(
                                                    "The message field is required"
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    <div className=" relative z-50 flex justify-end mt-2">
                                        {status ? (
                                            <button
                                                disabled
                                                className=" bg-gradient  px-10 py-3.5 rounded-lg text-white font-medium mt-3 cursor-not-allowed"
                                            >
                                                {t("Sending")} ...
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className=" bg-gradient  px-10 py-3.5 rounded-lg text-white font-medium mt-3"
                                            >
                                                {t("Send Message")}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className=" 2xl:w-1/2 xl:w-1/2 lg:w-1/2 xs:w-full">
                            <small className=" text-gradient text-lg font-medium">
                                {t("Contact Us")}
                            </small>
                            <h2 className=" text-white text-4xl font-bold my-5">
                                {t("contact_title")}
                            </h2>
                            <p className=" text-slate-400 text-base leading-tight">
                                {t("contact_des")}
                            </p>
                            <div className=" my-16">
                                <div className="grid grid-cols-2 sm:grid-cols-2 xs:grid-cols-1 gap-5">
                                    <div>
                                        <div className="flex items-center space-x-5">
                                            <div className=" secondary-bg rounded-lg p-4">
                                                <img
                                                    className=" h-14"
                                                    src="/frontend/img/email.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <h4 className=" text-slate-300 text-xl font-medium">
                                                    {t("Email")}
                                                </h4>
                                                <p className=" text-slate-400 mt-2">
                                                    {t("contact_email")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-5">
                                            <div className=" secondary-bg rounded-lg p-4">
                                                <img
                                                    className=" h-14"
                                                    src="/frontend/img/telephone.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <h4 className=" text-slate-300 text-xl font-medium">
                                                    Phone
                                                </h4>
                                                <p className=" text-slate-400 mt-2">
                                                    {t("contact_phone")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-5">
                                            <div className=" secondary-bg rounded-lg p-4">
                                                <img
                                                    className=" h-14"
                                                    src="/frontend/img/place.png"
                                                    alt=""
                                                />
                                            </div>
                                            <div>
                                                <h4 className=" text-slate-300 text-xl font-medium">
                                                    Location
                                                </h4>
                                                <p className=" text-slate-400 mt-2">
                                                    {t("contact_location")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" border-t border-slate-800 pt-8">
                                <h2 className=" font-medium text-slate-200 text-xl mb-4">
                                    {t("Follow our social media")}
                                </h2>
                                <div>
                                    <ul>
                                        {props.settings.social_data.map(
                                            (value, index) => (
                                                <li
                                                    key={index}
                                                    className=" inline-block mr-2"
                                                >
                                                    <Link
                                                        href={value.url}
                                                        className=" bg-gradient rounded-full px-3.5 py-2.5 flex items-center text-white"
                                                    >
                                                        <i
                                                            className={`text-base ${value.link} text-white`}
                                                        ></i>
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
                {/* contact area end */}
                <FaQ faqs={props.faqs} />
            </FrontendApp>
        </>
    );
}
