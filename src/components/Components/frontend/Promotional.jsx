import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function Promotional({ settings }) {
    const [email, setEmail] = useState();
    const [t] = useTranslation("global");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            return toast.error("The Email Field Is Required.");
        }

        localStorage.setItem("email", email);

        setEmail("");

        // Inertia.visit(route('register'))
    };

    return (
        <div className="relative h-80">
            <img
                className=" absolute left-0 right-0 z-10"
                src="/frontend/img/footer/bg.png"
                alt=""
            />
            <div className="pt-150 container mx-auto relative z-30">
                <div className="bg-gradient-to-r p-[1px] from-[var(--gradient-green-color-1)] to-[var(--gradient-green-color-2)] rounded-2xl">
                    <div className="secondary-bg rounded-2xl py-9 px-10 flex lg:flex xs:block items-center justify-between">
                        <div className="flex items-center space-x-3 w-full lg:mb-auto xs:mb-5">
                            <img
                                src={settings?.promotion_icon}
                                className=" h-16"
                                alt=""
                            />
                            <div>
                                <h4 className=" text-white font-medium text-2xl">
                                    {t("promotion_title")}
                                </h4>
                                <h2 className=" text-white text-27 font-bold">
                                    {t("promotion_sub_title")}
                                </h2>
                            </div>
                        </div>
                        <div className=" relative w-full">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    placeholder={t("Enter Your Email Address")}
                                    className=" bg-white rounded-full w-full border-none h-16 sm:h-16 xs:h-14 px-9 placeholder:text-slate-400 focus:input-focus-none"
                                />
                                <button
                                    type="submit"
                                    className=" bg-gradient font-medium text-lg px-12 py-2.5 sm:py-2.5 xs:py-3.5 text-white rounded-full absolute sm:absolute xs:relative  right-2 sm:right-2 xs:right-0 top-1/2 sm:top-1/2 xs:top-9 sm:w-auto xs:w-full y-middle"
                                >
                                    {t("promotion_button")}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
