import { ToastContainer } from "react-toastify";
import Navbar from "./partials/Navbar";
import Sidebar from "./partials/Sidebar";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "@inertiajs/inertia-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

export default function App({ sidebar = true, children, auth, logo }){


    const willExpireDate = new Date(auth?.will_expire);
    const currentDate = new Date();

    const isExpired = willExpireDate <= currentDate;

    const [isMobileMenu, setIsMobileMenu] = useState(false)

    const [t] = useTranslation('global')

    const mobileProps = (data) => {
        setIsMobileMenu(data)
    }

    const mobileCloseAction = (data) => {
        setIsMobileMenu(data)
    }

    return (
        <>
            <div className={`flex bg-jatis-ai min-h-screen w-full`}>
                {
                    sidebar === true && <Sidebar auth={auth} mobileMenu={isMobileMenu} mobileClose={mobileCloseAction} logo={logo} />
                }
                <div className={`${sidebar === true ? '2xl:xw-main-area xl:w-main-area lg:w-78p md:w-full xs:w-full 2xl:ml-18pnt5p xl:ml-20p lg:ml-22p' : 'w-full'}`}>
                    <Navbar auth={auth} mobileAction={mobileProps} />
                    {
                        auth?.plan_id && isExpired && (
                            <div className=" px-7 pr-3 mx-5 mt-3 py-3 bg-red-100 border-2 border-red-500 rounded-lg flex items-center justify-between space-x-5">
                                <p className=" text-red-700">{t('renew_des')}</p>
                                <Link href="/user/plan" className="bg-red-500 text-white px-8 py-3 rounded-lg whitespace-nowrap">{t('Renew Subscription')}</Link>
                            </div>
                        )
                    }
                    {children}
                </div>
            </div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
