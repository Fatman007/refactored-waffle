import { Link } from "@inertiajs/inertia-react";
import { UilPlus, UilEye } from '@iconscout/react-unicons'
import { useTranslation } from "react-i18next";

export default function Breadcrumb() {

    const {t} = useTranslation('global')

    return (
        <div className="border-b border-slate-100">
            <div className="2xl:flex xl:flex lg:flex md:flex items-center justify-between px-5 py-8">
                <div className=" 2xl:mb-auto xl:mb-auto lg:mb-auto md:mb-auto sm:mb-4 xs:mb-4">
                    <h2 className="font-recoleta font-bold text-4xl">{t('Dashboard')}</h2>
                    <p className="text-lg text-gray-400 mt-1">{t("Let's check update for today.")}</p>
                </div>
                <div className=" 2xl:flex xl:flex lg:flex md:flex sm:flex items-center">
                    <a target="__blank" href="/demo/chatbot" className=" border border-color color font-medium px-6 py-2 rounded-lg flex items-center mr-3 2xl:mb-auto xl:mb-auto lg:mb-auto md:mb-auto sm:mb-auto xs:mb-4"> <UilEye className='inline-block' size={20} /> <h6 className=" ml-1 mt-2px">{t('Try Demo')}</h6></a>
                    <Link href="/user/chatbot/create" className=" bg-color text-white font-medium px-6 py-2 rounded-lg flex items-center"> <UilPlus className='inline-block' size={20} /> <h6 className=" ml-1 mt-2px">{t('Create New Chatbot')}</h6></Link>
                </div>
            </div>
        </div>
    )
}
