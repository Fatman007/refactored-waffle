import Locate from "../../Components/Locate";
import Promotional from "../../Components/frontend/Promotional";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer({
    settings,
    footer_first_menuitems,
    footer_second_menuitems,
    footer_third_menuitems,
    footer_four_menuitems,
    locate
}) {
    const [lists, setLists] = useState([]);
    const [t] = useTranslation("global");
    const [activeLang, setActiveLang] = useState("en");

    useEffect(() => {
        // axios.get('/lang/lists')
        //     .then(res => {
        //         setLists(res.data)
        //     })

        const lang = localStorage.getItem("lang") || "en";
        setActiveLang(lang);
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;
        localStorage.setItem("lang", value);
        // location.reload()
    };

    return (
        <>
            <Promotional settings={settings} />
            <div className="container mx-auto mt-90 sm:mt-90 xs:mt-40 relative z-30">
                <div className="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-5">
                    <div className="mt-0 md:mt-0 xs:mt-5 md:w-full sm:w-3/4">
                        <div className=" bg-white inline-block px-7 py-2.5 rounded-tl-3xl rounded-br-3xl">
                            <img
                                className=" h-9"
                                src={settings?.site_logo}
                                alt=""
                            />
                        </div>
                        <p className=" text-lg font-medium text-white mb-3 mt-5">
                            {t("footer_des")}
                        </p>
                        <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-md w-5/6 mb-5">
                            <select
                                onChange={handleChange}
                                className="homepage-bg border-none w-full text-white font-medium  cursor-pointer rounded-md py-2.5 px-5 z-20 appearance-none lang-select relative"
                            >
                                {lists.map((value, index) => (
                                    <option
                                        selected={activeLang === value.code}
                                        className="text-gradient"
                                        key={index}
                                        value={value.code}
                                    >
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center space-x-4">
                            {settings?.social_data?.map((value, index) => (
                                <Link
                                    key={index}
                                    href={value.url}
                                    className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-full w-50px h-50px"
                                >
                                    <div className="secondary-bg rounded-full flex items-center justify-center w-full h-full">
                                        <i
                                            className={`${value.link} text-2xl text-special-gradient`}
                                        ></i>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="float-right lg:float-right xs:float-left mt-0 md:mt-0 xs:mt-5">
                        <div className="float-right lg:float-right xs:float-left">
                            <h3 className="text-white text-2xl font-bold mb-6">
                                {footer_first_menuitems?.name}
                            </h3>
                            <ul>
                                {footer_first_menuitems?.menuitems?.map(
                                    (value, index) => (
                                        <Link
                                            href={JSON.parse(value.data).url}
                                            key={index}
                                        >
                                            <li className="text-lg text-white mb-3">
                                                {value.name}
                                            </li>
                                        </Link>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className=" flex lg:flex xs:block items-center justify-center mt-0 md:mt-0 xs:mt-5">
                        <div>
                            <h3 className="text-white text-2xl font-bold mb-6">
                                {footer_second_menuitems?.name}
                            </h3>
                            <ul>
                                {footer_second_menuitems?.menuitems?.map(
                                    (value, index) => (
                                        <Link
                                            href={JSON.parse(value.data).url}
                                            key={index}
                                        >
                                            <li className="text-lg text-white mb-3">
                                                {value.name}
                                            </li>
                                        </Link>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-0 md:mt-0 xs:mt-5">
                        <h3 className="text-white text-2xl font-bold mb-6">
                            {footer_third_menuitems?.name}
                        </h3>
                        <ul>
                            {footer_third_menuitems?.menuitems?.map(
                                (value, index) => (
                                    <Link
                                        href={JSON.parse(value.data).url}
                                        key={index}
                                    >
                                        <li className="text-lg text-white mb-3">
                                            {value.name}
                                        </li>
                                    </Link>
                                )
                            )}
                        </ul>
                    </div>
                </div>
                <div className=" mt-12">
                    <div className="w-full h-1px bg-gradient"></div>
                    <p className="py-7 text-center text-white text-xl font-normal">
                        {t("copyright")}
                    </p>
                </div>
            </div>
        </>
    );
}
